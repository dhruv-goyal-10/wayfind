'use client';

import Link from 'next/link';
import { useFavorites } from './FavoritesProvider';

export function SiteHeader() {
  const { ids } = useFavorites();
  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500 shadow-sm ring-1 ring-brand-600/20">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" fill="currentColor" fillOpacity="0.15" />
              <circle cx="12" cy="10" r="2.5" fill="currentColor" />
            </svg>
          </span>
          Wayfind
        </Link>
        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">Browse</Link>
          <Link href="/favorites" className="inline-flex items-center gap-1.5 hover:text-gray-900">
            Favorites
            {ids.size > 0 && (
              <span className="rounded-full bg-brand-500 px-1.5 text-xs font-medium text-white">
                {ids.size}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
