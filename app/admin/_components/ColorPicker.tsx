"use client";

import { useState } from "react";
import { PRODUCT_COLORS } from "@/lib/product-colors";

type Props = {
  defaultColors?: string[];
};

export function ColorPicker({ defaultColors = [] }: Props) {
  const [selected, setSelected] = useState<string[]>(defaultColors);

  function toggleColor(name: string) {
    setSelected((current) =>
      current.includes(name)
        ? current.filter((color) => color !== name)
        : [...current, name]
    );
  }

  return (
    <div>
      <input type="hidden" name="colors" value={selected.join(", ")} />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {PRODUCT_COLORS.map((color) => {
          const active = selected.includes(color.name);
          return (
            <button
              key={color.name}
              type="button"
              onClick={() => toggleColor(color.name)}
              className={`flex min-h-11 items-center gap-2 rounded-xl border-2 px-3 py-2 text-left text-xs font-extrabold transition-all active:scale-[0.98] ${
                active
                  ? "border-coral bg-coral/10 text-ink shadow-sm"
                  : "border-line bg-white text-ink hover:border-coral"
              }`}
              aria-pressed={active}
            >
              <span
                className="h-6 w-6 flex-shrink-0 rounded-full border border-black/10 shadow-inner"
                style={{ background: color.hex }}
                aria-hidden="true"
              />
              <span className="min-w-0 truncate">{color.name}</span>
              {active ? <span className="ml-auto text-coral">✓</span> : null}
            </button>
          );
        })}
      </div>
      <p className="mt-1 text-xs text-muted">
        Clique nas cores disponíveis. Se não selecionar nenhuma, o cliente escolhe apenas o tamanho.
      </p>
    </div>
  );
}
