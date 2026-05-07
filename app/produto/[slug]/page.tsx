import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductActions } from "@/components/ProductActions";
import { products as staticProducts } from "@/data/products";
import { getProductBySlug, getProducts } from "@/lib/products-db";

type Props = { params: { slug: string } };

export const revalidate = 60;

export async function generateStaticParams() {
  return staticProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0], width: 900, height: 1125, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const [product, allProducts] = await Promise.all([
    getProductBySlug(params.slug),
    getProducts(),
  ]);
  if (!product) notFound();

  const related = allProducts
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="bg-paper pb-32 md:pb-0">

        {/* Layout principal */}
        <section className="grid bg-white lg:grid-cols-[1.1fr_0.9fr]">
          <ProductGallery product={product} />

          <div className="px-4 py-8 sm:px-8 lg:px-12 lg:py-14">
            <Link
              href="/#catalogo"
              className="mb-5 inline-flex items-center gap-1.5 text-sm font-bold text-coral hover:text-[#b02858] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Voltar ao catálogo
            </Link>

            <p className="eyebrow">{product.category}</p>
            <h1 className="text-2xl font-black leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            <p className="mt-4 leading-7 text-muted font-semibold">{product.description}</p>

            {/* Preço */}
            <div className="mt-5">
              <div className="inline-block rounded-2xl bg-coral/10 border-2 border-coral/20 px-4 py-2.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-coral/70">Preço</p>
                <p className="text-xl font-black text-ink">{product.price}</p>
              </div>
            </div>

            {/* Seletor de tamanho + CTAs WhatsApp */}
            <ProductActions product={product} />
          </div>
        </section>

        {/* Produtos relacionados */}
        {related.length > 0 && (
          <section className="px-4 py-10 sm:px-10 lg:px-16">
            <p className="eyebrow">Veja também</p>
            <h2 className="mb-6 text-xl font-black tracking-tight md:text-3xl">
              Outras peças de {product.category}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />

      <BottomNav />
    </>
  );
}
