"use server";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createProduct, updateProduct, deleteProduct, updatePositions } from "@/lib/products-db";
import {
  createCategory,
  deleteCategory,
  updateCategoryPositions,
} from "@/lib/categories-db";
import { uploadProductImage } from "@/lib/storage";
import { getProducts } from "@/lib/products-db";

// ── Auth ────────────────────────────────────────────────────────────────────

function deriveSessionToken(password: string) {
  return createHmac("sha256", password).update("mb-admin-session-v1").digest("hex");
}

const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 8;

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  return aBuffer.length === bBuffer.length && timingSafeEqual(aBuffer, bBuffer);
}

async function getRequesterKey() {
  const headerStore = await headers();
  return (
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip") ||
    "unknown"
  );
}

function isLoginRateLimited(key: string) {
  const now = Date.now();
  const current = loginAttempts.get(key);
  if (!current || current.resetAt <= now) {
    loginAttempts.set(key, { count: 0, resetAt: now + LOGIN_WINDOW_MS });
    return false;
  }
  return current.count >= MAX_LOGIN_ATTEMPTS;
}

function registerFailedLogin(key: string) {
  const now = Date.now();
  const current = loginAttempts.get(key);
  if (!current || current.resetAt <= now) {
    loginAttempts.set(key, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return;
  }
  loginAttempts.set(key, { ...current, count: current.count + 1 });
}

function clearFailedLogins(key: string) {
  loginAttempts.delete(key);
}

async function getAdminAuthError() {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return "ADMIN_PASSWORD não configurado no servidor.";

  const cookieStore = await cookies();
  const session = cookieStore.get("mb_admin_session")?.value;
  const expected = deriveSessionToken(adminPassword);
  if (!session || !safeEqual(session, expected)) return "Sessão expirada. Faça login novamente.";

  return null;
}

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const requesterKey = await getRequesterKey();

  if (!adminPassword) {
    return { error: "ADMIN_PASSWORD não configurado no servidor." };
  }

  if (isLoginRateLimited(requesterKey)) {
    return { error: "Muitas tentativas. Aguarde alguns minutos e tente novamente." };
  }

  if (!safeEqual(password ?? "", adminPassword)) {
    registerFailedLogin(requesterKey);
    return { error: "Senha incorreta." };
  }

  clearFailedLogins(requesterKey);
  const cookieStore = await cookies();
  cookieStore.set("mb_admin_session", deriveSessionToken(adminPassword), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/admin/produtos");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("mb_admin_session");
  redirect("/admin");
}

// ── Upload de imagem ──────────────────────────────────────────────────────────

export async function uploadImageAction(
  formData: FormData
): Promise<{ url?: string; error?: string }> {
  const authError = await getAdminAuthError();
  if (authError) return { error: authError };

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

  const colors = ((formData.get("colors") as string | null) ?? "")
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
    colors,
    images,
    videos,
  };
}

export async function criarProdutoAction(
  _: unknown,
  formData: FormData
): Promise<{ error?: string }> {
  const authError = await getAdminAuthError();
  if (authError) return { error: authError };

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
  const authError = await getAdminAuthError();
  if (authError) return { error: authError };

  const data = parseFormProduct(formData);
  const result = await updateProduct(slug, data);
  if (!result.ok) return { error: result.error };
  revalidatePath("/");
  revalidatePath("/admin/produtos");
  redirect("/admin/produtos");
}

export async function deletarProdutoAction(slug: string): Promise<{ error?: string }> {
  const authError = await getAdminAuthError();
  if (authError) return { error: authError };

  const result = await deleteProduct(slug);
  if (!result.ok) return { error: result.error };
  revalidatePath("/");
  revalidatePath("/admin/produtos");
  return {};
}

export async function updatePositionsAction(slugs: string[]): Promise<{ error?: string }> {
  const authError = await getAdminAuthError();
  if (authError) return { error: authError };

  const result = await updatePositions(slugs);
  if (!result.ok) return { error: result.error };
  revalidatePath("/");
  revalidatePath("/admin/produtos");
  return {};
}

export async function updateCategoryPositionsAction(
  names: string[]
): Promise<{ error?: string }> {
  const authError = await getAdminAuthError();
  if (authError) return { error: authError };

  const result = await updateCategoryPositions(names);
  if (!result.ok) return { error: result.error };
  revalidatePath("/");
  revalidatePath("/admin/categorias");
  return {};
}

export async function createCategoryAction(formData: FormData): Promise<{ name?: string; error?: string }> {
  const authError = await getAdminAuthError();
  if (authError) return { error: authError };

  const name = formData.get("name") as string;
  const result = await createCategory(name);
  if (!result.ok) return { error: result.error };
  revalidatePath("/");
  revalidatePath("/admin/categorias");
  revalidatePath("/admin/produtos/novo");
  return { name: result.name };
}

export async function deleteCategoryAction(name: string): Promise<{ error?: string }> {
  const authError = await getAdminAuthError();
  if (authError) return { error: authError };

  const products = await getProducts();
  const result = await deleteCategory(name, products);
  if (!result.ok) return { error: result.error };
  revalidatePath("/");
  revalidatePath("/admin/categorias");
  revalidatePath("/admin/produtos/novo");
  return {};
}
