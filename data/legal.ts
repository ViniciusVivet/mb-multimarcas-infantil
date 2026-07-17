import { getStoreAddress, store } from "./store";

export const legalInfo = {
  storeName: store.name,
  document: store.document || "Documento da loja a informar",
  email: store.email || "E-mail de atendimento a informar",
  whatsapp: store.whatsappLabel,
  address: getStoreAddress(),
  lastUpdated: "25 de maio de 2026",
  dataProviders: ["Vercel", "Supabase", "WhatsApp"],
};

export const privacyDataItems = [
  "dados da consulta, como produto, tamanho, cor e quantidade escolhidos",
  "dados de contato enviados pelo cliente no atendimento, como WhatsApp e mensagens",
  "dados tecnicos de acesso necessarios para seguranca, funcionamento e prevencao de fraude",
];

export const privacyPurposes = [
  "atender consultas e organizar pedidos pelo WhatsApp",
  "confirmar disponibilidade, entrega, retirada, troca ou devolucao",
  "prestar atendimento ao cliente",
  "cumprir obrigacoes legais, fiscais, regulatórias e de defesa em eventual disputa",
  "manter a seguranca e o funcionamento do site",
];
