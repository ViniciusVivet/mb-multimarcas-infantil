"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getWhatsappLink, store } from "@/data/store";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-line bg-paper/95 px-4 backdrop-blur-xl transition-all duration-300 md:px-10 lg:px-16 ${
      scrolled ? "min-h-[52px] shadow-soft md:min-h-[60px]" : "min-h-[64px] md:min-h-[76px]"
    }`}>

      <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label={store.name}>
        <div className={`relative flex-shrink-0 overflow-hidden rounded-xl shadow-sm transition-all duration-300 md:rounded-2xl ${scrolled ? "h-8 w-8 md:h-9 md:w-9" : "h-10 w-10 md:h-12 md:w-12"}`}>
          <Image
            src="/logo.jpg"
            alt="MB Multimarcas Infantil"
            fill
            sizes="48px"
            className="object-cover"
            priority
          />
        </div>
        <span className="min-w-0 leading-none">
          <strong className="block truncate text-sm md:text-base">MB Multimarcas</strong>
          <small className="text-[10px] font-bold text-muted md:text-xs">Moda Infantil</small>
        </span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden gap-8 font-bold text-muted md:flex" aria-label="Navegação principal">
        <Link className="hover:text-coral transition-colors" href="/#catalogo">Catálogo</Link>
        <Link className="hover:text-coral transition-colors" href="/#sobre">Sobre</Link>
        <Link className="hover:text-coral transition-colors" href="/#contato">Contato</Link>
      </nav>

      {/* Desktop WhatsApp button */}
      <a
        className="button button-primary hidden px-4 py-2 text-sm gap-2 md:inline-flex"
        href={getWhatsappLink()}
        target="_blank"
        rel="noreferrer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        WhatsApp
      </a>

      {/* Mobile: catalog shortcut */}
      <a
        href="/#catalogo"
        className="flex items-center gap-1 rounded-full bg-coral px-3 py-2 text-xs font-extrabold text-white shadow-sm active:scale-95 md:hidden"
      >
        Ver peças
      </a>

    </header>
  );
}
