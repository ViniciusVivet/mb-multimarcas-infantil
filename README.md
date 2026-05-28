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

## Painel admin

Acesse `/admin` no site e faca login com a senha configurada em `ADMIN_PASSWORD`.

Para ativar o banco de dados e o painel, siga o `ADMIN_SETUP.md`.

## Variaveis de ambiente

| Variavel | Descricao |
|----------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `SUPABASE_SERVICE_KEY` | Chave service_role do Supabase |
| `ADMIN_PASSWORD` | Senha de acesso ao painel admin |
| `MERCADO_PAGO_ACCESS_TOKEN` | Access Token de producao do Mercado Pago |
| `NEXT_PUBLIC_SITE_URL` | URL publica do site para retornos e webhook |
| `CRON_SECRET` | Segredo usado pela Vercel Cron para verificar o Supabase diariamente |

Sem Supabase configurado, o site funciona com produtos estaticos, mas admin, pedidos e pagamentos nao salvam.

## Pagamentos

O checkout usa Mercado Pago Checkout Pro redirecionado. O site cria o pedido, envia o cliente ao Mercado Pago e recebe a confirmacao pelo webhook.

Antes de ativar em producao:

1. Execute `SUPABASE_PAYMENTS.sql` no SQL Editor do Supabase.
2. Configure `MERCADO_PAGO_ACCESS_TOKEN` na Vercel.
3. Configure `NEXT_PUBLIC_SITE_URL` com o dominio final do site.
4. Faca uma compra teste de baixo valor e confira `/admin/pedidos`.

## Rotina de saude do Supabase

O projeto tem um Vercel Cron diario em `/api/health/supabase` para fazer uma consulta pequena no Supabase e reduzir o risco de pausa por inatividade no plano Free.

Configure `CRON_SECRET` na Vercel. A Vercel Cron envia esse segredo no header `Authorization: Bearer ...`.

## Deploy

O projeto esta pronto para Vercel. Suba o repositorio e importe na Vercel.
