-- Wayfind schema
create extension if not exists "pgcrypto";

create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null,
  description text not null,
  price_range int not null check (price_range between 1 and 4),
  rating numeric(2,1) not null check (rating between 0 and 5),
  review_count int not null default 0,
  city text not null,
  address text,
  latitude double precision not null,
  longitude double precision not null,
  tags text[] not null default '{}',
  images text[] not null default '{}',
  phone text,
  website text,
  created_at timestamptz not null default now()
);

create index if not exists listings_category_idx on listings (category);
create index if not exists listings_city_idx on listings (city);
create index if not exists listings_rating_idx on listings (rating desc);

create table if not exists favorites (
  session_id text not null,
  listing_id uuid not null references listings(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (session_id, listing_id)
);

create index if not exists favorites_session_idx on favorites (session_id);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references listings(id) on delete cascade,
  author text not null,
  rating int not null check (rating between 1 and 5),
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists reviews_listing_idx on reviews (listing_id, created_at desc);
