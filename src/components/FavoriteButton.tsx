'use client';

import { useFavorites } from './FavoritesProvider';

interface Props {
  listingId: string;
  variant?: 'icon' | 'full';
}

export function FavoriteButton({ listingId, variant = 'icon' }: Props) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(listingId);

  if (variant === 'full') {
    return (
      <button
        type="button"
        onClick={() => toggle(listingId)}
        className={
          'inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition ' +
          (active
            ? 'bg-rose-50 text-rose-700 ring-1 ring-rose-100 hover:bg-rose-100'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
        }
        aria-pressed={active}
      >
        <span>{active ? '♥' : '♡'}</span>
        {active ? 'Saved' : 'Save'}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(listingId);
      }}
      className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-lg shadow-sm ring-1 ring-black/5 backdrop-blur transition hover:bg-white"
      aria-pressed={active}
      aria-label={active ? 'Remove from favorites' : 'Save to favorites'}
    >
      <span className={active ? 'text-rose-500' : 'text-gray-400'}>{active ? '♥' : '♡'}</span>
    </button>
  );
}
