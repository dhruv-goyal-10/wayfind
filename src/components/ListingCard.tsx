import Link from 'next/link';
import Image from 'next/image';
import type { Listing } from '@/lib/types';
import { priceLabel } from '@/lib/format';
import { FavoriteButton } from './FavoriteButton';

export function ListingCard({ listing }: { listing: Listing }) {
  const cover = listing.images[0];
  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group relative block overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
    >
      <FavoriteButton listingId={listing.id} />
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        {cover && (
          <Image
            src={cover}
            alt={listing.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="line-clamp-1 text-base font-semibold text-gray-900">{listing.name}</h3>
            <p className="mt-0.5 text-sm text-gray-500">{listing.category}</p>
          </div>
          <div className="shrink-0 text-right text-sm">
            <div className="font-medium text-gray-900">★ {listing.rating.toFixed(1)}</div>
            <div className="text-xs text-gray-500">{listing.review_count} reviews</div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">{priceLabel(listing.price_range)}</span>
          <div className="flex flex-wrap justify-end gap-1">
            {listing.tags.slice(0, 2).map((t) => (
              <span key={t} className="rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand-700">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
