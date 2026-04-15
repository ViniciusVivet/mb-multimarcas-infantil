"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { Product } from "@/data/products";

export function ProductGallery({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const hasMultiple = product.images.length > 1;
  const touchStartX = useRef<number | null>(null);

  function changeImage(dir: number) {
    setIndex((cur) => (cur + dir + product.images.length) % product.images.length);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) changeImage(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  }

  return (
    <div className="flex flex-col">
      {/* Imagem principal com swipe */}
      <div
        className="relative min-h-[360px] select-none overflow-hidden bg-paper lg:min-h-[calc(100svh-76px-80px)]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={product.images[index]}
          alt={`${product.name} — foto ${index + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover transition-opacity duration-300"
          draggable={false}
        />

        {hasMultiple && (
          <>
            <button
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-md backdrop-blur-sm hover:bg-white active:scale-95 transition"
              type="button"
              onClick={() => changeImage(-1)}
              aria-label="Imagem anterior"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button
              className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-md backdrop-blur-sm hover:bg-white active:scale-95 transition"
              type="button"
              onClick={() => changeImage(1)}
              aria-label="Próxima imagem"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
            <div className="absolute bottom-3 right-3 rounded-full bg-ink/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
              {index + 1} / {product.images.length}
            </div>
          </>
        )}
      </div>

      {/* Miniaturas clicáveis */}
      {hasMultiple && (
        <div className="flex gap-2 bg-white px-3 py-3 border-t border-line">
          {product.images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={`relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 active:scale-95 ${
                i === index
                  ? "border-coral shadow-md scale-105"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <Image src={img} alt={`Miniatura ${i + 1}`} fill sizes="56px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
