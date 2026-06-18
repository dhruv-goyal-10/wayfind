'use client';

import { useMemo, useState } from 'react';
import type { Listing } from '@/lib/types';
import { DEFAULT_FILTERS, applyFilters } from '@/lib/filter';
import { FilterSidebar } from './FilterSidebar';
import { ListingGrid } from './ListingGrid';

export function BrowseClient({ listings }: { listings: Listing[] }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const filtered = useMemo(() => applyFilters(listings, filters), [listings, filters]);

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <FilterSidebar
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(DEFAULT_FILTERS)}
      />
      <div className="flex-1">
        <div className="mb-4 text-sm text-gray-600">
          {filtered.length} of {listings.length} providers
        </div>
        <ListingGrid listings={filtered} />
      </div>
    </div>
  );
}
