import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legalInfo } from "@/data/legal";

export const metadata: Metadata = {
  title: "Trocas e Devolucoes",
  robots: "index,follow",
};

export default function TrocasDevolucoesPage() {
  return (
    <LegalPage
      title="Trocas e Devolucoes"
      description={`Ultima atualizacao: ${legalInfo.lastUpdated}. Esta pagina resume as regras de troca, devolucao e arrependimento da ${legalInfo.storeName}.`}
      sections={[
        {
          title: "Direito de arrependimento",
          paragraphs: [
            "Para compras realizadas pelo site, o cliente pode desistir da compra em ate 7 dias corridos a partir do recebimento do produto. O atendimento deve ser solicitado pelos canais da loja.",
          ],
        },
        {
          title: "Troca por tamanho, cor ou modelo",
          paragraphs: [
            "Trocas por tamanho, cor ou modelo dependem de disponibilidade em estoque. A loja informara as opcoes disponiveis e as condicoes de envio, retirada ou entrega.",
          ],
        },
        {
          title: "Produto com defeito",
          paragraphs: [
            "Se o produto apresentar defeito, entre em contato com fotos, numero do pedido e descricao do problema. A loja avaliara a solicitacao conforme o Codigo de Defesa do Consumidor.",
          ],
        },
        {
          title: "Condicoes do produto",
          items: [
            "produto sem sinais de uso indevido",
            "produto com etiqueta, embalagem ou acessorios quando aplicavel",
            "comprovante ou identificacao do pedido",
          ],
        },
        {
          title: "Reembolso",
          paragraphs: [
            "Quando aplicavel, o reembolso seguira a forma de pagamento combinada com a loja e os prazos das instituicoes financeiras envolvidas.",
          ],
        },
        {
          title: "Canal de atendimento",
          paragraphs: [
            `Solicitacoes de troca, devolucao ou arrependimento devem ser feitas pelo WhatsApp ${legalInfo.whatsapp} ou pelo e-mail ${legalInfo.email}.`,
          ],
        },
      ]}
    />
  );
}
