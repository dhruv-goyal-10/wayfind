import { getSupabase } from './supabase';
import type { Listing, Review } from './types';

function supabase() {
  const client = getSupabase();
  if (!client) throw new Error('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  return client;
}

export async function fetchListings(): Promise<Listing[]> {
  const { data, error } = await supabase().from('listings').select('*').order('rating', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Listing[];
}

export async function fetchListingBySlug(slug: string): Promise<Listing | null> {
  const { data, error } = await supabase().from('listings').select('*').eq('slug', slug).maybeSingle();
  if (error) throw error;
  return (data as Listing) ?? null;
}

export async function fetchListingsByIds(ids: string[]): Promise<Listing[]> {
  if (ids.length === 0) return [];
  const { data, error } = await supabase().from('listings').select('*').in('id', ids);
  if (error) throw error;
  return (data ?? []) as Listing[];
}

export async function fetchReviews(listingId: string): Promise<Review[]> {
  const { data, error } = await supabase()
    .from('reviews')
    .select('*')
    .eq('listing_id', listingId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Review[];
}
