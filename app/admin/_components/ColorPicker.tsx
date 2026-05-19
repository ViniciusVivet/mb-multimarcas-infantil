"use client";

import { useState } from "react";
import {
  PRODUCT_COLORS,
  encodeCustomProductColor,
  parseProductColor,
} from "@/lib/product-colors";

type Props = {
  defaultColors?: string[];
};

export function ColorPicker({ defaultColors = [] }: Props) {
  const [selected, setSelected] = useState<string[]>(defaultColors);
  const [customName, setCustomName] = useState("");
  const [customHex, setCustomHex] = useState("#f9a8d4");

  function toggleColor(name: string) {
    setSelected((current) =>
      current.includes(name)
        ? current.filter((color) => color !== name)
        : [...current, name]
    );
  }

  function addCustomColor() {
    const name = customName.trim();
    if (!name) return;
    const value = encodeCustomProductColor(name, customHex);
    setSelected((current) => (current.includes(value) ? current : [...current, value]));
    setCustomName("");
  }

  const customSelected = selected.filter((color) => color.startsWith("custom:"));

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
      <div className="mt-3 rounded-2xl border border-line bg-paper p-3">
        <p className="text-xs font-extrabold text-ink">Outra cor</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-[44px_1fr_auto]">
          <input
            type="color"
            value={customHex}
            onChange={(e) => setCustomHex(e.target.value)}
            className="h-11 w-full cursor-pointer rounded-xl border-2 border-line bg-white p-1"
            aria-label="Escolher amostra da cor personalizada"
          />
          <input
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Ex: Coral neon, Dourado, Xadrez azul"
            className="input w-full"
          />
          <button
            type="button"
            onClick={addCustomColor}
            className="rounded-xl bg-ink px-4 py-2 text-xs font-extrabold text-white transition-colors hover:bg-coral"
          >
            Adicionar
          </button>
        </div>
        {customSelected.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {customSelected.map((value) => {
              const color = parseProductColor(value);
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => toggleColor(value)}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-bold text-ink"
                >
                  <span
                    className="h-4 w-4 rounded-full border border-black/10"
                    style={{ background: color.hex }}
                    aria-hidden="true"
                  />
                  {color.name}
                  <span className="text-coral">×</span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
      <p className="mt-1 text-xs text-muted">
        Clique nas cores disponíveis ou adicione uma cor personalizada. Se não selecionar nenhuma, o cliente escolhe apenas o tamanho.
      </p>
    </div>
  );
}
