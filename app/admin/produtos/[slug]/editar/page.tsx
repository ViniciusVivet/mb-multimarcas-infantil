import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products-db";
import { ProductFormWithPreview } from "../../../_components/ProductFormWithPreview";
import { atualizarProdutoAction } from "../../../actions";

export default async function EditarProdutoPage({ params }: { params: { slug: string } }) {
  const produto = await getProductBySlug(params.slug);
  if (!produto) notFound();

  const action = atualizarProdutoAction.bind(null, params.slug);

  return (
    <div className="min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center gap-3">
          <Link href="/admin/produtos" className="rounded-xl p-2 text-muted hover:bg-white hover:text-ink transition-colors">
            ← Voltar
          </Link>
          <h1 className="text-lg font-black text-ink">Editar produto</h1>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <p className="mb-5 text-xs font-medium text-muted">
            Slug: <span className="font-mono text-ink">{produto.slug}</span>
          </p>
          <ProductFormWithPreview
            action={action}
            defaultValues={produto}
            submitLabel="Salvar alterações"
          />
        </div>
      </div>
    </div>
  );
}
