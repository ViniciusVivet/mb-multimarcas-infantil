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
  // Vestidos
  {
    slug: "vestido-floral-festa",
    name: "Vestido Floral Festa",
    category: "Vestidos",
    price: "R$ 79,90",
    sizes: ["2", "4", "6", "8"],
    description: "Vestido delicado com estampa floral, ideal para festas, aniversários e ocasiões especiais. Tecido leve e confortável para a criança se sentir uma princesa.",
    images: [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    slug: "vestido-xadrez-manga-longa",
    name: "Vestido Xadrez Manga Longa",
    category: "Vestidos",
    price: "R$ 69,90",
    sizes: ["2", "4", "6", "8", "10"],
    description: "Vestido clássico xadrez com manga longa, confortável para o dia a dia e passeios em família.",
    images: [
      "https://images.unsplash.com/photo-1520975682031-a2c47d0033e1?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    slug: "vestido-listrado-verao",
    name: "Vestido Listrado Verão",
    category: "Vestidos",
    price: "R$ 64,90",
    sizes: ["1", "2", "4", "6"],
    description: "Vestido fresquinho com listras coloridas, perfeito para os dias quentes. Deixa qualquer saída mais estilosa.",
    images: [
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80",
    ],
  },
  // Conjuntos
  {
    slug: "conjunto-malha-tie-dye",
    name: "Conjunto Malha Tie-Dye",
    category: "Conjuntos",
    price: "R$ 85,90",
    sizes: ["2", "4", "6", "8"],
    description: "Conjunto colorido de malha com estampa tie-dye super moderna. Confortável, estiloso e cheio de personalidade.",
    images: [
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    slug: "conjunto-moletom-estampado",
    name: "Conjunto Moletom Estampado",
    category: "Conjuntos",
    price: "R$ 99,90",
    sizes: ["4", "6", "8", "10", "12"],
    description: "Conjunto de moletom quentinho com estampa divertida. Ideal para o inverno e dias mais frescos.",
    images: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    slug: "conjunto-shorts-blusa",
    name: "Conjunto Shorts + Blusa Estampada",
    category: "Conjuntos",
    price: "R$ 77,90",
    sizes: ["2", "4", "6", "8"],
    description: "Conjunto leve de shorts e blusa com estampa alegre. Combinação perfeita para o verão e passeios no parque.",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80",
    ],
  },
  // Bebê
  {
    slug: "macacao-listrado-bebe",
    name: "Macacão Listrado Bebê",
    category: "Bebê",
    price: "R$ 54,90",
    sizes: ["RN", "P", "M", "G"],
    description: "Macacão macio e fresquinho com listras delicadas. Perfeito para os primeiros meses, com botões fáceis de abrir.",
    images: [
      "https://images.unsplash.com/photo-1546015720-b8b30df5aa27?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    slug: "body-estampado-bebe",
    name: "Body Manga Curta Estampado",
    category: "Bebê",
    price: "R$ 34,90",
    sizes: ["P", "M", "G", "GG"],
    description: "Body básico estampado em tecido 100% algodão, super suave na pele sensível do bebê.",
    images: [
      "https://images.unsplash.com/photo-1546015720-b8b30df5aa27?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    slug: "kit-bebe-sapatinho",
    name: "Kit Bebê com Sapatinho",
    category: "Bebê",
    price: "R$ 89,90",
    sizes: ["RN", "P", "M"],
    description: "Kit completo com body, calça e sapatinho para os primeiros dias do bebê. Presente perfeito para o chá de bebê.",
    images: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1546015720-b8b30df5aa27?auto=format&fit=crop&w=900&q=80",
    ],
  },
  // Meninas
  {
    slug: "salopete-jeans-infantil",
    name: "Salopete Jeans Infantil",
    category: "Meninas",
    price: "R$ 89,90",
    sizes: ["2", "4", "6", "8"],
    description: "Salopete jeans charmosa com aplicações de bordado floral. Versátil para montar looks incríveis.",
    images: [
      "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    slug: "saia-tule-princesa",
    name: "Saia Tule Princesa",
    category: "Meninas",
    price: "R$ 64,90",
    sizes: ["2", "4", "6", "8", "10"],
    description: "Saia volumosa de tule com camadas coloridas. Toda princesinha vai adorar girar com essa saia!",
    images: [
      "https://images.unsplash.com/photo-1520975682031-a2c47d0033e1?auto=format&fit=crop&w=900&q=80",
    ],
  },
  // Meninos
  {
    slug: "bermuda-cargo-infantil",
    name: "Bermuda Cargo Infantil",
    category: "Meninos",
    price: "R$ 55,90",
    sizes: ["2", "4", "6", "8", "10"],
    description: "Bermuda cargo resistente com bolsos laterais. Ideal para aventuras no parque e brincadeiras ao ar livre.",
    images: [
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    slug: "camiseta-dinossauro",
    name: "Camiseta Dinossauro",
    category: "Meninos",
    price: "R$ 39,90",
    sizes: ["2", "4", "6", "8", "10", "12"],
    description: "Camiseta divertida com estampa de dinossauro. Macia, fresquinha e com estampa que os meninos amam!",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    slug: "calca-moletom-infantil",
    name: "Calça Moletom Infantil",
    category: "Meninos",
    price: "R$ 49,90",
    sizes: ["2", "4", "6", "8", "10"],
    description: "Calça de moletom macia e elástica. Confortável para brincar em casa, no parquinho e na escola.",
    images: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    ],
  },
  // Acessórios
  {
    slug: "tiara-laco-cetim",
    name: "Tiara de Laço Cetim",
    category: "Acessórios",
    price: "R$ 22,90",
    sizes: ["Único"],
    description: "Tiara delicada com laço de cetim para completar o look com charme. Disponível em várias cores.",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    slug: "kit-meia-sapatilha",
    name: "Kit Meia Sapatilha 3 pares",
    category: "Acessórios",
    price: "R$ 29,90",
    sizes: ["15-17", "18-20", "21-23"],
    description: "Kit com 3 pares de meias sapatilha com estampas divertidas. Fofinhas e antiderrapantes.",
    images: [
      "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=900&q=80",
    ],
  },
];

export const categoryDescriptions: Record<string, string> = {
  Vestidos: "Modelos delicados para passeio, festa e dia a dia.",
  Conjuntos: "Combinações prontas para vestir com praticidade.",
  "Bebê": "Peças macias para conforto desde os primeiros meses.",
  Meninas: "Looks charmosos para diferentes momentos.",
  Meninos: "Peças confortáveis para brincar e passear.",
  "Acessórios": "Detalhes para finalizar o look infantil.",
};

export const categories = Array.from(new Set(products.map((product) => product.category)));
