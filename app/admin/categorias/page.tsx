import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/products-db";
import { getSortedCategories } from "@/lib/categories-db";
import { logoutAction } from "../actions";
import { CategoryList } from "../_components/CategoryList";

export const revalidate = 0;

export default async function CategoriasAdminPage() {
  const produtos = await getProducts();
  const categories = await getSortedCategories(produtos);

  return (
    <div className="min-h-screen px-4 py-8 md:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.jpg" alt="Logo" width={40} height={40} className="rounded-xl" />
          <div>
            <h1 className="text-lg font-black text-ink">Categorias</h1>
            <p className="text-xs text-muted">
              {categories.length} categoria{categories.length !== 1 ? "s" : ""} — arraste para reordenar
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/produtos" className="button button-secondary px-4 py-2 text-sm">
            Produtos
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="button button-secondary px-4 py-2 text-sm">
              Sair
            </button>
          </form>
        </div>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow-soft">
          <p className="text-4xl">🏷️</p>
          <p className="mt-3 font-bold text-ink">Nenhuma categoria ainda</p>
          <p className="mt-1 text-sm text-muted">Cadastre produtos para as categorias aparecerem aqui.</p>
        </div>
      ) : (
        <CategoryList categories={categories} />
      )}
    </div>
  );
}
