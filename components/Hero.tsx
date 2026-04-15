import Image from "next/image";
import { getWhatsappLink } from "@/data/store";

export function Hero() {
  return (
    <section id="inicio" className="relative grid min-h-[calc(100svh-76px)] items-end overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=1800&q=80"
        alt="Crianças com roupas infantis coloridas e alegres"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/5 md:bg-gradient-to-r md:from-ink/85 md:via-ink/35 md:to-ink/0" />

      {/* Decorative dots */}
      <div className="absolute top-8 right-8 hidden md:flex gap-2 opacity-60">
        <span className="h-3 w-3 rounded-full bg-rose" />
        <span className="h-3 w-3 rounded-full bg-sun" />
        <span className="h-3 w-3 rounded-full bg-mint" />
      </div>

      <div className="relative z-10 mb-14 ml-5 w-[calc(100%-40px)] max-w-3xl text-white sm:mb-20 md:mb-28 md:ml-16 lg:ml-24">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-sun animate-pulse" />
          <p className="text-sm font-bold text-white/90">
            Moda infantil com atendimento no WhatsApp ✨
          </p>
        </div>

        <h1 className="max-w-[14ch] text-[clamp(2.2rem,5.5vw,5rem)] font-black leading-[0.95] tracking-tight">
          Looks fofos que encantam do primeiro ao último detalhe.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-white/85 font-semibold">
          Veja peças selecionadas da MB Multimarcas e chame no WhatsApp para consultar tamanhos, valores e disponibilidade.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a className="button button-primary" href="#catalogo">
            Ver catálogo 🛍️
          </a>
          <a className="button button-secondary" href={getWhatsappLink()} target="_blank" rel="noreferrer">
            Chamar no WhatsApp
          </a>
        </div>

        <div className="mt-10 flex items-center gap-6">
          <div className="text-center">
            <p className="text-2xl font-black text-sun">+50</p>
            <p className="text-xs font-semibold text-white/70">Modelos</p>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div className="text-center">
            <p className="text-2xl font-black text-rose">100%</p>
            <p className="text-xs font-semibold text-white/70">Qualidade</p>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div className="text-center">
            <p className="text-2xl font-black text-mint">❤️</p>
            <p className="text-xs font-semibold text-white/70">Amor em cada peça</p>
          </div>
        </div>
      </div>
    </section>
  );
}
