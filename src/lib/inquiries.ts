'use client';

import { getSupabase, isSupabaseConfigured } from './supabase';

const LOCAL_KEY = 'wayfind:inquiries';

export interface InquiryPayload {
  listing_id: string;
  name: string;
  email: string;
  message: string;
}

export async function submitInquiry(payload: InquiryPayload): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()!;
    const { error } = await supabase.from('inquiries').insert(payload);
    if (error) throw new Error(error.message);
    return;
  }
  const existing = safeReadLocal();
  existing.push({ ...payload, created_at: new Date().toISOString() });
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify(existing));
}

function safeReadLocal(): Array<InquiryPayload & { created_at: string }> {
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
