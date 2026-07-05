import Link from 'next/link';
import { isAdmin } from '@/lib/adminAuth';
import { isAdminSupabaseConfigured } from '@/lib/adminSupabase';
import { logoutAction } from './actions';

export const metadata = { title: 'Admin' };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isAdmin()) return <>{children}</>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/admin" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span className="inline-block h-6 w-6 rounded-md bg-brand-500" />
            Wayfind Admin
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-gray-600 hover:text-gray-900">View site</Link>
            <form action={logoutAction}>
              <button type="submit" className="text-gray-600 hover:text-gray-900">Sign out</button>
            </form>
          </div>
        </div>
      </header>
      {!isAdminSupabaseConfigured() && (
        <div className="border-b border-amber-100 bg-amber-50 text-amber-900">
          <div className="mx-auto max-w-6xl px-6 py-2 text-sm">
            Read-only mode — set <code className="rounded bg-amber-100 px-1">SUPABASE_SERVICE_ROLE_KEY</code> to enable writes.
          </div>
        </div>
      )}
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
