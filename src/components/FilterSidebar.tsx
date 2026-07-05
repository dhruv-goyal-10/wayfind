'use client';

import type { Filters, PriceRange } from '@/lib/types';
import { CATEGORIES } from '@/lib/types';
import { priceLabel } from '@/lib/format';

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
  onReset: () => void;
}

const RATING_STEPS = [0, 3.5, 4, 4.5];

export function FilterSidebar({ filters, onChange, onReset }: Props) {
  const toggleCategory = (cat: string) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: next });
  };

  const setPrice = (idx: 0 | 1, value: PriceRange) => {
    const range: [PriceRange, PriceRange] = [...filters.priceRange] as [PriceRange, PriceRange];
    range[idx] = value;
    if (range[0] > range[1]) range[1] = range[0];
    onChange({ ...filters, priceRange: range });
  };

  return (
    <aside className="w-full shrink-0 space-y-6 rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5 lg:sticky lg:top-20 lg:w-72">
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
          Search
        </label>
        <input
          type="text"
          value={filters.q}
          onChange={(e) => onChange({ ...filters, q: e.target.value })}
          placeholder="Name, tag, or keyword…"
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Category</div>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => {
            const active = filters.categories.includes(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={
                  'rounded-full px-3 py-1 text-xs transition ' +
                  (active
                    ? 'bg-brand-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                }
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Price</div>
        <div className="flex items-center gap-2 text-sm">
          <select
            value={filters.priceRange[0]}
            onChange={(e) => setPrice(0, Number(e.target.value) as PriceRange)}
            className="rounded-md border border-gray-200 px-2 py-1"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>{priceLabel(n)}</option>
            ))}
          </select>
          <span className="text-gray-400">to</span>
          <select
            value={filters.priceRange[1]}
            onChange={(e) => setPrice(1, Number(e.target.value) as PriceRange)}
            className="rounded-md border border-gray-200 px-2 py-1"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>{priceLabel(n)}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Minimum rating</div>
        <div className="flex gap-1.5">
          {RATING_STEPS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onChange({ ...filters, minRating: r })}
              className={
                'rounded-md px-2.5 py-1 text-xs transition ' +
                (filters.minRating === r
                  ? 'bg-brand-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
              }
            >
              {r === 0 ? 'Any' : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Distance</div>
        <div className="flex gap-1.5">
          {[null, 2, 5, 10].map((km) => (
            <button
              key={String(km)}
              type="button"
              onClick={() =>
                onChange({
                  ...filters,
                  radiusKm: km,
                  center: km == null ? null : filters.center ?? { lat: 45.5231, lng: -122.6765 },
                })
              }
              className={
                'rounded-md px-2.5 py-1 text-xs transition ' +
                (filters.radiusKm === km
                  ? 'bg-brand-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
              }
            >
              {km == null ? 'Any' : `${km} km`}
            </button>
          ))}
        </div>
        {filters.radiusKm != null && (
          <p className="mt-2 text-xs text-gray-500">Centered on downtown Portland.</p>
        )}
      </div>

      <button
        type="button"
        onClick={onReset}
        className="w-full rounded-md border border-gray-200 py-2 text-sm text-gray-600 hover:bg-gray-50"
      >
        Reset filters
      </button>
    </aside>
  );
}
