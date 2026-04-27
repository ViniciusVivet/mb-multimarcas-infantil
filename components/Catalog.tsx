"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const categoryEmojis: Record<string, string> = {
  Vestidos: "👗",
  Conjuntos: "👚",
  "Bebê": "🍼",
  Meninas: "🎀",
  Meninos: "⚽",
  Camisetas: "👕",
  "Calças": "👖",
  "Macacões": "🐣",
  Casacos: "🧥",
  Shorts: "🩳",
  "Acessórios": "✨",
};

export function Catalog({ products }: { products: Product[] }) {
  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("categoria");
    if (category && categories.includes(category)) {
      setActiveCategory(category);
    }

    function handleCategoryChange(event: Event) {
      const e = event as CustomEvent<string>;
      setActiveCategory(e.detail);
    }
    window.addEventListener("category-change", handleCategoryChange);
    return () => window.removeEventListener("category-change", handleCategoryChange);
  }, [categories]);

  // Scroll active pill into view
  useEffect(() => {
    if (!pillsRef.current) return;
    const active = pillsRef.current.querySelector("[data-active='true']") as HTMLElement;
    if (active) {
      active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeCategory]);

  const visibleProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchCat = activeCategory === "Todos" || p.category === activeCategory;
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, search, products]);

  return (
    <section id="catalogo" className="catalog-bg" aria-labelledby="catalogo-title">

      {/* Cabeçalho do catálogo */}
      <div className="px-4 pt-8 pb-4 sm:px-10 lg:px-16">
        <p className="eyebrow">Catálogo</p>
        <div className="flex items-end justify-between gap-4">
          <h2 id="catalogo-title" className="text-2xl font-black leading-tight tracking-tight md:text-4xl">
            Peças que as crianças amam. 🛍️
          </h2>
        </div>

        {/* Barra de busca */}
        <div className="mt-4">
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="w-full rounded-2xl border-2 border-line bg-paper py-3 pl-10 pr-4 text-sm font-semibold text-ink outline-none transition-colors focus:border-coral md:text-base"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar peças..."
            />
          </div>
        </div>
      </div>

      {/* Pills de categoria — sticky, scroll horizontal */}
      <div className={`sticky z-30 bg-[#e8f6f9]/95 backdrop-blur-md shadow-sm transition-[top] duration-300 ${scrolled ? "top-[52px] md:top-[60px]" : "top-[64px] md:top-[76px]"}`}>
        <div
          ref={pillsRef}
          className="scrollbar-hide flex gap-2 overflow-x-auto px-4 py-3 sm:px-10 lg:px-16"
          aria-label="Filtrar por categoria"
        >
          {["Todos", ...categories].map((cat) => {
            const isActive = activeCategory === cat;
            const emoji = cat === "Todos" ? "✨" : (categoryEmojis[cat] ?? "");
            return (
              <button
                key={cat}
                data-active={isActive}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-extrabold transition-all duration-200 active:scale-95 ${
                  isActive
                    ? "bg-coral text-white shadow-md"
                    : "border-2 border-line bg-paper text-ink hover:border-coral"
                }`}
              >
                <span>{emoji}</span>
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grade de produtos */}
      <div className="px-4 pb-8 pt-4 sm:px-10 lg:px-16">
        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-line bg-paper py-16 text-center">
            <p className="text-4xl">🔍</p>
            <p className="mt-3 font-extrabold text-ink">Nenhuma peça encontrada</p>
            <p className="mt-1 text-sm text-muted">Tente outro filtro</p>
          </div>
        )}
      </div>
    </section>
  );
}
