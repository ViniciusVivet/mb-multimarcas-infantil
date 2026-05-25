import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products-db";
import { parseProductColor } from "@/lib/product-colors";
import {
  attachPreferenceToOrder,
  createOrder,
  parseBrazilianPrice,
} from "@/lib/orders-db";
import { createCheckoutPreference } from "@/lib/mercadopago";

type CheckoutBody = {
  slug?: string;
  size?: string;
  color?: string | null;
  quantity?: number;
};

export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Pedido invalido." }, { status: 400 });
  }

  const slug = body.slug?.trim();
  const size = body.size?.trim();
  const quantity = Math.max(1, Math.min(10, Math.floor(Number(body.quantity) || 1)));

  if (!slug || !size) {
    return NextResponse.json({ error: "Selecione tamanho e produto." }, { status: 400 });
  }

  const product = await getProductBySlug(slug);
  if (!product) return NextResponse.json({ error: "Produto nao encontrado." }, { status: 404 });
  if (!product.sizes.includes(size)) {
    return NextResponse.json({ error: "Tamanho indisponivel para esse produto." }, { status: 400 });
  }

  const colors = product.colors ?? [];
  const color = body.color?.trim() || null;
  if (colors.length > 0 && (!color || !colors.includes(color))) {
    return NextResponse.json({ error: "Selecione uma cor disponivel." }, { status: 400 });
  }

  const unitPrice = parseBrazilianPrice(product.price);
  if (!unitPrice) {
    return NextResponse.json(
      { error: "Preco do produto invalido. Revise o cadastro antes de vender online." },
      { status: 400 }
    );
  }

  const readableColor = color ? parseProductColor(color).name : null;
  const orderResult = await createOrder({
    productSlug: product.slug,
    productName: product.name,
    size,
    color: readableColor,
    quantity,
    unitPrice,
  });
  if (!orderResult.order) {
    return NextResponse.json({ error: orderResult.error }, { status: 500 });
  }

  const preference = await createCheckoutPreference({
    orderId: orderResult.order.id,
    title: product.name,
    description: [
      `Tamanho: ${size}`,
      readableColor ? `Cor: ${readableColor}` : null,
    ].filter(Boolean).join(" | "),
    quantity,
    unitPrice,
    pictureUrl: product.images[0],
  });

  if (!preference.preferenceId || !preference.initPoint) {
    return NextResponse.json({ error: preference.error }, { status: 500 });
  }

  const attachResult = await attachPreferenceToOrder(orderResult.order.id, preference.preferenceId);
  if (attachResult.error) {
    return NextResponse.json({ error: attachResult.error }, { status: 500 });
  }

  return NextResponse.json({ initPoint: preference.initPoint });
}
