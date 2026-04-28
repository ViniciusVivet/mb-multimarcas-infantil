"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import type { Product } from "@/data/products";
import { PhotoUploader } from "./PhotoUploader";
import { ProductPreview } from "./ProductPreview";

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

const categories = [
  "Vestidos", "Conjuntos", "Camisetas", "Calças",
  "Macacões", "Acessórios", "Casacos", "Shorts",
];

export function ProductFormWithPreview({ action, defaultValues, submitLabel }: Props) {
  const [state, formAction] = useFormState(action, undefined);
  const [preview, setPreview] = useState({
    name: defaultValues?.name ?? "",
    price: defaultValues?.price ?? "",
    category: defaultValues?.category ?? "",
    imageUrl: defaultValues?.images?.[0] ?? "",
  });

  return (
    <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
      {/* Formulário */}
      <div className="min-w-0 flex-1">
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
              onChange={(e) => setPreview((p) => ({ ...p, name: e.target.value }))}
            />
          </div>

          {/* Categoria + Preço */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">Categoria *</label>
              <select
                name="category"
                required
                defaultValue={defaultValues?.category}
                className="input w-full"
                onChange={(e) => setPreview((p) => ({ ...p, category: e.target.value }))}
              >
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
                onChange={(e) => setPreview((p) => ({ ...p, price: e.target.value }))}
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

          {/* Fotos */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink">Fotos do produto</label>
            <PhotoUploader
              defaultPhotos={defaultValues?.images}
              onFirstPhotoChange={(url) => setPreview((p) => ({ ...p, imageUrl: url }))}
            />
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

          {state?.error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              Erro: {state.error}
            </p>
          )}

          <SubmitButton label={submitLabel} />
        </form>
      </div>

      {/* Preview — sticky no desktop, normal no mobile */}
      <div className="xl:sticky xl:top-[72px] xl:w-64 xl:flex-shrink-0">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">
          Preview no catálogo
        </p>
        <ProductPreview {...preview} />
        <p className="mt-2 text-center text-[10px] text-muted/60">
          Atualiza conforme você preenche
        </p>
      </div>
    </div>
  );
}
