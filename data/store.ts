export const store = {
  name: "MB Multimarcas Infantil",
  instagram: "https://www.instagram.com/mb.multimarcas_infantil/",
  whatsapp: "5511986013153",
};

export function getWhatsappLink(productName?: string) {
  const message = productName
    ? `Oi! Vi o produto "${productName}" no site da MB Multimarcas e gostaria de saber se ainda está disponível. 😊`
    : "Oi! Vim pelo site da MB Multimarcas Infantil e gostaria de conhecer os produtos. 😊";

  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`;
}
