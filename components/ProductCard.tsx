import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { getWhatsappLink } from "@/data/store";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const hasMultipleImages = product.images.length > 1;

  return (
    <article className="group grid overflow-hidden rounded-3xl border-2 border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/produto/${product.slug}`} className="relative block aspect-[4/5] bg-paper overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {hasMultipleImages && (
          <div className="absolute bottom-3 right-3 flex gap-1">
            {product.images.map((_, i) => (
              <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-white" : "bg-white/50"}`} />
            ))}
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-extrabold text-coral shadow-sm backdrop-blur-sm">
            {product.category}
          </span>
        </div>
      </Link>
      <div className="grid gap-2.5 p-4">
        <h3 className="text-base font-extrabold leading-tight line-clamp-2">
          <Link href={`/produto/${product.slug}`} className="hover:text-coral transition-colors">
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-black text-ink">{product.price}</span>
          <span className="text-xs font-semibold text-muted">
            {product.sizes.length > 1 ? `${product.sizes[0]}–${product.sizes[product.sizes.length - 1]}` : product.sizes[0]}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Link
            className="button border-2 border-line bg-transparent text-ink hover:border-coral hover:text-coral min-h-10 px-3 py-2 text-sm"
            href={`/produto/${product.slug}`}
          >
            Ver peça
          </Link>
          <a
            className="button button-whatsapp min-h-10 px-3 py-2 text-sm"
            href={getWhatsappLink(product.name)}
            target="_blank"
            rel="noreferrer"
          >
            Quero! 💬
          </a>
        </div>
      </div>
    </article>
  );
}
