import { getStoreAddress, store } from "./store";

export const legalInfo = {
  storeName: store.name,
  document: store.document || "Documento da loja a informar",
  email: store.email || "E-mail de atendimento a informar",
  whatsapp: store.whatsappLabel,
  address: getStoreAddress(),
  lastUpdated: "25 de maio de 2026",
  paymentProvider: "Mercado Pago",
  dataProviders: ["Vercel", "Supabase", "Mercado Pago"],
};

export const privacyDataItems = [
  "dados do pedido, como produto, tamanho, cor, quantidade, valor e status do pagamento",
  "dados de contato enviados pelo cliente no atendimento, como WhatsApp e mensagens",
  "dados recebidos do Mercado Pago para confirmar o pagamento, como identificador do pagamento e e-mail do pagador",
  "dados tecnicos de acesso necessarios para seguranca, funcionamento e prevencao de fraude",
];

export const privacyPurposes = [
  "processar pedidos e pagamentos",
  "confirmar disponibilidade, entrega, retirada, troca ou devolucao",
  "prestar atendimento ao cliente",
  "cumprir obrigacoes legais, fiscais, regulatórias e de defesa em eventual disputa",
  "manter a seguranca e o funcionamento do site",
];
