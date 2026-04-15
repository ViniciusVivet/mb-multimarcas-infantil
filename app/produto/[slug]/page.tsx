import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { getWhatsappLink } from "@/data/store";
import { products } from "@/data/products";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = products.find((item) => item.slug === params.slug);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.images[0],
          width: 900,
          height: 1125,
          alt: product.name,
        },
      ],
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((item) => item.slug === params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="bg-paper">
        <section className="grid min-h-[calc(100svh-76px)] grid-cols-1 bg-white lg:grid-cols-[1.1fr_0.9fr]">
          <ProductGallery product={product} />
          <div className="flex items-start px-5 py-12 sm:px-10 lg:px-14 lg:py-16">
            <div className="w-full max-w-xl">
              <Link href="/#catalogo" className="mb-6 inline-flex items-center gap-1 font-bold text-coral hover:text-[#d95749] transition-colors text-sm">
                ← Voltar ao catálogo
              </Link>
              <p className="eyebrow">{product.category}</p>
              <h1 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-tight tracking-tight">
                {product.name}
              </h1>
              <p className="mt-5 text-base leading-7 text-muted font-semibold">{product.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                <div className="rounded-2xl bg-coral/10 border-2 border-coral/20 px-4 py-2.5">
                  <p className="text-xs font-bold text-coral/70 uppercase tracking-wide mb-0.5">Preço</p>
                  <p className="text-xl font-black text-ink">{product.price}</p>
                </div>
                <div className="rounded-2xl bg-paper border-2 border-line px-4 py-2.5">
                  <p className="text-xs font-bold text-muted uppercase tracking-wide mb-0.5">Tamanhos</p>
                  <p className="text-sm font-extrabold text-ink">{product.sizes.join(", ")}</p>
                </div>
              </div>

              <div className="mt-3 rounded-2xl bg-[#e8f6f1] border border-mint/30 px-4 py-3">
                <p className="text-sm font-semibold text-[#2a8c7a]">
                  💬 Chame no WhatsApp para confirmar tamanho e disponibilidade antes de separar sua peça!
                </p>
              </div>

              <a
                className="button button-whatsapp mt-6 w-full sm:w-auto gap-2 text-base px-8"
                href={getWhatsappLink(product.name)}
                target="_blank"
                rel="noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Tenho interesse nessa peça!
              </a>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="px-5 py-16 sm:px-10 lg:px-16">
            <div className="mb-8">
              <p className="eyebrow">Veja também</p>
              <h2 className="text-3xl font-black tracking-tight">Outras peças de {product.category}</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        )}

        <section className="mx-5 mb-16 rounded-3xl bg-gradient-to-br from-coral/90 to-[#d95749] px-8 py-12 text-center text-white sm:mx-10 lg:mx-16">
          <p className="text-sm font-extrabold uppercase tracking-widest text-white/70 mb-3">Atendimento</p>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-black leading-tight">
            Chame a loja para confirmar medidas e disponibilidade. 💬
          </h2>
          <a
            className="button mt-6 bg-white text-coral font-black hover:bg-white/90 shadow-md"
            href={getWhatsappLink(product.name)}
            target="_blank"
            rel="noreferrer"
          >
            Falar no WhatsApp
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
