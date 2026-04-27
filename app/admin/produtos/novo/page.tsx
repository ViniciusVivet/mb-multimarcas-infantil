import Link from "next/link";
import { ProductForm } from "../../_components/ProductForm";
import { criarProdutoAction } from "../../actions";

export default function NovoProdutoPage() {
  return (
    <div className="min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-xl">
        <div className="mb-6 flex items-center gap-3">
          <Link href="/admin/produtos" className="rounded-xl p-2 text-muted hover:bg-white hover:text-ink transition-colors">
            ← Voltar
          </Link>
          <h1 className="text-lg font-black text-ink">Novo produto</h1>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <ProductForm action={criarProdutoAction} submitLabel="Criar produto" />
        </div>
      </div>
    </div>
  );
}
