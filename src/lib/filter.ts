import type { Filters, Listing } from './types';
import { haversineKm } from './geo';

export const DEFAULT_FILTERS: Filters = {
  q: '',
  categories: [],
  priceRange: [1, 4],
  minRating: 0,
  radiusKm: null,
  center: null,
};

export function applyFilters(listings: Listing[], f: Filters): Listing[] {
  const q = f.q.trim().toLowerCase();
  return listings.filter((l) => {
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
}
