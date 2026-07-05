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
import { Drawer } from './Drawer';

const MapView = dynamic(() => import('./MapView').then((m) => m.MapView), {
  ssr: false,
  loading: () => (
    <div className="flex h-[70vh] items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-500">
      Loading map…
    </div>
  ),
});

type View = 'grid' | 'map';

function countActive(f: ReturnType<typeof filtersFromSearchParams>): number {
  let n = 0;
  if (f.q) n++;
  if (f.categories.length) n++;
  if (f.priceRange[0] !== 1 || f.priceRange[1] !== 4) n++;
  if (f.minRating) n++;
  if (f.radiusKm != null) n++;
  return n;
}

export function BrowseClient({ listings }: { listings: Listing[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState(() =>
    filtersFromSearchParams(new URLSearchParams(searchParams.toString())),
  );
  const [view, setView] = useState<View>('grid');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const params = filtersToSearchParams(filters);
    const qs = params.toString();
    router.replace(qs ? `/?${qs}` : '/', { scroll: false });
  }, [filters, router]);

  const filtered = useMemo(() => applyFilters(listings, filters), [listings, filters]);
  const activeCount = countActive(filters);

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="hidden lg:block">
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(DEFAULT_FILTERS)}
        />
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Filters">
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(DEFAULT_FILTERS)}
        />
      </Drawer>

      <div className="flex-1">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:bg-gray-50 lg:hidden"
            >
              <span>Filters</span>
              {activeCount > 0 && (
                <span className="rounded-full bg-brand-500 px-1.5 text-xs font-medium text-white">
                  {activeCount}
                </span>
              )}
            </button>
            <div className="text-sm text-gray-600">
              {filtered.length} of {listings.length} providers
            </div>
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
