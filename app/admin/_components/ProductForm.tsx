"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import type { Product } from "@/data/products";
import { PhotoUploader } from "./PhotoUploader";
import { ColorPicker } from "./ColorPicker";
import { AdminNotice } from "./AdminNotice";

type Props = {
  action: (prev: unknown, formData: FormData) => Promise<{ error?: string }>;
  categories: string[];
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

export function ProductForm({ action, categories, defaultValues, submitLabel }: Props) {
  const [state, formAction] = useFormState(action, undefined);
  const [dismissedError, setDismissedError] = useState<string | null>(null);
  const categoryOptions = defaultValues?.category && !categories.includes(defaultValues.category)
    ? [...categories, defaultValues.category]
    : categories;

  useEffect(() => {
    setDismissedError(null);
  }, [state?.error]);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <AdminNotice
        open={!!state?.error && dismissedError !== state.error}
        title="Não consegui salvar o produto"
        message={state?.error}
        variant="error"
        onClose={() => setDismissedError(state?.error ?? null)}
      />

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
            {categoryOptions.map((c) => (
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

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink">Cores disponíveis</label>
        <ColorPicker defaultColors={defaultValues?.colors} />
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

      {/* Fotos */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink">Fotos do produto</label>
        <PhotoUploader defaultPhotos={defaultValues?.images} />
      </div>

      {/* Vídeos */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink">Vídeos (opcional)</label>
        <div className="flex flex-col gap-2">
          {[0, 1].map((i) => (
            <input
              key={i}
              name={`video_${i}`}
              defaultValue={defaultValues?.videos?.[i] ?? ""}
              placeholder="Cole o link do YouTube (ex: https://youtube.com/watch?v=...)"
              className="input w-full"
            />
          ))}
        </div>
        <p className="mt-1 text-xs text-muted">
          Suba o vídeo no YouTube (pode ser não listado) e cole o link aqui
        </p>
      </div>

      <SubmitButton label={submitLabel} />
    </form>
  );
}
