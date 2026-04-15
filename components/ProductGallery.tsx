"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/data/products";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const currentImage = product.images[index];

  function changeImage(direction: number) {
    setIndex((current) => (current + direction + product.images.length) % product.images.length);
  }

  return (
    <div className="relative min-h-[460px] bg-paper lg:min-h-[calc(100svh-76px)]">
      <Image
        src={currentImage}
        alt={`${product.name} - foto ${index + 1}`}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="object-cover"
      />

      {product.images.length > 1 ? (
        <>
          <button
            className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-lg border border-line bg-white/90 text-2xl font-black"
            type="button"
            onClick={() => changeImage(-1)}
            aria-label="Imagem anterior"
          >
            &lt;
          </button>
          <button
            className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-lg border border-line bg-white/90 text-2xl font-black"
            type="button"
            onClick={() => changeImage(1)}
            aria-label="Proxima imagem"
          >
            &gt;
          </button>
          <div className="absolute bottom-4 left-4 flex gap-2">
            {product.images.map((image, imageIndex) => (
              <button
                key={image}
                className={`h-3 w-8 rounded-full ${imageIndex === index ? "bg-coral" : "bg-white/80"}`}
                type="button"
                onClick={() => setIndex(imageIndex)}
                aria-label={`Ver foto ${imageIndex + 1}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
