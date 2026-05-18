import { getSupabaseClient } from "./supabase";
import type { Product } from "@/data/products";

export function getUniqueCategories(products: Product[]): string[] {
  return Array.from(new Set(products.map((p) => p.category)));
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
  return [...unique].sort((a, b) => (posMap.get(a) ?? 999) - (posMap.get(b) ?? 999));
}

export async function updateCategoryPositions(
  names: string[]
): Promise<{ ok: boolean; error?: string }> {
  const db = getSupabaseClient({ requireServiceRole: true });
  if (!db) return { ok: false, error: "Banco de dados não configurado." };

  const rows = names.map((name, i) => ({ name, position: i }));
  const { error } = await db.from("categorias").upsert(rows, { onConflict: "name" });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
