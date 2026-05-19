alter table produtos
  add column if not exists colors text[] not null default '{}';
