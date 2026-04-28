"use client";

import { deletarProdutoAction } from "../actions";

export function DeleteButton({ slug, name }: { slug: string; name: string }) {
  async function handleDelete() {
    if (!confirm(`Excluir "${name}"?`)) return;
    const result = await deletarProdutoAction(slug);
    if (result?.error) alert(`Não foi possível excluir: ${result.error}`);
  }

  return (
    <button
      onClick={handleDelete}
      className="w-full rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors"
    >
      Excluir
    </button>
  );
}
