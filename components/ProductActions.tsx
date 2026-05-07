"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { getWhatsappLink } from "@/data/store";

const whatsappIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export function ProductActions({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const link = getWhatsappLink(product.name, selectedSize ?? undefined);

  return (
    <>
      {/* Seletor de tamanho */}
      <div className="mt-5">
        <div className="rounded-2xl border-2 border-line bg-paper px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Tamanho {selectedSize ? <span className="text-coral">— {selectedSize} selecionado</span> : ""}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size === selectedSize ? null : size)}
                className={`rounded-xl border-2 px-3 py-1.5 text-sm font-extrabold transition-all duration-150 active:scale-95 ${
                  size === selectedSize
                    ? "border-coral bg-coral text-white shadow-md"
                    : "border-line bg-white text-ink hover:border-coral hover:text-coral"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {!selectedSize && (
            <p className="mt-2 text-xs text-muted">Selecione um tamanho antes de chamar no WhatsApp</p>
          )}
        </div>
      </div>

      {/* Aviso */}
      <div className="mt-4 rounded-2xl bg-mint/10 px-4 py-3 border border-mint/30">
        <p className="text-sm font-semibold text-mint">
          Chame no WhatsApp para confirmar disponibilidade e combinar a entrega!
        </p>
      </div>

      {/* CTA desktop */}
      <a
        className={`button mt-6 hidden w-full justify-center gap-2 text-base md:inline-flex ${
          selectedSize ? "button-primary" : "button-secondary pointer-events-none opacity-60"
        }`}
        href={selectedSize ? link : undefined}
        target="_blank"
        rel="noreferrer"
        aria-disabled={!selectedSize}
      >
        {whatsappIcon}
        {selectedSize ? `Quero o tamanho ${selectedSize}!` : "Selecione um tamanho"}
      </a>

      {/* CTA mobile — fixo no rodapé */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur-xl md:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <a
          className={`button w-full justify-center gap-2 ${
            selectedSize ? "button-primary" : "button-secondary pointer-events-none opacity-60"
          }`}
          href={selectedSize ? link : undefined}
          target="_blank"
          rel="noreferrer"
          aria-disabled={!selectedSize}
        >
          {whatsappIcon}
          {selectedSize ? `Quero o tamanho ${selectedSize}!` : "Selecione um tamanho"}
        </a>
      </div>
    </>
  );
}
