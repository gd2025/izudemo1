
-- Products
create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  price_cents integer not null check (price_cents >= 0),
  image_url text,
  category text,
  created_at timestamptz not null default now()
);
alter table public.products enable row level security;
create policy "products are public" on public.products for select using (true);

-- Cart items (per user)
create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  quantity integer not null default 1 check (quantity > 0),
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);
alter table public.cart_items enable row level security;
create policy "users read own cart" on public.cart_items for select using (auth.uid() = user_id);
create policy "users insert own cart" on public.cart_items for insert with check (auth.uid() = user_id);
create policy "users update own cart" on public.cart_items for update using (auth.uid() = user_id);
create policy "users delete own cart" on public.cart_items for delete using (auth.uid() = user_id);

-- Orders (basic placeholder)
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  total_cents integer not null,
  status text not null default 'pending',
  items jsonb not null,
  created_at timestamptz not null default now()
);
alter table public.orders enable row level security;
create policy "users read own orders" on public.orders for select using (auth.uid() = user_id);
create policy "users insert own orders" on public.orders for insert with check (auth.uid() = user_id);

-- Seed placeholder products
insert into public.products (slug, name, description, price_cents, image_url, category) values
('paros-linen-dress', 'Paros Linen Dress', 'Hand-finished linen dress, born in Paros.', 18500, 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=900', 'Dresses'),
('aegean-kimono', 'Aegean Kimono', 'Lightweight kimono inspired by Aegean light.', 22000, 'https://images.unsplash.com/photo-1485518882345-15568b007407?w=900', 'Kimonos'),
('cyclades-wrap-dress', 'Cyclades Wrap Dress', 'A flowing wrap dress for warm evenings.', 19500, 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900', 'Dresses'),
('mykonos-silk-kimono', 'Mykonos Silk Kimono', 'Silk kimono with hand-printed motifs.', 28000, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=900', 'Kimonos'),
('santorini-scarf', 'Santorini Scarf', 'Featherlight scarf in muted ocean tones.', 7800, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=900', 'Accessories'),
('paros-tote', 'Paros Tote', 'Everyday tote in natural canvas.', 9500, 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=900', 'Accessories');
