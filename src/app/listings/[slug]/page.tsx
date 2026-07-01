import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchListingBySlug, fetchReviews } from '@/lib/listings';
import { SiteHeader } from '@/components/SiteHeader';
import { ImageGallery } from '@/components/ImageGallery';
import { Reviews } from '@/components/Reviews';
import { ContactForm } from '@/components/ContactForm';
import { FavoriteButton } from '@/components/FavoriteButton';

export default async function ListingDetailPage({ params }: { params: { slug: string } }) {
  const listing = await fetchListingBySlug(params.slug);
  if (!listing) notFound();

  const reviews = await fetchReviews(listing.id);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <nav className="mb-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">Browse</Link>
          <span className="mx-2">/</span>
          <span>{listing.category}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ImageGallery images={listing.images} alt={listing.name} />

            <div className="mt-6">
              <div className="text-xs uppercase tracking-wide text-gray-500">{listing.category}</div>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight">{listing.name}</h1>
              <div className="mt-2 flex items-center gap-3 text-sm text-gray-600">
                <span>★ {listing.rating.toFixed(1)}</span>
                <span>·</span>
                <span>{listing.review_count} reviews</span>
                <span>·</span>
                <span>{'$'.repeat(listing.price_range)}</span>
                <span>·</span>
                <span>{listing.city}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {listing.tags.map((t) => (
                  <span key={t} className="rounded-full bg-brand-50 px-2.5 py-1 text-xs text-brand-700">
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-6 whitespace-pre-line text-gray-700">{listing.description}</p>

              {listing.address && (
                <div className="mt-6 rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700">
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Address</div>
                  <div className="mt-1">{listing.address}, {listing.city}</div>
                </div>
              )}

              <section className="mt-10">
                <h2 className="text-lg font-semibold">Reviews</h2>
                <div className="mt-3">
                  <Reviews reviews={reviews} />
                </div>
              </section>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5 lg:sticky lg:top-20">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-500">Contact</div>
                  <div className="mt-1 text-lg font-semibold">{listing.name}</div>
                </div>
                <FavoriteButton listingId={listing.id} variant="full" />
              </div>
              <div className="mt-3 space-y-1 text-sm text-gray-600">
                {listing.phone && <div>📞 {listing.phone}</div>}
                {listing.website && (
                  <a href={listing.website} target="_blank" rel="noopener noreferrer" className="block text-brand-600 hover:underline">
                    {listing.website.replace(/^https?:\/\//, '')}
                  </a>
                )}
              </div>
              <div className="my-4 h-px bg-gray-100" />
              <ContactForm listingName={listing.name} />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
