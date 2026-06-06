# Wayfind

A directory for finding local service providers — search, filter, and save the ones you like.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (Postgres) — with a JSON fallback for local dev
- Leaflet for map view

## Getting started

```bash
npm install
cp .env.example .env.local   # optional; leave blank to use local seed
npm run dev
```

Open http://localhost:3000.

## Supabase

Run `supabase/schema.sql` and `supabase/seed.sql` against your project. If
`NEXT_PUBLIC_SUPABASE_URL` is not set the app reads from `data/listings.json`
so you can develop without an account.
