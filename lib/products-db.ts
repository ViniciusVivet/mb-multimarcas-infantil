import { products as staticProducts, type Product } from "@/data/products";
import { getSupabaseClient } from "./supabase";

export function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function getProducts(): Promise<Product[]> {
  const db = getSupabaseClient();
  if (!db) return staticProducts;
  const { data, error } = await db.from("produtos").select("*").order("created_at", { ascending: false });
  if (error || !data?.length) return staticProducts;
  return data as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const db = getSupabaseClient();
  if (!db) return staticProducts.find((p) => p.slug === slug) ?? null;
  const { data, error } = await db.from("produtos").select("*").eq("slug", slug).single();
  if (error || !data) return staticProducts.find((p) => p.slug === slug) ?? null;
  return data as Product;
}

export async function createProduct(
  input: Omit<Product, "slug">
): Promise<{ ok: boolean; slug?: string; error?: string }> {
  const db = getSupabaseClient();
  if (!db) return { ok: false, error: "Banco de dados não configurado. Veja ADMIN_SETUP.md." };
  const slug = slugify(input.name);
  const { error } = await db.from("produtos").insert({ ...input, slug });
  if (error) return { ok: false, error: error.message };
  return { ok: true, slug };
}

export async function updateProduct(
  slug: string,
  input: Partial<Omit<Product, "slug">>
): Promise<{ ok: boolean; error?: string }> {
  const db = getSupabaseClient();
  if (!db) return { ok: false, error: "Banco de dados não configurado. Veja ADMIN_SETUP.md." };
  const { error } = await db.from("produtos").update(input).eq("slug", slug);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function deleteProduct(slug: string): Promise<{ ok: boolean; error?: string }> {
  const db = getSupabaseClient();
  if (!db) return { ok: false, error: "Banco de dados não configurado. Veja ADMIN_SETUP.md." };
  const { error } = await db.from("produtos").delete().eq("slug", slug);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
