export type Product = {
  slug: string;
  name: string;
  category: string;
  price: string;
  sizes: string[];
  description: string;
  images: string[];
};

export const products: Product[] = [
  {
    slug: "vestido-floral-rodado",
    name: "Vestido floral rodado",
    category: "Vestidos",
    price: "Consultar",
    sizes: ["2", "4", "6", "8"],
    description: "Vestido infantil delicado para passeios, festas e momentos especiais.",
    images: [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    slug: "conjunto-menina-verao",
    name: "Conjunto menina verao",
    category: "Conjuntos",
    price: "Consultar",
    sizes: ["1", "2", "3", "4"],
    description: "Conjunto leve para dias quentes, com caimento confortavel e visual alegre.",
    images: [
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    slug: "look-bebe-conforto",
    name: "Look bebe conforto",
    category: "Bebe",
    price: "Consultar",
    sizes: ["P", "M", "G"],
    description: "Peca macia para bebe, pensada para praticidade e conforto no uso diario.",
    images: [
      "https://images.unsplash.com/photo-1546015720-b8b30df5aa27?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    slug: "conjunto-menino-casual",
    name: "Conjunto menino casual",
    category: "Meninos",
    price: "Consultar",
    sizes: ["2", "4", "6", "8", "10"],
    description: "Look casual para brincar, passear e aproveitar o dia com liberdade.",
    images: [
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    slug: "jardineira-infantil",
    name: "Jardineira infantil",
    category: "Meninas",
    price: "Consultar",
    sizes: ["1", "2", "4", "6"],
    description: "Jardineira versatil para montar combinacoes charmosas com blusinhas e acessorios.",
    images: [
      "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    slug: "laco-infantil-delicado",
    name: "Laco infantil delicado",
    category: "Acessorios",
    price: "Consultar",
    sizes: ["Unico"],
    description: "Acessorio delicado para completar o look com um toque especial.",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1546015720-b8b30df5aa27?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    slug: "macacao-bebe",
    name: "Macacao bebe",
    category: "Bebe",
    price: "Consultar",
    sizes: ["RN", "P", "M", "G"],
    description: "Macacao pratico para a rotina do bebe, com tecido agradavel ao toque.",
    images: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1546015720-b8b30df5aa27?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    slug: "vestido-festa-infantil",
    name: "Vestido festa infantil",
    category: "Vestidos",
    price: "Consultar",
    sizes: ["4", "6", "8", "10"],
    description: "Vestido especial para aniversario, ensaio, igreja e outras ocasioes.",
    images: [
      "https://images.unsplash.com/photo-1520975682031-a2c47d0033e1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=900&q=80",
    ],
  },
];

export const categoryDescriptions: Record<string, string> = {
  Vestidos: "Modelos delicados para passeio, festa e dia a dia.",
  Conjuntos: "Combinacoes prontas para vestir com praticidade.",
  Bebe: "Pecas macias para conforto desde os primeiros meses.",
  Meninas: "Looks charmosos para diferentes momentos.",
  Meninos: "Pecas confortaveis para brincar e passear.",
  Acessorios: "Detalhes para finalizar o look infantil.",
};

export const categories = Array.from(new Set(products.map((product) => product.category)));
