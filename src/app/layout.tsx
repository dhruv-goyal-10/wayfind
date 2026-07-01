import type { Metadata } from 'next';
import { FavoritesProvider } from '@/components/FavoritesProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wayfind',
  description: 'Find a local service provider you can trust.',
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
