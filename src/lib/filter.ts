import type { Filters, Listing, PriceRange, SortKey } from './types';
import { haversineKm } from './geo';

export const DEFAULT_FILTERS: Filters = {
  q: '',
  categories: [],
  priceRange: [1, 4],
  minRating: 0,
  radiusKm: null,
  center: null,
  sort: 'top',
};

export function applyFilters(listings: Listing[], f: Filters): Listing[] {
  const q = f.q.trim().toLowerCase();
  const filtered = listings.filter((l) => {
    if (q) {
      const hay = `${l.name} ${l.category} ${l.description} ${l.tags.join(' ')}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (f.categories.length && !f.categories.includes(l.category)) return false;
    if (l.price_range < f.priceRange[0] || l.price_range > f.priceRange[1]) return false;
    if (l.rating < f.minRating) return false;
    if (f.center && f.radiusKm != null) {
      const km = haversineKm(f.center, { lat: l.latitude, lng: l.longitude });
      if (km > f.radiusKm) return false;
    }
    return true;
  });
  return sortListings(filtered, f.sort);
}

function sortListings(list: Listing[], sort: SortKey): Listing[] {
  const copy = [...list];
  switch (sort) {
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating || b.review_count - a.review_count);
    case 'reviews':
      return copy.sort((a, b) => b.review_count - a.review_count);
    case 'price-asc':
      return copy.sort((a, b) => a.price_range - b.price_range || b.rating - a.rating);
    case 'price-desc':
      return copy.sort((a, b) => b.price_range - a.price_range || b.rating - a.rating);
    case 'top':
    default:
      return copy.sort((a, b) => b.rating * Math.log(b.review_count + 1) - a.rating * Math.log(a.review_count + 1));
  }
}

export function filtersToSearchParams(f: Filters): URLSearchParams {
  const params = new URLSearchParams();
  if (f.q) params.set('q', f.q);
  if (f.categories.length) params.set('category', f.categories.join(','));
  if (f.priceRange[0] !== 1 || f.priceRange[1] !== 4) {
    params.set('price', `${f.priceRange[0]}-${f.priceRange[1]}`);
  }
  if (f.minRating) params.set('rating', String(f.minRating));
  if (f.radiusKm != null) params.set('radius', String(f.radiusKm));
  if (f.sort !== 'top') params.set('sort', f.sort);
  return params;
}

const SORT_KEYS: SortKey[] = ['top', 'rating', 'reviews', 'price-asc', 'price-desc'];

export function filtersFromSearchParams(params: URLSearchParams): Filters {
  const q = params.get('q') ?? '';
  const category = params.get('category');
  const price = params.get('price');
  const rating = params.get('rating');
  const radius = params.get('radius');
  const sort = params.get('sort') as SortKey | null;

  let priceRange: [PriceRange, PriceRange] = [1, 4];
  if (price) {
    const [lo, hi] = price.split('-').map((n) => Number(n));
    if (lo >= 1 && lo <= 4 && hi >= 1 && hi <= 4 && lo <= hi) {
      priceRange = [lo as PriceRange, hi as PriceRange];
    }
  }

  return {
    q,
    categories: category ? category.split(',').filter(Boolean) : [],
    priceRange,
    minRating: rating ? Number(rating) : 0,
    radiusKm: radius ? Number(radius) : null,
    center: radius ? { lat: 45.5231, lng: -122.6765 } : null,
    sort: sort && SORT_KEYS.includes(sort) ? sort : 'top',
  };
}
