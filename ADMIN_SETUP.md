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

## 2. Criar a tabela de produtos

No Supabase, vá em **SQL Editor** e execute:

```sql
create table produtos (
  slug        text primary key,
  name        text not null,
  category    text not null,
  price       text not null,
  description text not null,
  sizes       text[] not null default '{}',
  images      text[] not null default '{}',
  created_at  timestamptz not null default now()
);

-- Permite leitura pública (sem autenticação) para o site
alter table produtos enable row level security;
create policy "Leitura pública" on produtos for select using (true);
create policy "Escrita service key" on produtos for all using (true);
```

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
| `ADMIN_PASSWORD` | Senha de acesso ao painel (ex: `minhasenha123`) |

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
ADMIN_PASSWORD=admin123
```

> **Nunca** suba o `.env.local` para o Git (já está no `.gitignore`).

---

## Observações

- Se o Supabase não estiver configurado, o site continua funcionando com os produtos estáticos de `data/products.ts`
- O painel requer JavaScript habilitado no navegador
- A senha do admin fica apenas no servidor (nunca exposta ao cliente)
