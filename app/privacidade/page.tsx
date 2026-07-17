import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legalInfo, privacyDataItems, privacyPurposes } from "@/data/legal";

export const metadata: Metadata = {
  title: "Politica de Privacidade",
  robots: "index,follow",
};

export default function PrivacidadePage() {
  return (
    <LegalPage
      title="Politica de Privacidade"
      description={`Ultima atualizacao: ${legalInfo.lastUpdated}. Esta politica explica como a ${legalInfo.storeName} trata dados pessoais no site e no atendimento.`}
      sections={[
        {
          title: "Quem controla os dados",
          paragraphs: [
            `${legalInfo.storeName}, ${legalInfo.document}, com atendimento pelo WhatsApp ${legalInfo.whatsapp} e e-mail ${legalInfo.email}. Endereco: ${legalInfo.address}.`,
          ],
        },
        {
          title: "Quais dados podemos tratar",
          items: privacyDataItems,
        },
        {
          title: "Para que usamos os dados",
          items: privacyPurposes,
        },
        {
          title: "Compartilhamento",
          paragraphs: [
            `Podemos compartilhar dados apenas quando necessario para operar o site, prestar atendimento, cumprir obrigacoes legais ou defender direitos. Hoje usamos servicos como ${legalInfo.dataProviders.join(", ")}.`,
          ],
        },
        {
          title: "Tempo de guarda",
          paragraphs: [
            "Dados de pedidos podem ser mantidos pelo tempo necessario para atendimento, comprovacao da compra, obrigacoes legais, fiscais, contabeis e defesa em disputas. Dados que nao forem mais necessarios poderao ser eliminados ou anonimizados.",
          ],
        },
        {
          title: "Direitos do titular",
          paragraphs: [
            "O cliente pode solicitar acesso, correcao, informacoes sobre uso, revisao, portabilidade, exclusao ou limitacao do tratamento dos seus dados, conforme a LGPD. Para exercer esses direitos, entre em contato pelos canais de atendimento da loja.",
          ],
        },
        {
          title: "Seguranca",
          paragraphs: [
            "Adotamos medidas tecnicas e administrativas razoaveis para proteger os dados. Mesmo assim, nenhum sistema e totalmente livre de riscos, por isso as credenciais de acesso devem ser mantidas em sigilo.",
          ],
        },
      ]}
    />
  );
}
