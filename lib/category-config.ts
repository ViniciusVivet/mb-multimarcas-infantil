export const defaultCategories = [
  "Vestidos",
  "Conjuntos",
  "Camisetas",
  "Calças",
  "Macacões",
  "Acessórios",
  "Casacos",
  "Shorts",
  "Calçados",
  "Havaianas",
  "Body temático",
  "T-shirt / Blusinha",
];

export const categoryEmojis: Record<string, string> = {
  Vestidos: "👗",
  Conjuntos: "👚",
  Bebê: "🍼",
  Meninas: "🎀",
  Meninos: "⚽",
  Camisetas: "👕",
  Calças: "👖",
  Macacões: "🐣",
  Casacos: "🧥",
  Shorts: "🩳",
  Acessórios: "✨",
  Calçados: "👟",
  Havaianas: "🩴",
  "Body temático": "⭐",
  "T-shirt / Blusinha": "👕",
};

export function normalizeCategoryKey(name: string) {
  return name
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export function uniqueCategories(categories: string[]) {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const category of categories) {
    const normalized = category.trim().replace(/\s+/g, " ");
    if (!normalized) continue;
    const key = normalizeCategoryKey(normalized);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(normalized);
  }

  return result;
}

export function canonicalCategoryName(name: string) {
  const normalized = name.trim().replace(/\s+/g, " ");
  const key = normalizeCategoryKey(normalized);
  return defaultCategories.find((category) => normalizeCategoryKey(category) === key) ?? normalized;
}
