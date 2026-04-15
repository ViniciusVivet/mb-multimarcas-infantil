import Image from "next/image";
import { getWhatsappLink } from "@/data/store";

export function Hero() {
  return (
    <section id="inicio" className="relative grid min-h-[calc(100svh-76px)] items-end overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=1800&q=80"
        alt="Crianca usando roupa infantil clara em ambiente aconchegante"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/10 md:bg-gradient-to-r md:from-ink/80 md:via-ink/30 md:to-ink/5" />
      <div className="relative z-10 mb-12 ml-5 w-[calc(100%-40px)] max-w-3xl text-white sm:mb-16 md:mb-24 md:ml-16 lg:ml-24">
        <p className="mb-3 text-sm font-black uppercase tracking-normal text-sun">
          Moda infantil com atendimento pertinho de voce
        </p>
        <h1 className="max-w-[13ch] text-[clamp(2.45rem,6vw,5.4rem)] font-black leading-[0.96] tracking-normal">
          Looks fofos, confortaveis e prontos para encantar no dia a dia.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90">
          Veja pecas selecionadas da MB Multimarcas Infantil e chame no WhatsApp para consultar tamanhos,
          valores e disponibilidade.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="button button-primary" href="#catalogo">
            Ver catalogo
          </a>
          <a className="button button-secondary" href={getWhatsappLink()} target="_blank" rel="noreferrer">
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
