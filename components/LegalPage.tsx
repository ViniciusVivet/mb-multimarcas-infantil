import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export function LegalPage({
  title,
  description,
  sections,
}: {
  title: string;
  description: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Header />
      <main className="bg-paper px-4 py-10 pb-28 sm:px-10 lg:px-16">
        <article className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-soft md:p-10">
          <Link href="/" className="text-sm font-bold text-coral hover:underline">
            Voltar ao site
          </Link>
          <h1 className="mt-4 text-3xl font-black leading-tight text-ink md:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-base font-semibold leading-7 text-muted">{description}</p>

          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-black text-ink">{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-sm font-semibold leading-7 text-muted">
                    {paragraph}
                  </p>
                ))}
                {section.items ? (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm font-semibold leading-7 text-muted">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
