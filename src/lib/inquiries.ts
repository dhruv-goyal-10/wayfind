'use client';

import { getSupabase } from './supabase';

export interface InquiryPayload {
  listing_id: string;
  name: string;
  email: string;
  message: string;
}

export async function submitInquiry(payload: InquiryPayload): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase is not configured.');
  const { error } = await supabase.from('inquiries').insert(payload);
  if (error) throw new Error(error.message);
}
