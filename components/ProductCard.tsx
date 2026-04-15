import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { getWhatsappLink } from "@/data/store";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="grid overflow-hidden rounded-lg border border-line bg-white shadow-[0_10px_28px_rgba(36,48,47,0.08)]">
      <Link href={`/produto/${product.slug}`} className="relative block aspect-[4/5] bg-paper">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-300 hover:scale-[1.03]"
        />
      </Link>
      <div className="grid gap-3 p-4">
        <span className="text-xs font-black uppercase tracking-normal text-coral">{product.category}</span>
        <h3 className="min-h-12 text-lg font-black leading-tight">
          <Link href={`/produto/${product.slug}`}>{product.name}</Link>
        </h3>
        <span className="font-black">{product.price}</span>
        <div className="grid grid-cols-2 gap-2">
          <Link className="button button-outline min-h-11 px-3 py-2 text-sm" href={`/produto/${product.slug}`}>
            Detalhes
          </Link>
          <a
            className="button button-primary min-h-11 px-3 py-2 text-sm"
            href={getWhatsappLink(product.name)}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
