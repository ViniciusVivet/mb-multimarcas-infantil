import Image from "next/image";
import { getWhatsappLink } from "@/data/store";

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[35vh] items-end overflow-hidden md:min-h-[49vh]">
      <Image
        src="/hero.png"
        alt="Crianças com roupas infantis coloridas"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />

      <div className="relative z-10 w-full px-4 pb-7 md:ml-16 md:max-w-3xl md:pb-20 md:pl-0 lg:ml-24">
        <div className="mb-2.5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#25D366]" />
          <p className="text-[11px] font-bold text-white/90 md:text-sm">Atendimento pelo WhatsApp ✨</p>
        </div>

        <h1 className="text-[clamp(1.6rem,5vw,4.5rem)] font-black leading-tight tracking-tight text-white">
          Looks fofos que as crianças amam.
        </h1>

        <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          <a className="button button-primary px-5 py-2.5 text-sm md:px-6 md:py-3 md:text-base" href="#catalogo">
            Ver catálogo 🛍️
          </a>
          <a
            className="button button-secondary px-5 py-2.5 text-sm md:px-6 md:py-3 md:text-base"
            href={getWhatsappLink()}
            target="_blank"
            rel="noreferrer"
          >
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
