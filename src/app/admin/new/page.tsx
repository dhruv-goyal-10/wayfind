import Link from 'next/link';
import { ListingForm } from '@/components/ListingForm';
import { createListingAction } from '../actions';

export const metadata = { title: 'New listing' };

export default function NewListingPage() {
  return (
    <div>
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/admin" className="hover:text-gray-700">Listings</Link>
        <span className="mx-2">/</span>
        <span>New</span>
      </nav>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">New listing</h1>
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <ListingForm action={createListingAction} submitLabel="Create listing" />
      </div>
    </div>
  );
}
