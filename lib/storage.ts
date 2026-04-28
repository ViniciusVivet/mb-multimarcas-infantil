import { getSupabaseClient } from "./supabase";

export async function uploadProductImage(
  file: File
): Promise<{ url?: string; error?: string }> {
  const db = getSupabaseClient();
  if (!db) return { error: "Storage não configurado." };

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `produtos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await db.storage
    .from("produtos")
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) return { error: error.message };

  const { data } = db.storage.from("produtos").getPublicUrl(path);
  return { url: data.publicUrl };
}
