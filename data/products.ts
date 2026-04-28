export type Product = {
  slug: string;
  name: string;
  category: string;
  price: string;
  sizes: string[];
  description: string;
  images: string[];
  videos?: string[];
};

// 10 produtos com imagens únicas (sem repetição no grid)
const IMG = {
  A: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80",
  B: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=900&q=80",
  C: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80",
  D: "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80",
  E: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
  F: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80",
  G: "https://images.unsplash.com/photo-1546015720-b8b30df5aa27?auto=format&fit=crop&w=900&q=80",
  H: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
  I: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=900&q=80",
  J: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
};

export const products: Product[] = [
  {
    slug: "vestido-floral-festa",
    name: "Vestido Floral Festa",
    category: "Vestidos",
    price: "R$ 79,90",
    sizes: ["2", "4", "6", "8"],
    description: "Vestido delicado com estampa floral, ideal para festas, aniversários e ocasiões especiais. Tecido leve e confortável.",
    images: [IMG.A, IMG.B],
  },
  {
    slug: "vestido-listrado-verao",
    name: "Vestido Listrado Verão",
    category: "Vestidos",
    price: "R$ 64,90",
    sizes: ["1", "2", "4", "6"],
    description: "Vestido fresquinho com listras coloridas, perfeito para os dias quentes. Deixa qualquer saída mais estilosa.",
    images: [IMG.F],
  },
  {
    slug: "conjunto-malha-tie-dye",
    name: "Conjunto Malha Tie-Dye",
    category: "Conjuntos",
    price: "R$ 85,90",
    sizes: ["2", "4", "6", "8"],
    description: "Conjunto colorido de malha com estampa tie-dye super moderna. Confortável, estiloso e cheio de personalidade.",
    images: [IMG.D, IMG.C],
  },
  {
    slug: "conjunto-moletom-estampado",
    name: "Conjunto Moletom Estampado",
    category: "Conjuntos",
    price: "R$ 99,90",
    sizes: ["4", "6", "8", "10", "12"],
    description: "Conjunto de moletom quentinho com estampa divertida. Ideal para o inverno e dias mais frescos.",
    images: [IMG.E],
  },
  {
    slug: "macacao-listrado-bebe",
    name: "Macacão Listrado Bebê",
    category: "Bebê",
    price: "R$ 54,90",
    sizes: ["RN", "P", "M", "G"],
    description: "Macacão macio e fresquinho com listras delicadas. Perfeito para os primeiros meses, com botões fáceis de abrir.",
    images: [IMG.G, IMG.E],
  },
  {
    slug: "kit-bebe-sapatinho",
    name: "Kit Bebê com Sapatinho",
    category: "Bebê",
    price: "R$ 89,90",
    sizes: ["RN", "P", "M"],
    description: "Kit completo com body, calça e sapatinho para os primeiros dias do bebê. Presente perfeito para o chá de bebê.",
    images: [IMG.I, IMG.G],
  },
  {
    slug: "salopete-jeans-infantil",
    name: "Salopete Jeans Infantil",
    category: "Meninas",
    price: "R$ 89,90",
    sizes: ["2", "4", "6", "8"],
    description: "Salopete jeans charmosa com bordado floral. Versátil para montar looks incríveis no dia a dia.",
    images: [IMG.B, IMG.A],
  },
  {
    slug: "saia-tule-princesa",
    name: "Saia Tule Princesa",
    category: "Meninas",
    price: "R$ 64,90",
    sizes: ["2", "4", "6", "8", "10"],
    description: "Saia volumosa de tule com camadas coloridas. Toda princesinha vai adorar girar com essa saia!",
    images: [IMG.J],
  },
  {
    slug: "bermuda-cargo-infantil",
    name: "Bermuda Cargo Infantil",
    category: "Meninos",
    price: "R$ 55,90",
    sizes: ["2", "4", "6", "8", "10"],
    description: "Bermuda cargo resistente com bolsos laterais. Ideal para aventuras no parque e brincadeiras ao ar livre.",
    images: [IMG.C, IMG.D],
  },
  {
    slug: "tiara-laco-cetim",
    name: "Tiara de Laço Cetim",
    category: "Acessórios",
    price: "R$ 22,90",
    sizes: ["Único"],
    description: "Tiara delicada com laço de cetim para completar o look com charme. Disponível em várias cores.",
    images: [IMG.H, IMG.F],
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

export const categories = Array.from(new Set(products.map((p) => p.category)));
