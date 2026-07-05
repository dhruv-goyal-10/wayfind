'use client';

import { useState } from 'react';
import { submitInquiry } from '@/lib/inquiries';

type Status = 'idle' | 'sending' | 'sent' | 'error';

interface Props {
  listingId: string;
  listingName: string;
}

export function ContactForm({ listingId, listingName }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage(null);
    const form = new FormData(e.currentTarget);
    try {
      await submitInquiry({
        listing_id: listingId,
        name: String(form.get('name') ?? '').trim(),
        email: String(form.get('email') ?? '').trim(),
        message: String(form.get('message') ?? '').trim(),
      });
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  if (status === 'sent') {
    return (
      <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800 ring-1 ring-green-100">
        Thanks — your message to <b>{listingName}</b> is on its way. They usually reply within a day or two.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>
      <textarea
        name="message"
        required
        rows={4}
        placeholder={`Tell ${listingName} a bit about what you're looking for…`}
        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
      />
      {status === 'error' && errorMessage && (
        <p className="text-sm text-rose-600">{errorMessage}</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-md bg-brand-500 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send inquiry'}
      </button>
    </form>
  );
}
