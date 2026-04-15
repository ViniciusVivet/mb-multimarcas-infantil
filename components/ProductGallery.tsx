"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/data/products";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const hasMultiple = product.images.length > 1;

  function changeImage(direction: number) {
    setIndex((current) => (current + direction + product.images.length) % product.images.length);
  }

  return (
    <div className="flex flex-col">
      {/* Imagem principal */}
      <div className="relative min-h-[460px] bg-paper lg:min-h-[calc(100svh-76px-90px)] overflow-hidden">
        <Image
          src={product.images[index]}
          alt={`${product.name} - foto ${index + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover transition-opacity duration-300"
        />

        {hasMultiple && (
          <>
            <button
              className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-xl font-black text-ink shadow-md backdrop-blur-sm hover:bg-white transition"
              type="button"
              onClick={() => changeImage(-1)}
              aria-label="Imagem anterior"
            >
              ‹
            </button>
            <button
              className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-xl font-black text-ink shadow-md backdrop-blur-sm hover:bg-white transition"
              type="button"
              onClick={() => changeImage(1)}
              aria-label="Próxima imagem"
            >
              ›
            </button>
          </>
        )}

        {/* Contador de fotos */}
        {hasMultiple && (
          <div className="absolute bottom-4 right-4 rounded-full bg-ink/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
            {index + 1} / {product.images.length}
          </div>
        )}
      </div>

      {/* Miniaturas */}
      {hasMultiple && (
        <div className="flex gap-2 bg-white p-3 border-t border-line">
          {product.images.map((image, i) => (
            <button
              key={image}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                i === index
                  ? "border-coral shadow-md scale-105"
                  : "border-transparent opacity-55 hover:opacity-90 hover:border-line"
              }`}
            >
              <Image
                src={image}
                alt={`Miniatura ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
