# Wayfind

A directory for finding local service providers — search, filter by category / price / rating / distance, view results on a map, and save favorites without signing in.

> **Live demo:** _add your Vercel URL here_
> **Admin demo:** _`/admin/login` — token in the README below_

## What's in it

- **Browse page** — grid + map view (Leaflet + OpenStreetMap tiles), sort dropdown, and a filter sidebar that slides into a drawer on mobile. Every filter and sort is reflected in the URL so results are shareable.
- **Listing detail** — image gallery, reviews, sticky contact card with a real inquiry form that writes to Supabase. Each page has a `LocalBusiness` JSON-LD block plus Open Graph / Twitter meta tags for SEO.
- **Favorites** — saved against an anonymous browser-generated session ID, mirrored to Supabase when configured so they survive a device switch.
- **`/admin`** — token-gated area for creating, editing, and deleting listings. Writes go through the Supabase service role key so RLS on the public tables stays strict.

## Stack

- Next.js 14 App Router + TypeScript, deployed on Vercel
- Tailwind CSS
- Supabase (Postgres + REST) — client uses the anon key; admin routes use the service role key server-side
- Leaflet + react-leaflet for the map
- No external state library; server components + `useSearchParams` for URL state

## Running locally

```bash
npm install
cp .env.example .env.local   # optional; the app runs against a JSON fallback if left empty
npm run dev
```

Open http://localhost:3000. Without env vars, the app reads from `data/listings.json` and stores favorites/inquiries in `localStorage` so you can develop offline.

## Deploying to Vercel

1. **Push this repo to GitHub.**
2. **Create a Supabase project** at [supabase.com](https://supabase.com) (free tier works).
   - Open the SQL Editor and run `supabase/schema.sql`
   - Then run `supabase/seed.sql`
   - **Project Settings → API** — copy the Project URL, `anon` key, and `service_role` key.
3. **Import the repo into Vercel.** It auto-detects Next.js — no configuration needed.
4. **Add environment variables in Vercel → Settings → Environment Variables:**

   | Name | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SUPABASE_URL` | your project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public key |
   | `SUPABASE_SERVICE_ROLE_KEY` | service_role key (server-only; never expose to the browser) |
   | `ADMIN_TOKEN` | any random string — this is the admin login password |
   | `NEXT_PUBLIC_SITE_URL` | your deployed URL, e.g. `https://wayfind.example.com` (used for OG metadata) |

5. **Deploy.** Vercel builds, runs the middleware, and serves the app.

## Row-level security

The schema turns RLS on for every table and adds explicit policies:

- `listings` and `reviews` — public read
- `favorites` — public read/write (the client generates a random session ID; there's no PII)
- `inquiries` — public insert only (nobody can read them from the browser)

Writes from the admin panel use the **service role key** and bypass RLS, which is fine because they only run server-side behind the token cookie.

## Tradeoffs

- **Map tiles** come from OpenStreetMap's public tile server. That's fine for a demo but has a fair-use policy. For real traffic swap to Mapbox, Stadia, or Protomaps.
- **Cover images** are pulled from `loremflickr.com` with category keywords, so the pictures look thematic without any manual curation. For real listings, upload to Supabase Storage and replace the URLs.
- **Auth is intentionally minimal.** The admin panel uses a shared token; favorites use an anonymous session ID. Add Supabase Auth (magic link or OAuth) when you need per-user identity.
- **No pagination.** 50 seed rows fits on one page. If your dataset is larger, add cursor pagination in `fetchListings`.

## Scripts

```bash
npm run dev      # local dev server
npm run build    # production build
npm run start    # run the built app
```
