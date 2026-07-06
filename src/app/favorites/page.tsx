'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { ListingGrid } from '@/components/ListingGrid';
import { SkeletonGrid } from '@/components/SkeletonCard';
import { useFavorites } from '@/components/FavoritesProvider';
import { fetchListingsByIds } from '@/lib/listings';
import type { Listing } from '@/lib/types';

export default function FavoritesPage() {
  const { ids, ready } = useFavorites();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;
    setLoading(true);
    fetchListingsByIds(Array.from(ids))
      .then(setListings)
      .catch((err) => {
        console.error('Failed to load favorites', err);
        setListings([]);
      })
      .finally(() => setLoading(false));
  }, [ready, ids]);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Saved</h1>
          <p className="mt-1 text-sm text-gray-600">
            {ids.size === 0 ? 'You haven’t saved anything yet.' : `${ids.size} saved.`}
          </p>
        </div>

        {loading && ids.size > 0 ? (
          <SkeletonGrid count={Math.min(ids.size, 6)} />
        ) : listings.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
            <div className="text-4xl">♡</div>
            <p className="mt-2 text-gray-700">Nothing saved yet. Tap the heart on a listing to save it.</p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
            >
              Browse providers
            </Link>
          </div>
        ) : (
          <ListingGrid listings={listings} />
        )}
      </main>
    </div>
  );
}
