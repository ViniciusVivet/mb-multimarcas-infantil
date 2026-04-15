import { getWhatsappLink, store } from "@/data/store";

export function Contact() {
  return (
    <section id="contato" className="px-5 py-16 text-center sm:px-10 lg:px-16 lg:py-24" aria-labelledby="contato-title">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Atendimento</p>
        <h2 id="contato-title" className="text-[clamp(2rem,4vw,3.4rem)] font-black leading-none tracking-normal">
          Gostou de alguma peca?
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-8 text-muted">
          Chame no WhatsApp ou acompanhe as novidades pelo Instagram.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a className="button button-primary" href={getWhatsappLink()} target="_blank" rel="noreferrer">
            Chamar no WhatsApp
          </a>
          <a className="button button-outline" href={store.instagram} target="_blank" rel="noreferrer">
            Ver Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
