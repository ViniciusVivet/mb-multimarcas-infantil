import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { getWhatsappLink } from "@/data/store";

export default function PedidoSucessoPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-[70vh] items-center justify-center bg-paper px-4 py-16 text-center">
        <div className="max-w-md rounded-3xl bg-white p-8 shadow-soft">
          <p className="text-5xl">OK</p>
          <h1 className="mt-4 text-2xl font-black text-ink">Pagamento recebido</h1>
          <p className="mt-3 text-sm font-semibold leading-6 text-muted">
            Seu pedido foi enviado para a loja. Chame no WhatsApp para combinar entrega ou retirada.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a className="button button-whatsapp flex-1" href={getWhatsappLink()} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <Link className="button button-secondary flex-1" href="/">
              Voltar ao site
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
