import { getSupabaseClient } from "./supabase";
import { friendlyAdminError } from "./admin-errors";

export type OrderStatus = "pending" | "approved" | "rejected" | "cancelled" | "refunded";

export type Order = {
  id: string;
  product_slug: string;
  product_name: string;
  size: string;
  color: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  status: OrderStatus;
  mercado_pago_preference_id: string | null;
  mercado_pago_payment_id: string | null;
  payer_email: string | null;
  created_at: string;
  updated_at: string | null;
};

export function parseBrazilianPrice(price: string): number | null {
  const cleaned = price
    .replace(/[^\d,.-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const value = Number(cleaned);
  if (!Number.isFinite(value) || value <= 0) return null;
  return Math.round(value * 100) / 100;
}

export async function createOrder(input: {
  productSlug: string;
  productName: string;
  size: string;
  color?: string | null;
  quantity: number;
  unitPrice: number;
}): Promise<{ order?: Order; error?: string }> {
  const db = getSupabaseClient({ requireServiceRole: true });
  if (!db) return { error: "Banco de dados nao configurado para pedidos." };

  const quantity = Math.max(1, Math.min(10, Math.floor(input.quantity)));
  const totalPrice = Math.round(input.unitPrice * quantity * 100) / 100;

  const { data, error } = await db
    .from("pedidos")
    .insert({
      product_slug: input.productSlug,
      product_name: input.productName,
      size: input.size,
      color: input.color || null,
      quantity,
      unit_price: input.unitPrice,
      total_price: totalPrice,
      status: "pending",
    })
    .select("*")
    .single();

  if (error) return { error: friendlyAdminError("Nao consegui criar o pedido") };
  return { order: data as Order };
}

export async function attachPreferenceToOrder(
  orderId: string,
  preferenceId: string
): Promise<{ error?: string }> {
  const db = getSupabaseClient({ requireServiceRole: true });
  if (!db) return { error: "Banco de dados nao configurado para pedidos." };

  const { error } = await db
    .from("pedidos")
    .update({
      mercado_pago_preference_id: preferenceId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId);

  if (error) return { error: friendlyAdminError("Nao consegui vincular o checkout ao pedido") };
  return {};
}

export async function updateOrderPayment(input: {
  orderId: string;
  paymentId: string;
  status: OrderStatus;
  payerEmail?: string | null;
}): Promise<{ error?: string }> {
  const db = getSupabaseClient({ requireServiceRole: true });
  if (!db) return { error: "Banco de dados nao configurado para pedidos." };

  const { error } = await db
    .from("pedidos")
    .update({
      status: input.status,
      mercado_pago_payment_id: input.paymentId,
      payer_email: input.payerEmail || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.orderId);

  if (error) return { error: friendlyAdminError("Nao consegui atualizar o pagamento") };
  return {};
}

export async function getOrders(): Promise<Order[]> {
  const db = getSupabaseClient({ requireServiceRole: true });
  if (!db) return [];

  const { data, error } = await db
    .from("pedidos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data ?? []) as Order[];
}
