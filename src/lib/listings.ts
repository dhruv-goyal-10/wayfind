import { getSupabase, isSupabaseConfigured } from './supabase';
import type { Listing, Review } from './types';
import seed from '../../data/listings.json';

const seedListings = seed as Listing[];

export async function fetchListings(): Promise<Listing[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()!;
    const { data, error } = await supabase.from('listings').select('*').order('rating', { ascending: false });
    if (error) throw error;
    return (data ?? []) as Listing[];
  }
  return seedListings;
}

export async function fetchListingBySlug(slug: string): Promise<Listing | null> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()!;
    const { data, error } = await supabase.from('listings').select('*').eq('slug', slug).maybeSingle();
    if (error) throw error;
    return (data as Listing) ?? null;
  }
  return seedListings.find((l) => l.slug === slug) ?? null;
}

export async function fetchListingsByIds(ids: string[]): Promise<Listing[]> {
  if (ids.length === 0) return [];
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()!;
    const { data, error } = await supabase.from('listings').select('*').in('id', ids);
    if (error) throw error;
    return (data ?? []) as Listing[];
  }
  const set = new Set(ids);
  return seedListings.filter((l) => set.has(l.id));
}

const sampleAuthors = ['Jamie R.', 'Priya S.', 'Diego M.', 'Alex T.', 'Morgan L.', 'Ruth H.', 'Nikhil A.', 'Sara B.'];
const sampleBodies = [
  'Genuinely great experience from start to finish. Would book again without hesitation.',
  'Communication was clear, pricing was transparent, and the work spoke for itself.',
  'Went above and beyond what I asked for. A rare find.',
  'Solid, professional, on time. Exactly what I needed.',
  'A bit pricier than others I looked at, but 100% worth it for the quality.',
];

export async function fetchReviews(listingId: string): Promise<Review[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()!;
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('listing_id', listingId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data ?? []) as Review[];
  }
  const seedIdx = seedListings.findIndex((l) => l.id === listingId);
  if (seedIdx === -1) return [];
  const count = 3 + (seedIdx % 3);
  return Array.from({ length: count }, (_, i) => ({
    id: `${listingId}-r${i}`,
    listing_id: listingId,
    author: sampleAuthors[(seedIdx + i) % sampleAuthors.length],
    rating: 5 - (i % 2),
    body: sampleBodies[(seedIdx + i) % sampleBodies.length],
    created_at: new Date(Date.now() - (i + 1) * 86400000 * 7).toISOString(),
  }));
}
