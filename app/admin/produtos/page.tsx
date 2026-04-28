import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/products-db";
import { logoutAction } from "../actions";
import { ProductList } from "../_components/ProductList";

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

      <ProductList produtos={produtos} />
    </div>
  );
}
