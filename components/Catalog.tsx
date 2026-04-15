"use client";

import { useEffect, useMemo, useState } from "react";
import { categories, products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export function Catalog() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("categoria");

    if (category && categories.includes(category)) {
      setActiveCategory(category);
    }

    function handleCategoryChange(event: Event) {
      const categoryEvent = event as CustomEvent<string>;
      setActiveCategory(categoryEvent.detail);
    }

    window.addEventListener("category-change", handleCategoryChange);
    return () => window.removeEventListener("category-change", handleCategoryChange);
  }, []);

  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = activeCategory === "Todos" || product.category === activeCategory;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <section id="catalogo" className="bg-white px-5 py-16 sm:px-10 lg:px-16 lg:py-24" aria-labelledby="catalogo-title">
      <div className="mb-10 grid gap-5 lg:grid-cols-[1fr_0.9fr] lg:items-end">
        <div>
          <p className="eyebrow">Catálogo</p>
          <h2 id="catalogo-title" className="text-[clamp(2rem,4vw,3.4rem)] font-black leading-tight tracking-tight">
            Peças que as crianças amam. 🛍️
          </h2>
        </div>
        <p className="max-w-2xl leading-7 text-muted font-semibold lg:justify-self-end">
          Filtre por categoria e chame no WhatsApp para confirmar disponibilidade.
        </p>
      </div>

      <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(240px,360px)_1fr] lg:items-end">
        <label className="grid gap-2 font-bold text-muted">
          <span className="text-sm">Buscar produto</span>
          <input
            className="min-h-12 rounded-2xl border-2 border-line bg-paper px-4 text-ink outline-none focus:border-coral transition-colors"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Ex: vestido, conjunto, bebê..."
          />
        </label>

        <div className="flex flex-wrap gap-2 lg:justify-end" aria-label="Filtrar por categoria">
          {["Todos", ...categories].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`min-h-10 rounded-full border-2 px-4 py-2 text-sm font-extrabold transition-all duration-200 ${
                activeCategory === category
                  ? "border-coral bg-coral text-white shadow-md"
                  : "border-line bg-paper text-ink hover:border-coral hover:text-coral"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {visibleProducts.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-line bg-paper p-12 text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-extrabold text-ink">Nenhuma peça encontrada</p>
          <p className="mt-1 text-sm text-muted">Tente outro filtro ou busca</p>
        </div>
      )}
    </section>
  );
}
