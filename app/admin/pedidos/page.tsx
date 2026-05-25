import Image from "next/image";
import Link from "next/link";
import { getOrders, type OrderStatus } from "@/lib/orders-db";
import { logoutAction } from "../actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: "Pendente", className: "bg-sun/20 text-[#8a6200]" },
  approved: { label: "Pago", className: "bg-mint/15 text-mint" },
  rejected: { label: "Recusado", className: "bg-red-50 text-red-600" },
  cancelled: { label: "Cancelado", className: "bg-paper text-muted" },
  refunded: { label: "Estornado", className: "bg-paper text-muted" },
};

function money(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function dateTime(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function PedidosAdminPage() {
  const pedidos = await getOrders();

  return (
    <div className="min-h-screen px-4 py-8 md:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.jpg" alt="Logo" width={40} height={40} className="rounded-xl" />
          <div>
            <h1 className="text-lg font-black text-ink">Pedidos</h1>
            <p className="text-xs text-muted">
              {pedidos.length} pedido{pedidos.length !== 1 ? "s" : ""} registrado{pedidos.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/produtos" className="button button-secondary px-4 py-2 text-sm">
            Produtos
          </Link>
          <Link href="/admin/categorias" className="button button-secondary px-4 py-2 text-sm">
            Categorias
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="button button-secondary px-4 py-2 text-sm">
              Sair
            </button>
          </form>
        </div>
      </div>

      {pedidos.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow-soft">
          <p className="text-4xl">$</p>
          <p className="mt-3 font-bold text-ink">Nenhum pedido ainda</p>
          <p className="mt-1 text-sm text-muted">As compras pelo site aparecem aqui.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="border-b border-line bg-paper text-xs font-black uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-3">Pedido</th>
                  <th className="px-4 py-3">Produto</th>
                  <th className="px-4 py-3">Detalhes</th>
                  <th className="px-4 py-3">Valor</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Pagamento</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {pedidos.map((pedido) => {
                  const status = statusConfig[pedido.status] ?? statusConfig.pending;
                  return (
                    <tr key={pedido.id}>
                      <td className="px-4 py-4 align-top">
                        <p className="font-mono text-xs font-bold text-ink">{pedido.id.slice(0, 8)}</p>
                        <p className="mt-1 text-xs text-muted">{dateTime(pedido.created_at)}</p>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <p className="font-bold text-ink">{pedido.product_name}</p>
                        <Link className="text-xs font-bold text-coral hover:underline" href={`/produto/${pedido.product_slug}`} target="_blank">
                          Ver produto
                        </Link>
                      </td>
                      <td className="px-4 py-4 align-top text-xs font-semibold text-muted">
                        <p>Tamanho: {pedido.size}</p>
                        {pedido.color ? <p>Cor: {pedido.color}</p> : null}
                        <p>Qtd: {pedido.quantity}</p>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <p className="font-black text-ink">{money(pedido.total_price)}</p>
                        <p className="text-xs text-muted">{money(pedido.unit_price)} cada</p>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${status.className}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-4 align-top text-xs font-semibold text-muted">
                        {pedido.mercado_pago_payment_id ? (
                          <p>MP: {pedido.mercado_pago_payment_id}</p>
                        ) : (
                          <p>Aguardando</p>
                        )}
                        {pedido.payer_email ? <p>{pedido.payer_email}</p> : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
