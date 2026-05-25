import { NextResponse } from "next/server";
import { getPayment } from "@/lib/mercadopago";
import { updateOrderPayment } from "@/lib/orders-db";

function getPaymentIdFromUrl(url: string) {
  const params = new URL(url).searchParams;
  return params.get("data.id") || params.get("id");
}

export async function POST(request: Request) {
  let paymentId = getPaymentIdFromUrl(request.url);

  if (!paymentId) {
    const body = await request.json().catch(() => null);
    paymentId = body?.data?.id || body?.id;
  }

  if (!paymentId) return NextResponse.json({ received: true });

  const payment = await getPayment(String(paymentId));
  if (payment.orderId && payment.paymentId && payment.status) {
    await updateOrderPayment({
      orderId: payment.orderId,
      paymentId: payment.paymentId,
      status: payment.status,
      payerEmail: payment.payerEmail,
    });
  }

  return NextResponse.json({ received: true });
}

export async function GET(request: Request) {
  return POST(request);
}
