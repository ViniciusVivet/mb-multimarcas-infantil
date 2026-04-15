import type { Metadata } from "next";
import Image from "next/image";
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
        <section className="grid min-h-[calc(100svh-76px)] grid-cols-1 bg-white lg:grid-cols-[1.05fr_0.95fr]">
          <ProductGallery product={product} />
          <div className="flex items-center px-5 py-12 sm:px-10 lg:px-16">
            <div className="w-full max-w-xl">
              <Link href="/#catalogo" className="mb-8 inline-flex font-black text-coral">
                Voltar ao catalogo
              </Link>
              <p className="eyebrow">{product.category}</p>
              <h1 className="max-w-[13ch] text-[clamp(2.4rem,5vw,5rem)] font-black leading-[0.96] tracking-normal">
                {product.name}
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted">{product.description}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                <span className="rounded-lg border border-line bg-paper px-3 py-2 font-black">{product.price}</span>
                <span className="rounded-lg border border-line bg-paper px-3 py-2 font-black">
                  Tamanhos: {product.sizes.join(", ")}
                </span>
              </div>
              <a
                className="button button-primary mt-8 w-full sm:w-auto"
                href={getWhatsappLink(product.name)}
                target="_blank"
                rel="noreferrer"
              >
                Tenho interesse
              </a>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 ? (
          <section className="px-5 py-16 sm:px-10 lg:px-16">
            <div className="mb-8">
              <p className="eyebrow">Veja tambem</p>
              <h2 className="text-4xl font-black tracking-normal">Outras pecas da categoria</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="relative min-h-[360px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1400&q=80"
            alt="Arara com roupas infantis coloridas"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/55" />
          <div className="relative z-10 flex min-h-[360px] items-center px-5 py-14 text-white sm:px-10 lg:px-16">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-black uppercase text-sun">Atendimento</p>
              <h2 className="text-[clamp(2rem,4vw,4rem)] font-black leading-none tracking-normal">
                Chame a loja para confirmar medidas e disponibilidade.
              </h2>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
