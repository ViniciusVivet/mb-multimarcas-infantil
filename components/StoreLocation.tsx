import { getWhatsappLink } from "@/data/store";

export function StoreLocation() {
  const mapsUrl =
    "https://maps.google.com/maps?q=Rua+Benigno+Nogueira+Franco,181,Jardim+das+Oliveiras,São+Paulo,SP&output=embed&z=16";
  const mapsLink =
    "https://maps.google.com/?q=Rua+Benigno+Nogueira+Franco,181,Jardim+das+Oliveiras,São+Paulo,SP";

  return (
    <section id="loja" className="bg-ink px-4 py-12 sm:px-10 lg:px-16 lg:py-20" aria-labelledby="loja-title">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
          <p className="mb-3 text-[0.75rem] font-extrabold uppercase tracking-widest text-coral">Visite a loja</p>
          <h2 id="loja-title" className="text-2xl font-black leading-tight tracking-tight text-white md:text-4xl">
            A gente te espera! 📍
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">

          {/* Info */}
          <div className="flex flex-col gap-4">
            <div className="rounded-3xl bg-white/8 border border-white/10 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-coral/20 text-xl">
                  📍
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-coral">Endereço</p>
                  <p className="mt-0.5 font-extrabold text-white">MB Multimarcas Infantil</p>
                </div>
              </div>
              <p className="leading-7 text-white/60 font-semibold text-sm">
                Rua Benigno Nogueira Franco, 181<br />
                Jardim das Oliveiras<br />
                São Paulo — SP
              </p>
              <a
                href={mapsLink}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/10 px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-white/20 active:scale-95"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Abrir no Google Maps
              </a>
            </div>

            <div className="rounded-3xl bg-white/8 border border-white/10 p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-coral/20 text-xl">
                  💬
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-coral">WhatsApp</p>
                  <p className="mt-0.5 font-extrabold text-white">Atendimento online</p>
                </div>
              </div>
              <p className="text-sm leading-6 text-white/60 font-semibold">
                Prefere receber em casa? Chame no WhatsApp e a gente combina tudo!
              </p>
              <a
                href={getWhatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="button button-primary mt-4 w-full justify-center text-sm"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>

          {/* Mapa */}
          <div className="overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]" style={{ minHeight: 340 }}>
            <iframe
              src={mapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 340, display: "block" }}
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
