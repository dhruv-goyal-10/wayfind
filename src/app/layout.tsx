import type { Metadata } from 'next';
import { FavoritesProvider } from '@/components/FavoritesProvider';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Wayfind — find a local service provider',
    template: '%s · Wayfind',
  },
  description: 'Search, filter, and save local service providers you can trust.',
  openGraph: {
    type: 'website',
    siteName: 'Wayfind',
    title: 'Wayfind — find a local service provider',
    description: 'Search, filter, and save local service providers you can trust.',
  },
};

export const viewport = {
  themeColor: '#4f5df0',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-gray-50 font-sans text-gray-900 antialiased">
        <FavoritesProvider>
          <div className="flex-1">{children}</div>
          <footer className="border-t border-black/5 bg-white/60">
            <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-gray-500 sm:flex-row sm:items-center">
              <span>© {new Date().getFullYear()} Wayfind — a directory demo.</span>
              <span>Built with Next.js, Supabase, and Tailwind.</span>
            </div>
          </footer>
        </FavoritesProvider>
      </body>
    </html>
  );
}
