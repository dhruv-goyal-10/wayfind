import type { Review } from '@/lib/types';

function relative(dateStr: string): string {
  const d = new Date(dateStr).getTime();
  const days = Math.floor((Date.now() - d) / 86400000);
  if (days < 1) return 'today';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export function Reviews({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <p className="text-sm text-gray-500">No reviews yet — be the first to leave one.</p>;
  }
  return (
    <ul className="divide-y divide-gray-100">
      {reviews.map((r) => (
        <li key={r.id} className="py-4">
          <div className="flex items-center justify-between text-sm">
            <div className="font-medium text-gray-900">{r.author}</div>
            <div className="text-gray-500">{relative(r.created_at)}</div>
          </div>
          <div className="mt-1 text-sm text-yellow-600">{'★'.repeat(r.rating)}<span className="text-gray-200">{'★'.repeat(5 - r.rating)}</span></div>
          <p className="mt-2 text-sm text-gray-700">{r.body}</p>
        </li>
      ))}
    </ul>
  );
}
