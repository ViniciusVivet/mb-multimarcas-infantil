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
| `CRON_SECRET` | Segredo usado pela Vercel Cron para verificar o Supabase diariamente |

Sem Supabase configurado, o site funciona com produtos estaticos, mas o painel admin nao salva alteracoes.

## Atendimento e pedidos

O site nao processa pagamentos. Depois de escolher produto, tamanho, cor e quantidade, o cliente e direcionado ao WhatsApp com uma mensagem preenchida para confirmar disponibilidade, entrega e pagamento com a loja.

## Rotina de saude do Supabase

O projeto tem um Vercel Cron diario em `/api/health/supabase` para fazer uma consulta pequena no Supabase e reduzir o risco de pausa por inatividade no plano Free.

Configure `CRON_SECRET` na Vercel. A Vercel Cron envia esse segredo no header `Authorization: Bearer ...`.

## Deploy

O projeto esta pronto para Vercel. Suba o repositorio e importe na Vercel.
