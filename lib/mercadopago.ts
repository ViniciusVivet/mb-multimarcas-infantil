import type { OrderStatus } from "./orders-db";

const MERCADO_PAGO_API = "https://api.mercadopago.com";

function getAccessToken() {
  return process.env.MERCADO_PAGO_ACCESS_TOKEN?.trim();
}

export function isMercadoPagoConfigured() {
  return !!getAccessToken();
}

export function getBaseUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (siteUrl) return siteUrl;

  const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (productionUrl) return `https://${productionUrl}`;

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}

export async function createCheckoutPreference(input: {
  orderId: string;
  title: string;
  description: string;
  quantity: number;
  unitPrice: number;
  pictureUrl?: string;
}): Promise<{ preferenceId?: string; initPoint?: string; error?: string }> {
  const token = getAccessToken();
  if (!token) return { error: "Mercado Pago nao configurado." };

  const baseUrl = getBaseUrl();
  const response = await fetch(`${MERCADO_PAGO_API}/checkout/preferences`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          id: input.orderId,
          title: input.title,
          description: input.description,
          quantity: input.quantity,
          unit_price: input.unitPrice,
          currency_id: "BRL",
          picture_url: input.pictureUrl,
        },
      ],
      external_reference: input.orderId,
      metadata: {
        order_id: input.orderId,
      },
      back_urls: {
        success: `${baseUrl}/pedido/sucesso`,
        pending: `${baseUrl}/pedido/pendente`,
        failure: `${baseUrl}/pedido/falha`,
      },
      auto_return: "approved",
      notification_url: `${baseUrl}/api/mercadopago/webhook`,
    }),
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    return { error: data?.message ?? "Nao consegui criar o checkout no Mercado Pago." };
  }

  return {
    preferenceId: data.id,
    initPoint: data.init_point ?? data.sandbox_init_point,
  };
}

export async function getPayment(paymentId: string): Promise<{
  orderId?: string;
  paymentId?: string;
  status?: OrderStatus;
  payerEmail?: string | null;
  error?: string;
}> {
  const token = getAccessToken();
  if (!token) return { error: "Mercado Pago nao configurado." };

  const response = await fetch(`${MERCADO_PAGO_API}/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) return { error: data?.message ?? "Nao consegui consultar o pagamento." };

  return {
    orderId: data.external_reference ?? data.metadata?.order_id,
    paymentId: String(data.id),
    status: mapPaymentStatus(data.status),
    payerEmail: data.payer?.email ?? null,
  };
}

function mapPaymentStatus(status: string): OrderStatus {
  if (status === "approved" || status === "authorized") return "approved";
  if (status === "rejected") return "rejected";
  if (status === "cancelled") return "cancelled";
  if (status === "refunded" || status === "charged_back") return "refunded";
  return "pending";
}
