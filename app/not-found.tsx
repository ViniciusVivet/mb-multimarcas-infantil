import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <p className="text-6xl">🔍</p>
        <h1 className="mt-4 text-3xl font-black text-ink">Página não encontrada</h1>
        <p className="mt-2 text-muted">Essa página não existe ou foi removida.</p>
        <Link href="/" className="button button-primary mt-6 px-6 py-3">
          Voltar ao início
        </Link>
      </main>
      <Footer />
    </>
  );
}
