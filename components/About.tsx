import Image from "next/image";
import { getWhatsappLink } from "@/data/store";

export function About() {
  return (
    <section id="sobre" className="grid min-h-[620px] bg-[#e8f6f1] lg:grid-cols-2">
      <div className="self-center px-5 py-14 sm:px-10 lg:px-16">
        <p className="eyebrow">MB Multimarcas Infantil</p>
        <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-black leading-none tracking-normal">
          Atendimento proximo para escolher com calma.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
          A MB Multimarcas Infantil atende pelo WhatsApp para ajudar cada cliente a escolher a peca certa,
          confirmar medidas e combinar retirada ou entrega.
        </p>
        <a className="button button-primary mt-8" href={getWhatsappLink()} target="_blank" rel="noreferrer">
          Falar com a loja
        </a>
      </div>
      <div className="relative min-h-[420px]">
        <Image
          src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80"
          alt="Arara com roupas infantis coloridas"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
