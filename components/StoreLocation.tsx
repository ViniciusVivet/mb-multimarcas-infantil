import { getWhatsappLink } from "@/data/store";

export function StoreLocation() {
  const mapsUrl =
    "https://maps.google.com/maps?q=Rua+Benigno+Nogueira+Franco,181,Jardim+das+Oliveiras,São+Paulo,SP&output=embed&z=16";
  const mapsLink =
    "https://maps.google.com/?q=Rua+Benigno+Nogueira+Franco,181,Jardim+das+Oliveiras,São+Paulo,SP";

  return (
    <section id="loja" className="bg-paper px-4 py-12 sm:px-10 lg:px-16 lg:py-20" aria-labelledby="loja-title">
      <div className="mx-auto max-w-6xl">

        {/* Título */}
        <div className="mb-8">
          <p className="eyebrow">Visite a loja</p>
          <h2 id="loja-title" className="text-2xl font-black leading-tight tracking-tight md:text-4xl">
            A gente te espera! 📍
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">

          {/* Info da loja */}
          <div className="flex flex-col gap-4">
            <div className="rounded-3xl border-2 border-line bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-coral/10 text-2xl">
                  📍
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-coral">Endereço</p>
                  <p className="mt-0.5 font-extrabold text-ink">MB Multimarcas Infantil</p>
                </div>
              </div>
              <p className="leading-6 text-muted font-semibold">
                Rua Benigno Nogueira Franco, 181<br />
                Jardim das Oliveiras<br />
                São Paulo — SP
              </p>
              <a
                href={mapsLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-paper border-2 border-line px-4 py-2.5 text-sm font-extrabold text-ink transition hover:border-coral hover:text-coral active:scale-95"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Abrir no Google Maps
              </a>
            </div>

            <div className="rounded-3xl border-2 border-line bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#25D366]/10 text-2xl">
                  💬
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-[#25D366]">WhatsApp</p>
                  <p className="mt-0.5 font-extrabold text-ink">Atendimento online</p>
                </div>
              </div>
              <p className="text-sm leading-6 text-muted font-semibold">
                Prefere receber em casa? Chame no WhatsApp e a gente combina tudo!
              </p>
              <a
                href={getWhatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="button button-whatsapp mt-4 w-full justify-center text-sm"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>

          {/* Mapa */}
          <div className="overflow-hidden rounded-3xl border-2 border-line shadow-sm" style={{ minHeight: 320 }}>
            <iframe
              src={mapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 320, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização MB Multimarcas Infantil"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
