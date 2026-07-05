import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/adminAuth';
import { loginAction } from '../actions';

export const metadata = { title: 'Admin login' };

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  if (isAdmin()) redirect('/admin');
  return (
    <div className="grid min-h-screen place-items-center bg-gray-50 p-6">
      <form
        action={loginAction}
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5"
      >
        <div className="mb-1 text-xs uppercase tracking-wide text-gray-500">Admin</div>
        <h1 className="text-xl font-semibold">Sign in</h1>
        <p className="mt-1 text-sm text-gray-600">Paste your admin token to manage listings.</p>
        <input
          type="password"
          name="token"
          required
          autoFocus
          placeholder="Admin token"
          className="mt-4 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        {searchParams?.error && (
          <p className="mt-2 text-sm text-rose-600">{searchParams.error}</p>
        )}
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-brand-500 py-2 text-sm font-medium text-white hover:bg-brand-600"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
