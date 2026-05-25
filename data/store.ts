export const store = {
  name: "MB Multimarcas Infantil",
  instagram: "https://www.instagram.com/mb.multimarcas_infantil/",
  whatsapp: "5511986013153",
  whatsappLabel: "(11) 98601-3153",
  email: "",
  document: "",
  address: {
    street: "Rua Benigno Nogueira Franco, 181",
    district: "Jardim das Oliveiras",
    city: "Sao Paulo",
    state: "SP",
  },
};

export function getStoreAddress() {
  const { street, district, city, state } = store.address;
  return `${street}, ${district}, ${city} - ${state}`;
}

export function getWhatsappLink(productName?: string, size?: string, color?: string) {
  let message: string;
  if (productName && size) {
    const colorLine = color ? `\nCor escolhida: ${color}` : "";
    message = `Oi! Vi esse produto no site da MB Multimarcas Infantil e gostaria de saber se ainda está disponível.\n\nProduto: ${productName}\nTamanho escolhido: ${size}${colorLine}`;
  } else if (productName) {
    message = `Oi! Vi esse produto no site da MB Multimarcas Infantil e gostaria de saber se ainda está disponível.\n\nProduto: ${productName}`;
  } else {
    message = "Oi! Vim pelo site da MB Multimarcas Infantil e gostaria de conhecer os produtos.";
  }
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`;
}
