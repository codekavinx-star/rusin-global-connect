
-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users view own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);
create policy "Admins view all roles" on public.user_roles for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins manage roles" on public.user_roles for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Destinations
create table public.destinations (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  price numeric not null default 0,
  duration text not null,
  image_url text not null,
  location text not null,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.destinations enable row level security;
create policy "Anyone can view destinations" on public.destinations for select using (true);
create policy "Admins manage destinations" on public.destinations for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Applications
create table public.applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  program text not null,
  country text,
  message text,
  created_at timestamptz not null default now()
);
alter table public.applications enable row level security;
create policy "Anyone can submit application" on public.applications for insert with check (true);
create policy "Admins view applications" on public.applications for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins manage applications" on public.applications for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Gallery
create table public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  title text not null default 'Untitled',
  image_url text not null,
  storage_path text not null,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
alter table public.gallery_images enable row level security;
create policy "Anyone can view gallery" on public.gallery_images for select using (true);
create policy "Admins manage gallery" on public.gallery_images for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Storage bucket
insert into storage.buckets (id, name, public) values ('gallery', 'gallery', true) on conflict do nothing;

create policy "Public read gallery" on storage.objects for select using (bucket_id = 'gallery');
create policy "Admins upload gallery" on storage.objects for insert to authenticated with check (bucket_id = 'gallery' and public.has_role(auth.uid(), 'admin'));
create policy "Admins update gallery" on storage.objects for update to authenticated using (bucket_id = 'gallery' and public.has_role(auth.uid(), 'admin'));
create policy "Admins delete gallery" on storage.objects for delete to authenticated using (bucket_id = 'gallery' and public.has_role(auth.uid(), 'admin'));

-- Seed destinations
insert into public.destinations (title, description, price, duration, image_url, location, featured) values
('Imperial Moscow', 'Walk through Red Square, the Kremlin, and the soul of imperial Russia.', 1290, '5 Days', '/src/assets/dest-moscow.jpg', 'Moscow', true),
('Saint Petersburg Royale', 'Baroque palaces, Hermitage masterpieces, and Neva river cruises.', 1490, '6 Days', '/src/assets/dest-petersburg.jpg', 'Saint Petersburg', true),
('Lake Baikal Expedition', 'The deepest lake on Earth — frozen turquoise, ice caves, and silence.', 2190, '7 Days', '/src/assets/dest-baikal.jpg', 'Siberia', true),
('Kazan Heritage', 'East meets west in Tatarstan''s capital — Kremlin walls and Kul Sharif.', 990, '4 Days', '/src/assets/dest-kazan.jpg', 'Kazan', true),
('Sochi Riviera', 'Black Sea shores, Caucasus peaks, and palm-lined boulevards.', 1190, '5 Days', '/src/assets/dest-sochi.jpg', 'Sochi', false),
('Kamchatka Wild', 'Active volcanoes, geysers, and untouched Pacific wilderness.', 2890, '9 Days', '/src/assets/dest-kamchatka.jpg', 'Kamchatka', false);
