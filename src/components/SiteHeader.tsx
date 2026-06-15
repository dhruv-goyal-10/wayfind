import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="inline-block h-6 w-6 rounded-md bg-brand-500" />
          Wayfind
        </Link>
        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">Browse</Link>
          <Link href="/favorites" className="hover:text-gray-900">Favorites</Link>
        </nav>
      </div>
    </header>
  );
}
