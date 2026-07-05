'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { checkToken, clearAdminCookie, setAdminCookie } from '@/lib/adminAuth';
import { getAdminSupabase, isAdminSupabaseConfigured } from '@/lib/adminSupabase';

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

export async function loginAction(formData: FormData) {
  const token = String(formData.get('token') ?? '');
  if (!checkToken(token)) {
    redirect('/admin/login?error=' + encodeURIComponent('Invalid token'));
  }
  setAdminCookie();
  redirect('/admin');
}

export async function logoutAction() {
  clearAdminCookie();
  redirect('/admin/login');
}

function parseListingForm(formData: FormData) {
  const nameRaw = String(formData.get('name') ?? '').trim();
  const providedSlug = String(formData.get('slug') ?? '').trim();
  return {
    name: nameRaw,
    slug: providedSlug || slugify(nameRaw),
    category: String(formData.get('category') ?? '').trim(),
    description: String(formData.get('description') ?? '').trim(),
    price_range: Number(formData.get('price_range') ?? 2),
    rating: Number(formData.get('rating') ?? 4.5),
    review_count: Number(formData.get('review_count') ?? 0),
    city: String(formData.get('city') ?? 'Portland').trim(),
    address: String(formData.get('address') ?? '').trim() || null,
    latitude: Number(formData.get('latitude') ?? 45.5231),
    longitude: Number(formData.get('longitude') ?? -122.6765),
    tags: String(formData.get('tags') ?? '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    images: String(formData.get('images') ?? '')
      .split(/\s+/)
      .map((u) => u.trim())
      .filter(Boolean),
    phone: String(formData.get('phone') ?? '').trim() || null,
    website: String(formData.get('website') ?? '').trim() || null,
  };
}

export async function createListingAction(formData: FormData) {
  if (!isAdminSupabaseConfigured()) {
    return { error: 'Set SUPABASE_SERVICE_ROLE_KEY to enable writes.' };
  }
  const supabase = getAdminSupabase()!;
  const payload = parseListingForm(formData);
  const { error } = await supabase.from('listings').insert(payload);
  if (error) return { error: error.message };
  revalidatePath('/admin');
  revalidatePath('/');
  redirect('/admin');
}

export async function updateListingAction(id: string, formData: FormData) {
  if (!isAdminSupabaseConfigured()) {
    return { error: 'Set SUPABASE_SERVICE_ROLE_KEY to enable writes.' };
  }
  const supabase = getAdminSupabase()!;
  const payload = parseListingForm(formData);
  const { error } = await supabase.from('listings').update(payload).eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin');
  revalidatePath('/');
  revalidatePath(`/listings/${payload.slug}`);
  redirect('/admin');
}

export async function deleteListingAction(id: string) {
  if (!isAdminSupabaseConfigured()) {
    return { error: 'Set SUPABASE_SERVICE_ROLE_KEY to enable writes.' };
  }
  const supabase = getAdminSupabase()!;
  const { error } = await supabase.from('listings').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin');
  revalidatePath('/');
}
