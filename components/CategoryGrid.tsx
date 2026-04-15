"use client";

import { categories, categoryDescriptions } from "@/data/products";

export function CategoryGrid() {
  function goToCategory(category: string) {
    const url = new URL(window.location.href);
    url.hash = "catalogo";
    url.searchParams.set("categoria", category);
    window.history.pushState(null, "", url);
    window.dispatchEvent(new CustomEvent("category-change", { detail: category }));
    document.querySelector("#catalogo")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="px-5 py-16 sm:px-10 lg:px-16 lg:py-24" aria-labelledby="categorias-title">
      <div className="mb-8 max-w-3xl">
        <p className="eyebrow">Escolha por categoria</p>
        <h2 id="categorias-title" className="text-[clamp(2rem,4vw,3.4rem)] font-black leading-none tracking-normal">
          Pecas para cada fase e ocasiao.
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <button
            key={category}
            className="min-h-40 rounded-lg border border-line bg-white p-5 text-left shadow-soft transition hover:-translate-y-1 hover:border-coral"
            type="button"
            onClick={() => goToCategory(category)}
          >
            <strong className="mb-2 block text-lg">{category}</strong>
            <span className="leading-6 text-muted">{categoryDescriptions[category]}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
