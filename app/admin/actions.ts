"use server";

import { createHmac } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createProduct, updateProduct, deleteProduct } from "@/lib/products-db";

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
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: "/",
  });

  redirect("/admin/produtos");
}

export async function logoutAction() {
  cookies().delete("mb_admin_session");
  redirect("/admin");
}

// ── Produtos ─────────────────────────────────────────────────────────────────

function parseFormProduct(formData: FormData) {
  const sizes = (formData.get("sizes") as string)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const images = (formData.get("images") as string)
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    price: formData.get("price") as string,
    description: formData.get("description") as string,
    sizes,
    images,
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

export async function deletarProdutoAction(slug: string) {
  await deleteProduct(slug);
  revalidatePath("/");
  revalidatePath("/admin/produtos");
}
