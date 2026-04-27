import Image from "next/image";
import { getWhatsappLink } from "@/data/store";

export function About() {
  return (
    <section id="sobre" className="grid bg-gradient-to-br from-[#fde8ec] via-[#fff6f8] to-[#e8f6f3] lg:grid-cols-2">
      <div className="self-center px-5 py-14 sm:px-10 lg:px-16">
        <p className="eyebrow">Quem somos</p>
        <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-black leading-tight tracking-tight">
          Moda infantil com carinho, qualidade e atendimento próximo. 🌸
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
          A <strong className="text-ink">MB Multimarcas Infantil</strong> nasceu do amor por moda e pelas crianças.
          Atendemos pelo WhatsApp para ajudar cada mamãe e papai a escolher a peça certa,
          confirmar medidas e combinar a entrega com cuidado.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3 max-w-xs">
          <div className="rounded-2xl bg-white p-4 text-center shadow-sm border border-line">
            <p className="text-2xl font-black text-coral">+50</p>
            <p className="text-xs font-semibold text-muted mt-1">Modelos</p>
          </div>
          <div className="rounded-2xl bg-white p-4 text-center shadow-sm border border-line">
            <p className="text-2xl font-black text-coral">100%</p>
            <p className="text-xs font-semibold text-muted mt-1">Qualidade</p>
          </div>
        </div>

        <a className="button button-primary mt-8" href={getWhatsappLink()} target="_blank" rel="noreferrer">
          💬 Falar com a loja
        </a>
      </div>
      <div className="relative min-h-[400px]">
        <Image
          src="/about.png"
          alt="Arara com roupas infantis coloridas"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/10 to-transparent" />
      </div>
    </section>
  );
}
