export const store = {
  name: "MB Multimarcas Infantil",
  instagram: "https://www.instagram.com/mb.multimarcas_infantil/",
  whatsapp: "5500000000000",
};

export function getWhatsappLink(productName?: string) {
  const message = productName
    ? `Ola! Vi o produto ${productName} no site e gostaria de saber se ainda esta disponivel.`
    : "Ola! Vim pelo site da MB Multimarcas Infantil e gostaria de conhecer os produtos.";

  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`;
}
