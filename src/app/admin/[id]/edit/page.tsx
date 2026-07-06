import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchListings } from '@/lib/listings';
import { ListingForm } from '@/components/ListingForm';
import { updateListingAction } from '../../actions';

export const metadata = { title: 'Edit listing' };
export const dynamic = 'force-dynamic';

export default async function EditListingPage({ params }: { params: { id: string } }) {
  const all = await fetchListings();
  const listing = all.find((l) => l.id === params.id);
  if (!listing) notFound();

  const bound = updateListingAction.bind(null, listing.id);

  return (
    <div>
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/admin" className="hover:text-gray-700">Listings</Link>
        <span className="mx-2">/</span>
        <span>{listing.name}</span>
      </nav>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Edit listing</h1>
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <ListingForm action={bound} initial={listing} submitLabel="Save changes" />
      </div>
    </div>
  );
}
