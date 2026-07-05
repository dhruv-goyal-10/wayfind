interface Props {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  title = 'No matches for those filters',
  description = 'Try clearing a filter or broadening your price or distance range.',
  action,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-black/5">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-brand-500">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="mt-3 text-base font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-gray-600">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
