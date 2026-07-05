export function priceLabel(value: number | string | null | undefined): string {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) return '—';
  const clamped = Math.min(4, Math.max(1, Math.round(n)));
  return '$'.repeat(clamped);
}
