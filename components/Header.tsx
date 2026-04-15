import Link from "next/link";
import { getWhatsappLink, store } from "@/data/store";

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex min-h-[76px] items-center justify-between gap-4 border-b border-line bg-paper/95 px-5 backdrop-blur md:px-10 lg:px-16">
      <Link href="/" className="flex min-w-0 items-center gap-3" aria-label={store.name}>
        <span className="grid h-11 w-11 place-items-center rounded-lg bg-coral font-black text-white">MB</span>
        <span className="min-w-0 leading-none">
          <strong className="block truncate">{store.name.replace(" Infantil", "")}</strong>
          <small className="hidden text-muted sm:block">Infantil</small>
        </span>
      </Link>

      <nav className="hidden gap-8 font-black text-muted md:flex" aria-label="Navegacao principal">
        <Link className="hover:text-ink" href="/#catalogo">
          Catalogo
        </Link>
        <Link className="hover:text-ink" href="/#sobre">
          Sobre
        </Link>
        <Link className="hover:text-ink" href="/#contato">
          Contato
        </Link>
      </nav>

      <a
        className="button bg-ink px-4 py-2 text-white hover:bg-coral"
        href={getWhatsappLink()}
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
    </header>
  );
}
