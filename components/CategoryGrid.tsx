"use client";

import { categories, categoryDescriptions } from "@/data/products";

const categoryConfig: Record<string, { emoji: string; bg: string; accent: string }> = {
  Vestidos:     { emoji: "👗", bg: "bg-rose/10 hover:bg-rose/20 border-rose/30",       accent: "text-coral" },
  Conjuntos:    { emoji: "👚", bg: "bg-mint/10 hover:bg-mint/20 border-mint/30",       accent: "text-mint" },
  "Bebê":       { emoji: "🍼", bg: "bg-sun/10 hover:bg-sun/20 border-sun/30",          accent: "text-[#a07000]" },
  Meninas:      { emoji: "🎀", bg: "bg-rose/10 hover:bg-rose/20 border-rose/30",       accent: "text-coral" },
  Meninos:      { emoji: "⚽", bg: "bg-mint/10 hover:bg-mint/20 border-mint/30",       accent: "text-mint" },
  "Acessórios": { emoji: "✨", bg: "bg-coral/10 hover:bg-coral/20 border-coral/30",    accent: "text-coral" },
};

const defaultConfig = { emoji: "🛍️", bg: "bg-paper hover:bg-line/30 border-line", accent: "text-coral" };

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
      <div className="mb-10 max-w-3xl">
        <p className="eyebrow">Escolha por categoria</p>
        <h2 id="categorias-title" className="text-[clamp(2rem,4vw,3.4rem)] font-black leading-none tracking-tight">
          Peças para cada fase e ocasião. 🌈
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {categories.map((category) => {
          const config = categoryConfig[category] ?? defaultConfig;
          return (
            <button
              key={category}
              className={`group flex flex-col items-start min-h-36 rounded-3xl border-2 p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-soft ${config.bg}`}
              type="button"
              onClick={() => goToCategory(category)}
            >
              <span className="mb-3 text-3xl">{config.emoji}</span>
              <strong className={`block text-base font-extrabold ${config.accent}`}>{category}</strong>
              <span className="mt-1 text-sm leading-5 text-muted">{categoryDescriptions[category]}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
