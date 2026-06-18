import { fetchListings } from '@/lib/listings';
import { BrowseClient } from '@/components/BrowseClient';
import { SiteHeader } from '@/components/SiteHeader';

export default async function BrowsePage() {
  const listings = await fetchListings();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Find a local service provider</h1>
          <p className="mt-1 text-sm text-gray-600">
            Search and filter across {new Set(listings.map((l) => l.category)).size} categories.
          </p>
        </div>
        <BrowseClient listings={listings} />
      </main>
    </div>
  );
}
