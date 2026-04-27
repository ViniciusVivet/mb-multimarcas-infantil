import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/products-db";
import { logoutAction } from "../actions";
import { DeleteButton } from "../_components/DeleteButton";

export const revalidate = 0;

export default async function ProdutosAdminPage() {
  const produtos = await getProducts();

  return (
    <div className="min-h-screen px-4 py-8 md:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.jpg" alt="Logo" width={40} height={40} className="rounded-xl" />
          <div>
            <h1 className="text-lg font-black text-ink">Produtos</h1>
            <p className="text-xs text-muted">
              {produtos.length} produto{produtos.length !== 1 ? "s" : ""} cadastrado{produtos.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/produtos/novo" className="button button-primary px-4 py-2 text-sm">
            + Novo produto
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="button button-secondary px-4 py-2 text-sm">
              Sair
            </button>
          </form>
        </div>
      </div>

      {/* Product list */}
      {produtos.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow-soft">
          <p className="text-4xl">📦</p>
          <p className="mt-3 font-bold text-ink">Nenhum produto ainda</p>
          <p className="mt-1 text-sm text-muted">Clique em "+ Novo produto" para começar.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {produtos.map((produto) => (
            <div key={produto.slug} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft">
              <div className="relative aspect-square w-full bg-paper">
                {produto.images[0] ? (
                  <Image
                    src={produto.images[0]}
                    alt={produto.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-4xl text-muted/30">
                    👕
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1 p-4">
                <p className="text-xs font-medium text-muted">{produto.category}</p>
                <p className="font-bold text-ink leading-tight">{produto.name}</p>
                <p className="text-sm font-semibold text-coral">{produto.price}</p>
                <p className="text-xs text-muted">{produto.sizes.join(", ")}</p>
              </div>
              <div className="flex gap-2 border-t border-line px-4 py-3">
                <Link
                  href={`/admin/produtos/${produto.slug}/editar`}
                  className="flex-1 rounded-xl bg-paper px-3 py-2 text-center text-xs font-semibold text-ink hover:bg-line transition-colors"
                >
                  Editar
                </Link>
                <DeleteButton slug={produto.slug} name={produto.name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
