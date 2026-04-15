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
      <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_0.9fr] lg:items-end">
        <div>
          <p className="eyebrow">Catalogo</p>
          <h2 id="catalogo-title" className="text-[clamp(2rem,4vw,3.4rem)] font-black leading-none tracking-normal">
            Produtos em destaque
          </h2>
        </div>
        <p className="max-w-2xl leading-8 text-muted lg:justify-self-end">
          Use os filtros para encontrar uma peca e envie uma mensagem pronta para a loja.
        </p>
      </div>

      <div className="mb-8 grid gap-5 lg:grid-cols-[minmax(240px,390px)_1fr] lg:items-end">
        <label className="grid gap-2 font-black text-muted">
          <span>Buscar produto</span>
          <input
            className="min-h-12 rounded-lg border border-line bg-paper px-4 text-ink outline-none focus:border-coral"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Ex: vestido, conjunto, bebe"
          />
        </label>

        <div className="flex flex-wrap gap-2 lg:justify-end" aria-label="Filtrar por categoria">
          {["Todos", ...categories].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`min-h-11 rounded-lg border px-4 py-2 font-black ${
                activeCategory === category
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-paper text-ink hover:border-coral"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {visibleProducts.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-line bg-paper p-8 text-center text-muted">
          Nenhum produto encontrado com esses filtros.
        </p>
      )}
    </section>
  );
}
