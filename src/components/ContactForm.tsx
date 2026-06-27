'use client';

import { useState } from 'react';

export function ContactForm({ listingName }: { listingName: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('sending');
    setTimeout(() => setState('sent'), 600);
  };

  if (state === 'sent') {
    return (
      <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800 ring-1 ring-green-100">
        Thanks! Your message to <b>{listingName}</b> has been queued. They usually reply within a day or two.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          type="text"
          required
          placeholder="Your name"
          className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        <input
          type="email"
          required
          placeholder="Email"
          className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>
      <textarea
        required
        rows={4}
        placeholder={`Tell ${listingName} a bit about what you're looking for…`}
        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
      />
      <button
        type="submit"
        disabled={state === 'sending'}
        className="w-full rounded-md bg-brand-500 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-60"
      >
        {state === 'sending' ? 'Sending…' : 'Send inquiry'}
      </button>
    </form>
  );
}
