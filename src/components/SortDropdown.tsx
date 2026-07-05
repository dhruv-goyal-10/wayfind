'use client';

import { SORT_OPTIONS, type SortKey } from '@/lib/types';

interface Props {
  value: SortKey;
  onChange: (value: SortKey) => void;
}

export function SortDropdown({ value, onChange }: Props) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-gray-600">
      <span className="hidden sm:inline">Sort by</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="rounded-md border border-gray-200 bg-white px-2 py-1 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}
