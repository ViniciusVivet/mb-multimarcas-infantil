export type Product = {
  slug: string;
  name: string;
  category: string;
  price: string;
  sizes: string[];
  colors?: string[];
  description: string;
  images: string[];
  videos?: string[];
};

const IMG = {
  A: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80",
  B: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=900&q=80",
  C: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80",
  D: "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80",
  E: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80",
  F: "https://images.unsplash.com/photo-1546015720-b8b30df5aa27?auto=format&fit=crop&w=900&q=80",
  G: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
  H: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
};

export const products: Product[] = [
  {
    slug: "vestido-floral-festa",
    name: "Vestido Floral Festa",
    category: "Vestidos",
    price: "R$ 79,90",
    sizes: ["2", "4", "6", "8"],
    colors: ["Rosa", "Branco"],
    description: "Vestido delicado com estampa floral, ideal para festas, aniversários e ocasiões especiais. Tecido leve e confortável.",
    images: [IMG.A],
  },
  {
    slug: "conjunto-tie-dye",
    name: "Conjunto Tie-Dye",
    category: "Conjuntos",
    price: "R$ 85,90",
    sizes: ["2", "4", "6", "8"],
    colors: ["Colorido"],
    description: "Conjunto colorido de malha com estampa tie-dye moderna. Confortável, estiloso e cheio de personalidade.",
    images: [IMG.B],
  },
  {
    slug: "macacao-listrado-bebe",
    name: "Macacão Listrado Bebê",
    category: "Bebê",
    price: "R$ 54,90",
    sizes: ["RN", "P", "M", "G"],
    colors: ["Azul", "Cinza"],
    description: "Macacão macio com listras delicadas, perfeito para os primeiros meses. Botões fáceis de abrir.",
    images: [IMG.C],
  },
  {
    slug: "conjunto-moletom-estampado",
    name: "Conjunto Moletom Estampado",
    category: "Conjuntos",
    price: "R$ 99,90",
    sizes: ["4", "6", "8", "10", "12"],
    colors: ["Preto", "Cinza"],
    description: "Conjunto de moletom quentinho com estampa divertida. Ideal para o inverno e dias mais frescos.",
    images: [IMG.D],
  },
  {
    slug: "salopete-jeans-infantil",
    name: "Salopete Jeans Infantil",
    category: "Meninas",
    price: "R$ 89,90",
    sizes: ["2", "4", "6", "8"],
    colors: ["Jeans claro"],
    description: "Salopete jeans charmosa com bordado floral. Versátil para montar looks incríveis no dia a dia.",
    images: [IMG.E],
  },
  {
    slug: "saia-tule-princesa",
    name: "Saia Tule Princesa",
    category: "Meninas",
    price: "R$ 64,90",
    sizes: ["2", "4", "6", "8", "10"],
    colors: ["Rosa", "Lilás"],
    description: "Saia volumosa de tule com camadas coloridas. Toda princesinha vai adorar girar com essa saia!",
    images: [IMG.F],
  },
  {
    slug: "bermuda-cargo-infantil",
    name: "Bermuda Cargo Infantil",
    category: "Meninos",
    price: "R$ 55,90",
    sizes: ["2", "4", "6", "8", "10"],
    colors: ["Verde", "Caqui"],
    description: "Bermuda cargo resistente com bolsos laterais. Ideal para aventuras no parque e brincadeiras ao ar livre.",
    images: [IMG.G],
  },
  {
    slug: "tiara-laco-cetim",
    name: "Tiara de Laço Cetim",
    category: "Acessórios",
    price: "R$ 22,90",
    sizes: ["Único"],
    colors: ["Rosa", "Branco", "Vermelho"],
    description: "Tiara delicada com laço de cetim para completar o look com charme. Disponível em várias cores.",
    images: [IMG.H],
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
