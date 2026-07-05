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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <FavoritesProvider>{children}</FavoritesProvider>
      </body>
    </html>
  );
}
