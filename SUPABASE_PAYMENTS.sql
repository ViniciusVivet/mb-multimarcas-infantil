create table if not exists pedidos (
  id uuid primary key default gen_random_uuid(),
  product_slug text not null,
  product_name text not null,
  size text not null,
  color text,
  quantity integer not null default 1 check (quantity > 0 and quantity <= 10),
  unit_price numeric(10,2) not null check (unit_price > 0),
  total_price numeric(10,2) not null check (total_price > 0),
  status text not null default 'pending' check (
    status in ('pending', 'approved', 'rejected', 'cancelled', 'refunded')
  ),
  mercado_pago_preference_id text,
  mercado_pago_payment_id text,
  payer_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create index if not exists pedidos_created_at_idx on pedidos (created_at desc);
create index if not exists pedidos_status_idx on pedidos (status);
create index if not exists pedidos_mp_payment_idx on pedidos (mercado_pago_payment_id);

alter table pedidos enable row level security;

-- Pedidos sao lidos e atualizados apenas pelo servidor com SUPABASE_SERVICE_KEY.
-- Nao crie policies publicas de select/insert/update/delete para esta tabela.
