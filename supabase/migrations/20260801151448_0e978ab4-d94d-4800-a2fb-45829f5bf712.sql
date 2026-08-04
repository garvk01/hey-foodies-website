-- roles
create type public.app_role as enum ('admin','staff');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.update_updated_at_column()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

-- site settings (single row)
create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Hey Foodies',
  tagline text not null default '',
  phone text not null default '',
  whatsapp text not null default '',
  email text not null default '',
  address_lines text[] not null default '{}',
  maps_href text not null default '',
  instagram text not null default '',
  updated_at timestamptz not null default now()
);
grant select on public.site_settings to anon, authenticated;
grant insert, update, delete on public.site_settings to authenticated;
grant all on public.site_settings to service_role;
alter table public.site_settings enable row level security;
create policy "public read settings" on public.site_settings for select to anon, authenticated using (true);
create policy "admins manage settings" on public.site_settings for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger site_settings_updated before update on public.site_settings for each row execute function public.update_updated_at_column();

-- opening hours
create table public.opening_hours (
  id uuid primary key default gen_random_uuid(),
  day_index int not null unique check (day_index between 0 and 6),
  day text not null,
  time text not null default '',
  closed boolean not null default false,
  updated_at timestamptz not null default now()
);
grant select on public.opening_hours to anon, authenticated;
grant insert, update, delete on public.opening_hours to authenticated;
grant all on public.opening_hours to service_role;
alter table public.opening_hours enable row level security;
create policy "public read hours" on public.opening_hours for select to anon, authenticated using (true);
create policy "admins manage hours" on public.opening_hours for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- menu
create table public.menu_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  blurb text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.menu_categories to anon, authenticated;
grant insert, update, delete on public.menu_categories to authenticated;
grant all on public.menu_categories to service_role;
alter table public.menu_categories enable row level security;
create policy "public read categories" on public.menu_categories for select to anon, authenticated using (true);
create policy "admins manage categories" on public.menu_categories for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.menu_categories(id) on delete cascade,
  name text not null,
  description text not null default '',
  price text not null default '',
  featured boolean not null default false,
  available boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.menu_items to anon, authenticated;
grant insert, update, delete on public.menu_items to authenticated;
grant all on public.menu_items to service_role;
alter table public.menu_items enable row level security;
create policy "public read items" on public.menu_items for select to anon, authenticated using (true);
create policy "admins manage items" on public.menu_items for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- offers
create table public.offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  detail text not null default '',
  note text not null default '',
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.offers to anon, authenticated;
grant insert, update, delete on public.offers to authenticated;
grant all on public.offers to service_role;
alter table public.offers enable row level security;
create policy "public read active offers" on public.offers for select to anon using (active = true);
create policy "authenticated read offers" on public.offers for select to authenticated using (true);
create policy "admins manage offers" on public.offers for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- reservations
create table public.reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  date date not null,
  time text not null,
  guests int not null default 2 check (guests between 1 and 60),
  notes text not null default '',
  status text not null default 'pending' check (status in ('pending','confirmed','declined','done')),
  created_at timestamptz not null default now()
);
grant insert on public.reservations to anon, authenticated;
grant select, update, delete on public.reservations to authenticated;
grant all on public.reservations to service_role;
alter table public.reservations enable row level security;
create policy "anyone can request a table" on public.reservations for insert to anon, authenticated with check (true);
create policy "admins read reservations" on public.reservations for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admins update reservations" on public.reservations for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "admins delete reservations" on public.reservations for delete to authenticated using (public.has_role(auth.uid(),'admin'));

-- contact messages
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null default '',
  phone text not null default '',
  message text not null,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);
grant insert on public.contact_messages to anon, authenticated;
grant select, update, delete on public.contact_messages to authenticated;
grant all on public.contact_messages to service_role;
alter table public.contact_messages enable row level security;
create policy "anyone can send a message" on public.contact_messages for insert to anon, authenticated with check (true);
create policy "admins read messages" on public.contact_messages for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admins update messages" on public.contact_messages for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "admins delete messages" on public.contact_messages for delete to authenticated using (public.has_role(auth.uid(),'admin'));

