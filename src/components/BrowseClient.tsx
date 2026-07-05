'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import type { Listing } from '@/lib/types';
import {
  DEFAULT_FILTERS,
  applyFilters,
  filtersFromSearchParams,
  filtersToSearchParams,
} from '@/lib/filter';
import { FilterSidebar } from './FilterSidebar';
import { ListingGrid } from './ListingGrid';
import { EmptyState } from './EmptyState';
import { SortDropdown } from './SortDropdown';

const MapView = dynamic(() => import('./MapView').then((m) => m.MapView), {
  ssr: false,
  loading: () => (
    <div className="flex h-[70vh] items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-500">
      Loading map…
    </div>
  ),
});

type View = 'grid' | 'map';

export function BrowseClient({ listings }: { listings: Listing[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState(() =>
    filtersFromSearchParams(new URLSearchParams(searchParams.toString())),
  );
  const [view, setView] = useState<View>('grid');

  useEffect(() => {
    const params = filtersToSearchParams(filters);
    const qs = params.toString();
    const target = qs ? `/?${qs}` : '/';
    router.replace(target, { scroll: false });
  }, [filters, router]);

  const filtered = useMemo(() => applyFilters(listings, filters), [listings, filters]);

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <FilterSidebar
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(DEFAULT_FILTERS)}
      />
      <div className="flex-1">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-gray-600">
            {filtered.length} of {listings.length} providers
          </div>
          <div className="flex items-center gap-3">
            <SortDropdown value={filters.sort} onChange={(sort) => setFilters({ ...filters, sort })} />
            <div className="inline-flex rounded-md bg-gray-100 p-0.5 text-sm">
              <button
                type="button"
                onClick={() => setView('grid')}
                className={
                  'rounded px-3 py-1 transition ' +
                  (view === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600')
                }
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => setView('map')}
                className={
                  'rounded px-3 py-1 transition ' +
                  (view === 'map' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600')
                }
              >
                Map
              </button>
            </div>
          </div>
        </div>

        <div className="transition-opacity duration-200">
          {filtered.length === 0 ? (
            <EmptyState
              action={
                <button
                  type="button"
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="rounded-md bg-brand-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-600"
                >
                  Clear filters
                </button>
              }
            />
          ) : view === 'grid' ? (
            <ListingGrid listings={filtered} />
          ) : (
            <MapView listings={filtered} />
          )}
        </div>
      </div>
    </div>
  );
}
