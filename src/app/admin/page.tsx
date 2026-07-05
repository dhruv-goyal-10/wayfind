import Link from 'next/link';
import { fetchListings } from '@/lib/listings';
import { priceLabel } from '@/lib/format';
import { deleteListingAction } from './actions';
import { AdminDeleteButton } from '@/components/AdminDeleteButton';

export const dynamic = 'force-dynamic';

export default async function AdminIndexPage() {
  const listings = await fetchListings();
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Listings</h1>
          <p className="mt-1 text-sm text-gray-600">{listings.length} in the directory.</p>
        </div>
        <Link
          href="/admin/new"
          className="rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
        >
          + New listing
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Rating</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {listings.map((l) => (
              <tr key={l.id}>
                <td className="px-4 py-3">
                  <Link href={`/admin/${l.id}/edit`} className="font-medium text-brand-700 hover:underline">
                    {l.name}
                  </Link>
                  <div className="text-xs text-gray-500">/{l.slug}</div>
                </td>
                <td className="px-4 py-3 text-gray-700">{l.category}</td>
                <td className="px-4 py-3 text-gray-700">{priceLabel(l.price_range)}</td>
                <td className="px-4 py-3 text-gray-700">
                  ★ {l.rating.toFixed(1)} <span className="text-gray-400">({l.review_count})</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <AdminDeleteButton action={deleteListingAction.bind(null, l.id)} label={l.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
