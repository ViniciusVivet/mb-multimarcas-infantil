import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legalInfo } from "@/data/legal";

export const metadata: Metadata = {
  title: "Termos de Compra",
  robots: "index,follow",
};

export default function TermosPage() {
  return (
    <LegalPage
      title="Termos de Compra"
      description={`Ultima atualizacao: ${legalInfo.lastUpdated}. Estes termos explicam as regras basicas para comprar no site da ${legalInfo.storeName}.`}
      sections={[
        {
          title: "Identificacao da loja",
          paragraphs: [
            `${legalInfo.storeName}, ${legalInfo.document}. Atendimento pelo WhatsApp ${legalInfo.whatsapp} e e-mail ${legalInfo.email}. Endereco: ${legalInfo.address}.`,
          ],
        },
        {
          title: "Produtos e disponibilidade",
          paragraphs: [
            "O site apresenta produtos, tamanhos, cores e precos disponiveis para compra ou consulta. A confirmacao final do pedido depende da aprovacao do pagamento e da disponibilidade operacional da loja.",
            "Imagens podem ter pequenas variacoes de cor conforme tela, iluminacao e lote do produto.",
          ],
        },
        {
          title: "Pagamento",
          paragraphs: [
            `O pagamento online e processado pelo ${legalInfo.paymentProvider}. Ao clicar em comprar, o cliente e direcionado ao ambiente seguro de pagamento. O pedido e considerado confirmado apos aprovacao do pagamento.`,
          ],
        },
        {
          title: "Entrega ou retirada",
          paragraphs: [
            "Prazos, valores de entrega, retirada em loja e demais combinados logisticos devem ser confirmados no atendimento da loja. Se houver cobranca adicional de entrega, ela deve ser informada de forma clara antes da conclusao do atendimento.",
          ],
        },
        {
          title: "Cancelamento e arrependimento",
          paragraphs: [
            "Em compras online, o cliente pode exercer o direito de arrependimento em ate 7 dias corridos, contados do recebimento do produto, conforme o Codigo de Defesa do Consumidor.",
          ],
        },
        {
          title: "Atendimento",
          paragraphs: [
            `Duvidas sobre pedido, pagamento, entrega, troca ou devolucao devem ser enviadas pelo WhatsApp ${legalInfo.whatsapp} ou pelo e-mail ${legalInfo.email}.`,
          ],
        },
      ]}
    />
  );
}
