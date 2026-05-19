export type ProductColor = {
  name: string;
  hex: string;
  textClass?: string;
};

export const PRODUCT_COLORS: ProductColor[] = [
  { name: "Branco", hex: "#ffffff" },
  { name: "Off white", hex: "#f6f0e6" },
  { name: "Preto", hex: "#111827", textClass: "text-white" },
  { name: "Cinza", hex: "#9ca3af" },
  { name: "Rosa", hex: "#f9a8d4" },
  { name: "Pink", hex: "#ec4899", textClass: "text-white" },
  { name: "Vermelho", hex: "#ef4444", textClass: "text-white" },
  { name: "Laranja", hex: "#fb923c" },
  { name: "Amarelo", hex: "#fde047" },
  { name: "Verde", hex: "#22c55e", textClass: "text-white" },
  { name: "Verde água", hex: "#5eead4" },
  { name: "Azul", hex: "#3b82f6", textClass: "text-white" },
  { name: "Azul bebê", hex: "#93c5fd" },
  { name: "Lilás", hex: "#c4b5fd" },
  { name: "Roxo", hex: "#8b5cf6", textClass: "text-white" },
  { name: "Bege", hex: "#d6c3a5" },
  { name: "Marrom", hex: "#8b5e3c", textClass: "text-white" },
  { name: "Jeans claro", hex: "#7aa7d9" },
  { name: "Jeans escuro", hex: "#1f4f82", textClass: "text-white" },
  { name: "Colorido", hex: "linear-gradient(135deg, #ef4444, #facc15, #22c55e, #3b82f6)" },
  { name: "Estampado", hex: "repeating-linear-gradient(45deg, #f9a8d4 0 6px, #93c5fd 6px 12px, #fde047 12px 18px)" },
];

export function encodeCustomProductColor(name: string, hex: string) {
  return `custom:${name.replace(/[|,]/g, " ").trim()}|${hex}`;
}

export function parseProductColor(value: string): ProductColor {
  if (value.startsWith("custom:")) {
    const [rawName, rawHex] = value.slice("custom:".length).split("|");
    return {
      name: rawName?.trim() || "Cor personalizada",
      hex: /^#[0-9a-f]{6}$/i.test(rawHex ?? "") ? rawHex : "#e5e7eb",
    };
  }

  return PRODUCT_COLORS.find((color) => color.name === value) ?? {
    name: value,
    hex: "#e5e7eb",
  };
}

export function getProductColor(name: string) {
  return parseProductColor(name);
}