-- seed
insert into public.site_settings (name, tagline, phone, whatsapp, email, address_lines, maps_href, instagram)
values ('Hey Foodies','Big flavour, made for foodies.','+00 00000 00000','+00 00000 00000','hello@heyfoodies.example',
  array['Address line 1','Address line 2','City, PIN'],'https://maps.google.com/?q=Hey+Foodies','https://instagram.com/');

insert into public.opening_hours (day_index, day, time) values
 (0,'Monday','11:00 – 23:00'),(1,'Tuesday','11:00 – 23:00'),(2,'Wednesday','11:00 – 23:00'),
 (3,'Thursday','11:00 – 23:00'),(4,'Friday','11:00 – 23:30'),(5,'Saturday','11:00 – 23:30'),(6,'Sunday','11:00 – 23:00');

insert into public.menu_categories (slug, name, blurb, sort_order) values
 ('pizza','Pizza','Hand-stretched bases, blistered edges, generous cheese.',1),
 ('burgers','Burgers','Toasted buns, thick patties, sauces made in-house.',2),
 ('wraps','Wraps & Rolls','Rolled hot, packed tight, built for one hand.',3),
 ('sides','Sides','The part everyone fights over.',4),
 ('drinks','Shakes & Drinks','Cold, thick, and worth the brain freeze.',5);

insert into public.menu_items (category_id, name, description, price, featured, sort_order)
select c.id, v.name, v.description, v.price, v.featured, v.sort_order from (values
 ('pizza','Classic Margherita','Tomato, mozzarella, basil.','000',true,1),
 ('pizza','Peppy Paneer','Paneer, capsicum, red paprika.','000',false,2),
 ('pizza','Loaded Veggie','Corn, onion, olives, jalapeño.','000',false,3),
 ('pizza','Chicken Tikka Pizza','Spiced chicken, onion, coriander.','000',false,4),
 ('pizza','Cheese Burst Special','Double cheese, house herbs.','000',false,5),
 ('burgers','Hey Foodies Double','Two patties, cheddar, house sauce.','000',true,1),
 ('burgers','Crispy Chicken Burger','Fried chicken, slaw, mayo.','000',false,2),
 ('burgers','Aloo Tikki Burger','Spiced potato patty, chutney.','000',false,3),
 ('burgers','Paneer Zinger','Crumb-fried paneer, lettuce.','000',false,4),
 ('wraps','Chicken Shawarma Roll','Garlic sauce, pickles.','000',true,1),
 ('wraps','Paneer Kathi Roll','Tandoori paneer, onion.','000',false,2),
 ('wraps','Veg Frankie','Masala potato, chutney.','000',false,3),
 ('sides','Loaded Cheese Fries','Fries, cheese sauce, herbs.','000',true,1),
 ('sides','Peri Peri Fries','Tossed in peri peri.','000',false,2),
 ('sides','Garlic Bread','Butter, garlic, cheese.','000',false,3),
 ('sides','Crispy Nuggets','Served with dip.','000',false,4),
 ('drinks','Chocolate Thick Shake','Cocoa, cream, ice cream.','000',true,1),
 ('drinks','Oreo Shake','Cookies and cream.','000',false,2),
 ('drinks','Cold Coffee','Brewed, chilled, frothy.','000',false,3),
 ('drinks','Fresh Lime Soda','Sweet or salted.','000',false,4)
) as v(slug,name,description,price,featured,sort_order)
join public.menu_categories c on c.slug = v.slug;

insert into public.offers (title, detail, note, sort_order) values
 ('Combo Hour','Burger + fries + drink, one price.','Offer details to be confirmed',1),
 ('Pizza Party Pack','Two large pizzas for group orders.','Offer details to be confirmed',2);