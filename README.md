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

## Painel admin (gerenciar produtos)

Acesse `/admin` no site e faça login com a senha configurada em `ADMIN_PASSWORD`.

Para ativar o banco de dados e o painel, siga o `ADMIN_SETUP.md`.

## Variáveis de ambiente

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `SUPABASE_SERVICE_KEY` | Chave service_role do Supabase |
| `ADMIN_PASSWORD` | Senha de acesso ao painel admin |

Sem essas variáveis o site funciona normalmente com os produtos estáticos, mas o painel admin não salva.

## Deploy

O projeto esta pronto para Vercel. Suba o repositorio e importe na Vercel.
