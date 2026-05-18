import { getSupabaseClient } from "./supabase";

const allowedImageTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export async function uploadProductImage(
  file: File
): Promise<{ url?: string; error?: string }> {
  const db = getSupabaseClient({ requireServiceRole: true });
  if (!db) return { error: "Storage não configurado." };

  if (file.size > 8 * 1024 * 1024) {
    return { error: "Imagem muito grande. Envie um arquivo de até 8 MB." };
  }

  const ext = allowedImageTypes[file.type];
  if (!ext) {
    return { error: "Formato inválido. Use JPG, PNG, WebP ou AVIF." };
  }

  const path = `produtos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await db.storage
    .from("produtos")
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) return { error: error.message };

  const { data } = db.storage.from("produtos").getPublicUrl(path);
  return { url: data.publicUrl };
}
