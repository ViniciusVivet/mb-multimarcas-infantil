# Painel Admin — Como Configurar

## O que o painel faz

- Acesse `/admin` para fazer login
- Adicione, edite e exclua produtos diretamente pelo navegador
- Produtos salvos aparecem no site em até 60 segundos

---

## 1. Criar conta no Supabase (gratuito)

1. Acesse [supabase.com](https://supabase.com) e clique em **Start for free**
2. Crie um projeto (escolha a região **South America (São Paulo)**)
3. Aguarde o projeto inicializar (~2 minutos)

---

## 2. Criar a tabela e o storage de produtos

No Supabase, vá em **SQL Editor** e execute tudo de uma vez:

```sql
-- Tabela de produtos
create table produtos (
  slug        text primary key,
  name        text not null,
  category    text not null,
  price       text not null,
  description text not null,
  sizes       text[] not null default '{}',
  colors      text[] not null default '{}',
  images      text[] not null default '{}',
  videos      text[] not null default '{}',
  position    integer,
  created_at  timestamptz not null default now()
);

-- Se a tabela já existe, adicione as colunas novas:
-- alter table produtos add column if not exists colors text[] not null default '{}';
-- alter table produtos add column if not exists position integer;

alter table produtos enable row level security;
create policy "Leitura pública de produtos" on produtos
  for select
  using (true);

-- Ordem das categorias no catálogo
create table categorias (
  name       text primary key,
  position   integer not null default 0,
  created_at timestamptz not null default now()
);

alter table categorias enable row level security;
create policy "Leitura pública de categorias" on categorias
  for select
  using (true);

-- Bucket de fotos (upload direto do painel admin)
insert into storage.buckets (id, name, public)
  values ('produtos', 'produtos', true)
  on conflict (id) do nothing;

create policy "Leitura pública das fotos" on storage.objects
  for select using (bucket_id = 'produtos');
```

As escritas do painel usam `SUPABASE_SERVICE_KEY` pelo servidor. Não crie policies públicas de `insert`, `update` ou `delete` para `produtos`, `categorias` ou `storage.objects`.

---

## 3. Pegar as chaves da API

No Supabase, vá em **Settings → API**:

- **Project URL** → copie o valor de `URL`
- **Service role key** (secret) → copie (em `Project API keys`)

---

## 4. Configurar variáveis de ambiente na Vercel

No painel da Vercel, vá em **Settings → Environment Variables** e adicione:

| Nome | Valor |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto (ex: `https://xyzabc.supabase.co`) |
| `SUPABASE_SERVICE_KEY` | Service role key (começa com `eyJ...`) |
| `ADMIN_PASSWORD` | Senha forte de acesso ao painel, com pelo menos 12 caracteres |

Depois clique em **Redeploy** para aplicar.

---

## 5. Acessar o painel

Após o redeploy, acesse:

```
https://seu-site.vercel.app/admin
```

Digite a senha configurada em `ADMIN_PASSWORD` e pronto!

---

## Desenvolvimento local

Crie um arquivo `.env.local` na raiz do projeto:

```
NEXT_PUBLIC_SUPABASE_URL=https://xyzabc.supabase.co
SUPABASE_SERVICE_KEY=eyJ...
ADMIN_PASSWORD=troque-por-uma-senha-forte-com-12-caracteres-ou-mais
```

> **Nunca** suba o `.env.local` para o Git (já está no `.gitignore`).

---

## Observações

- Se o Supabase não estiver configurado, o site continua funcionando com os produtos estáticos de `data/products.ts`
- O painel requer JavaScript habilitado no navegador
- A senha do admin fica apenas no servidor (nunca exposta ao cliente)
- Não use senhas simples como nome da loja, telefone, `admin123` ou datas
