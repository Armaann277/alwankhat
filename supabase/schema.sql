-- Alwankhat · Supabase schema
-- Run this in the Supabase SQL editor, then flip RLS policies on.

create extension if not exists "pgcrypto";

-- Catalogue pieces (seed + studio-added share this table)
create table if not exists public.pieces (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null check (category in ('Paintings', 'Calligraphy')),
  price numeric not null default 0,
  sold boolean not null default false,
  image text not null,
  size text,
  medium text,
  year text,
  story text,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- Orders placed through the store
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  items jsonb not null default '[]',
  total numeric not null default 0,
  status text not null default 'placed' check (status in ('placed', 'fulfilled', 'cancelled')),
  created_at timestamptz not null default now()
);

-- Commissions (from the /commissions form)
create table if not exists public.commissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  kind text,
  brief text not null,
  status text not null default 'new' check (status in ('new', 'in_conversation', 'in_progress', 'delivered')),
  created_at timestamptz not null default now()
);

-- RLS: anyone reading the site may list pieces (sold stays visible, gallery style).
alter table public.pieces enable row level security;
alter table public.orders enable row level security;
alter table public.commissions enable row level security;

create policy "Pieces are publicly visible"
  on public.pieces for select
  using (true);

-- Writes to the studio tables happen through the service_role key only
-- (server-side admin routes). Do NOT expose service_role to the client.
create policy "Only service role writes pieces"
  on public.pieces for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Users see their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Only service role writes commissions"
  on public.commissions for insert
  with check (auth.role() = 'service_role');