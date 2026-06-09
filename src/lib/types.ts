export type PriceRange = 1 | 2 | 3 | 4;

export interface Listing {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  price_range: PriceRange;
  rating: number;
  review_count: number;
  city: string;
  address?: string | null;
  latitude: number;
  longitude: number;
  tags: string[];
  images: string[];
  phone?: string | null;
  website?: string | null;
}

export interface Review {
  id: string;
  listing_id: string;
  author: string;
  rating: number;
  body: string;
  created_at: string;
}

export interface Filters {
  q: string;
  categories: string[];
  priceRange: [PriceRange, PriceRange];
  minRating: number;
  radiusKm: number | null;
  center: { lat: number; lng: number } | null;
}

export const CATEGORIES = [
  'Photography',
  'Coworking',
  'Contracting',
  'Personal Training',
  'Web Design',
  'Catering',
  'Music Lessons',
  'Landscaping',
  'Tutoring',
  'Pet Services',
] as const;
