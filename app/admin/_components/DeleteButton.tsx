"use client";

import { useState } from "react";
import { deletarProdutoAction } from "../actions";

export function DeleteButton({
  slug,
  name,
  onError,
}: {
  slug: string;
  name: string;
  onError?: (message: string) => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    const result = await deletarProdutoAction(slug);
    if (result?.error) {
      onError?.(result.error);
      setLoading(false);
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <div className="flex w-full gap-1">
        <button
          onClick={() => setConfirming(false)}
          disabled={loading}
          className="flex-1 rounded-xl bg-paper px-2 py-2 text-xs font-semibold text-muted hover:bg-line transition-colors"
        >
          Não
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="flex-1 rounded-xl bg-red-500 px-2 py-2 text-xs font-bold text-white hover:bg-red-600 transition-colors disabled:opacity-60"
        >
          {loading ? "..." : "Sim"}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="w-full rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors"
    >
      Excluir
    </button>
  );
}
