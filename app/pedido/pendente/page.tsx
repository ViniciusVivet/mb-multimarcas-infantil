import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";

export default function PedidoPendentePage() {
  return (
    <>
      <Header />
      <main className="flex min-h-[70vh] items-center justify-center bg-paper px-4 py-16 text-center">
        <div className="max-w-md rounded-3xl bg-white p-8 shadow-soft">
          <p className="text-5xl">...</p>
          <h1 className="mt-4 text-2xl font-black text-ink">Pagamento pendente</h1>
          <p className="mt-3 text-sm font-semibold leading-6 text-muted">
            O Mercado Pago ainda esta processando o pagamento. A loja recebe a atualizacao automaticamente.
          </p>
          <Link className="button button-primary mt-6" href="/">
            Voltar ao catalogo
          </Link>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
