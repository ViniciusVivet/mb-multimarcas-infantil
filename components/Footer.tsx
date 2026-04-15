import Image from "next/image";
import { store } from "@/data/store";

export function Footer() {
  return (
    <footer className="bg-ink px-5 py-8 text-white sm:px-10 lg:px-16">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl flex-shrink-0">
            <Image
              src="/logo.jpg"
              alt="MB Multimarcas Infantil"
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-black text-sm">{store.name}</p>
            <p className="text-xs text-white/50 font-semibold">Moda infantil com carinho ❤️</p>
          </div>
        </div>

        <div className="flex flex-col gap-1 sm:text-right">
          <a href={store.instagram} target="_blank" rel="noreferrer" className="text-sm text-white/70 hover:text-white transition-colors font-semibold">
            📸 @mb.multimarcas_infantil
          </a>
          <a
            href={`https://wa.me/${store.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-white/70 hover:text-white transition-colors font-semibold"
          >
            💬 (11) 98601-3153
          </a>
        </div>
      </div>

      <div className="mt-6 border-t border-white/10 pt-5 text-center text-xs text-white/30 font-semibold">
        © {new Date().getFullYear()} MB Multimarcas Infantil · Todos os direitos reservados
      </div>
    </footer>
  );
}
