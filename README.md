# MB Multimarcas Infantil

Site catalogo em Next.js, TypeScript e Tailwind CSS para a MB Multimarcas Infantil.

## Rodar localmente

```bash
npm install
npm run dev
```

Depois acesse `http://localhost:3000`.

## Editar WhatsApp e Instagram

Arquivo:

```txt
data/store.ts
```

Troque o WhatsApp usando `55 + DDD + numero`, apenas numeros:

```ts
whatsapp: "5500000000000",
```

## Editar produtos

Arquivo:

```txt
data/products.ts
```

Modelo:

```ts
{
  slug: "nome-unico-do-produto",
  name: "Nome do produto",
  category: "Vestidos",
  price: "R$ 89,90",
  sizes: ["2", "4", "6"],
  description: "Descricao curta do produto.",
  images: ["url-da-foto-1", "url-da-foto-2"],
}
```

## Deploy

O projeto esta pronto para Vercel. Suba o repositorio e importe na Vercel.
