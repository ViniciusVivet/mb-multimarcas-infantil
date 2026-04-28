"use client";

import Image from "next/image";

type Props = {
  name: string;
  price: string;
  category: string;
  imageUrl: string;
};

export function ProductPreview({ name, price, category, imageUrl }: Props) {
  const isEmpty = !name && !price && !imageUrl;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-soft">
      {/* Foto */}
      <div className="relative aspect-square w-full bg-paper">
        {imageUrl ? (
          <Image src={imageUrl} alt="Preview" fill className="object-cover" unoptimized />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-muted/40">
            <span className="text-4xl">👕</span>
            <span className="text-xs font-semibold">Foto aparece aqui</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs font-medium text-muted">
          {category || <span className="italic text-muted/40">Categoria</span>}
        </p>
        <p className={`mt-0.5 truncate font-bold leading-tight ${name ? "text-ink" : "italic text-muted/40"}`}>
          {name || "Nome do produto"}
        </p>
        <p className={`mt-1 text-sm font-semibold ${price ? "text-coral" : "italic text-muted/40"}`}>
          {price || "R$ 0,00"}
        </p>
      </div>

      <div className="px-3 pb-3">
        <div className="flex items-center justify-center rounded-full bg-coral py-2 text-xs font-extrabold text-white">
          Ver detalhes
        </div>
      </div>

      {isEmpty && (
        <p className="px-3 pb-3 text-center text-[10px] text-muted/50">
          Preencha o formulário para ver o preview
        </p>
      )}
    </div>
  );
}
