import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products-db";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mbmultimarcasinfantil.com.br";
  const products = await getProducts();

  return [
    { url: baseUrl, priority: 1 },
    ...products.map((product) => ({
      url: `${baseUrl}/produto/${product.slug}`,
      priority: 0.8,
    })),
  ];
}
