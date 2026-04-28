"use server";

import { createHmac } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createProduct, updateProduct, deleteProduct, updatePositions } from "@/lib/products-db";
import { uploadProductImage } from "@/lib/storage";

// ── Auth ────────────────────────────────────────────────────────────────────

function deriveSessionToken(password: string) {
  return createHmac("sha256", password).update("mb-admin-session-v1").digest("hex");
}

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return { error: "ADMIN_PASSWORD não configurado no servidor." };
  }

  if (password !== adminPassword) {
    return { error: "Senha incorreta." };
  }

  cookies().set("mb_admin_session", deriveSessionToken(adminPassword), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/admin/produtos");
}

export async function logoutAction() {
  cookies().delete("mb_admin_session");
  redirect("/admin");
}

// ── Upload de imagem ──────────────────────────────────────────────────────────

export async function uploadImageAction(
  formData: FormData
): Promise<{ url?: string; error?: string }> {
  const file = formData.get("file") as File;
  if (!file || file.size === 0) return { error: "Arquivo inválido." };
  return uploadProductImage(file);
}

// ── Produtos ─────────────────────────────────────────────────────────────────

function parseFormProduct(formData: FormData) {
  const sizes = (formData.get("sizes") as string)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  let images: string[] = [];
  try {
    images = JSON.parse(formData.get("images") as string) as string[];
  } catch {
    images = [];
  }

  const videos = [
    formData.get("video_0") as string,
    formData.get("video_1") as string,
  ].filter(Boolean);

  return {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    price: formData.get("price") as string,
    description: formData.get("description") as string,
    sizes,
    images,
    videos,
  };
}

export async function criarProdutoAction(
  _: unknown,
  formData: FormData
): Promise<{ error?: string }> {
  const data = parseFormProduct(formData);
  const result = await createProduct(data);
  if (!result.ok) return { error: result.error };
  revalidatePath("/");
  revalidatePath("/admin/produtos");
  redirect("/admin/produtos");
}

export async function atualizarProdutoAction(
  slug: string,
  _: unknown,
  formData: FormData
): Promise<{ error?: string }> {
  const data = parseFormProduct(formData);
  const result = await updateProduct(slug, data);
  if (!result.ok) return { error: result.error };
  revalidatePath("/");
  revalidatePath("/admin/produtos");
  redirect("/admin/produtos");
}

export async function deletarProdutoAction(slug: string): Promise<{ error?: string }> {
  const result = await deleteProduct(slug);
  if (!result.ok) return { error: result.error };
  revalidatePath("/");
  revalidatePath("/admin/produtos");
  return {};
}

export async function updatePositionsAction(slugs: string[]) {
  await updatePositions(slugs);
  revalidatePath("/");
  revalidatePath("/admin/produtos");
}
