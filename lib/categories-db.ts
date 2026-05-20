import { getSupabaseClient } from "./supabase";
import type { Product } from "@/data/products";
import { friendlyAdminError } from "./admin-errors";

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
];

export function getUniqueCategories(products: Product[]): string[] {
  return Array.from(new Set(products.map((p) => p.category)));
}

function sortWithPosition(categories: string[], positions: Map<string, number>) {
  return [...categories].sort((a, b) => {
    const positionA = positions.get(a) ?? 999;
    const positionB = positions.get(b) ?? 999;
    if (positionA !== positionB) return positionA - positionB;
    return a.localeCompare(b, "pt-BR");
  });
}

export async function getSortedCategories(products: Product[]): Promise<string[]> {
  const unique = getUniqueCategories(products);
  const db = getSupabaseClient();
  if (!db) return unique;

  const { data } = await db
    .from("categorias")
    .select("name, position")
    .order("position", { ascending: true });

  if (!data?.length) return unique;

  const posMap = new Map(data.map((c) => [c.name, c.position]));
  return sortWithPosition(unique, posMap);
}

export async function getAdminCategories(products: Product[]): Promise<string[]> {
  const productCategories = getUniqueCategories(products);
  const db = getSupabaseClient();
  if (!db) return Array.from(new Set([...defaultCategories, ...productCategories]));

  const { data } = await db
    .from("categorias")
    .select("name, position")
    .order("position", { ascending: true });

  const savedCategories = data?.map((category) => category.name) ?? [];
  const positions = new Map((data ?? []).map((category) => [category.name, category.position]));
  return sortWithPosition(
    Array.from(new Set([...defaultCategories, ...savedCategories, ...productCategories])),
    positions
  );
}

export async function createCategory(
  name: string,
  position?: number
): Promise<{ ok: boolean; error?: string }> {
  const db = getSupabaseClient({ requireServiceRole: true });
  if (!db) return { ok: false, error: "Banco de dados não configurado." };

  const normalized = name.trim().replace(/\s+/g, " ");
  if (normalized.length < 2) return { ok: false, error: "Informe uma categoria válida." };
  if (normalized.length > 40) return { ok: false, error: "Categoria muito longa." };

  const { error } = await db
    .from("categorias")
    .upsert(
      { name: normalized, position: position ?? 999 },
      { onConflict: "name" }
    );
  if (error) return { ok: false, error: friendlyAdminError("Não consegui salvar essa categoria") };
  return { ok: true };
}

export async function deleteCategory(
  name: string,
  products: Product[]
): Promise<{ ok: boolean; error?: string }> {
  const db = getSupabaseClient({ requireServiceRole: true });
  if (!db) return { ok: false, error: "Banco de dados não configurado." };

  if (products.some((product) => product.category === name)) {
    return {
      ok: false,
      error: "Essa categoria ainda tem produtos cadastrados. Para apagar, edite esses produtos primeiro e escolha outra categoria para eles. Depois volte aqui e tente excluir novamente.",
    };
  }

  const { error } = await db.from("categorias").delete().eq("name", name);
  if (error) return { ok: false, error: friendlyAdminError("Não consegui excluir essa categoria") };
  return { ok: true };
}

export async function updateCategoryPositions(
  names: string[]
): Promise<{ ok: boolean; error?: string }> {
  const db = getSupabaseClient({ requireServiceRole: true });
  if (!db) return { ok: false, error: "Banco de dados não configurado." };

  const rows = names.map((name, i) => ({ name, position: i }));
  const { error } = await db.from("categorias").upsert(rows, { onConflict: "name" });
  if (error) return { ok: false, error: friendlyAdminError("Não consegui salvar a ordem das categorias") };
  return { ok: true };
}
