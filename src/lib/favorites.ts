'use client';

import { getSupabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEY = 'wayfind:favorites';
const SESSION_KEY = 'wayfind:session';

function ensureSessionId(): string {
  if (typeof window === 'undefined') return '';
  const existing = window.localStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36);
  window.localStorage.setItem(SESSION_KEY, id);
  return id;
}

function readLocal(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(ids: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export async function loadFavorites(): Promise<string[]> {
  const local = readLocal();
  if (!isSupabaseConfigured()) return local;
  const supabase = getSupabase()!;
  const sessionId = ensureSessionId();
  const { data, error } = await supabase.from('favorites').select('listing_id').eq('session_id', sessionId);
  if (error) return local;
  const remote = (data ?? []).map((r) => r.listing_id as string);
  const merged = Array.from(new Set([...local, ...remote]));
  writeLocal(merged);
  return merged;
}

export async function addFavorite(listingId: string): Promise<void> {
  const ids = readLocal();
  if (ids.includes(listingId)) return;
  writeLocal([...ids, listingId]);
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()!;
    await supabase.from('favorites').upsert({ session_id: ensureSessionId(), listing_id: listingId });
  }
}

export async function removeFavorite(listingId: string): Promise<void> {
  const ids = readLocal().filter((x) => x !== listingId);
  writeLocal(ids);
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()!;
    await supabase.from('favorites').delete().match({ session_id: ensureSessionId(), listing_id: listingId });
  }
}
