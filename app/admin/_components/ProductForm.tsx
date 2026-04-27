"use client";

import { useFormState, useFormStatus } from "react-dom";
import type { Product } from "@/data/products";

type Props = {
  action: (prev: unknown, formData: FormData) => Promise<{ error?: string }>;
  defaultValues?: Partial<Product>;
  submitLabel: string;
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="button button-primary w-full py-3 text-sm font-bold disabled:opacity-60"
    >
      {pending ? "Salvando..." : label}
    </button>
  );
}

const categories = ["Vestidos", "Conjuntos", "Camisetas", "Calças", "Macacões", "Acessórios", "Casacos", "Shorts"];

export function ProductForm({ action, defaultValues, submitLabel }: Props) {
  const [state, formAction] = useFormState(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {/* Nome */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink">Nome do produto *</label>
        <input
          name="name"
          required
          defaultValue={defaultValues?.name}
          placeholder="Ex: Vestido Floral Festa"
          className="input w-full"
        />
      </div>

      {/* Categoria + Preço */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink">Categoria *</label>
          <select name="category" required defaultValue={defaultValues?.category} className="input w-full">
            <option value="">Selecione...</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink">Preço *</label>
          <input
            name="price"
            required
            defaultValue={defaultValues?.price}
            placeholder="Ex: R$ 79,90"
            className="input w-full"
          />
        </div>
      </div>

      {/* Tamanhos */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink">Tamanhos *</label>
        <input
          name="sizes"
          required
          defaultValue={defaultValues?.sizes?.join(", ")}
          placeholder="Ex: P, M, G, GG  ou  1, 2, 3, 4"
          className="input w-full"
        />
        <p className="mt-1 text-xs text-muted">Separe os tamanhos por vírgula</p>
      </div>

      {/* Descrição */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink">Descrição *</label>
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={defaultValues?.description}
          placeholder="Descreva o produto brevemente..."
          className="input w-full resize-none"
        />
      </div>

      {/* Imagens */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink">Links das imagens *</label>
        <textarea
          name="images"
          required
          rows={4}
          defaultValue={defaultValues?.images?.join("\n")}
          placeholder={"https://exemplo.com/foto1.jpg\nhttps://exemplo.com/foto2.jpg"}
          className="input w-full resize-none font-mono text-xs"
        />
        <p className="mt-1 text-xs text-muted">Cole um link por linha. Use links de imagens do Google Drive, Imgur, etc.</p>
      </div>

      {state?.error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          Erro: {state.error}
        </p>
      )}

      <SubmitButton label={submitLabel} />
    </form>
  );
}
