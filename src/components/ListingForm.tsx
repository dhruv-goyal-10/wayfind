import Link from 'next/link';
import type { Listing } from '@/lib/types';
import { CATEGORIES } from '@/lib/types';

interface Props {
  action: (formData: FormData) => Promise<unknown>;
  initial?: Listing | null;
  submitLabel: string;
}

export function ListingForm({ action, initial, submitLabel }: Props) {
  return (
    <form action={action} className="grid gap-4">
      <Field label="Name" required>
        <input name="name" required defaultValue={initial?.name ?? ''} className={inputCls} />
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Slug">
          <input
            name="slug"
            defaultValue={initial?.slug ?? ''}
            placeholder="auto-generated from name"
            className={inputCls}
          />
        </Field>
        <Field label="Category" required>
          <select name="category" required defaultValue={initial?.category ?? ''} className={inputCls}>
            <option value="" disabled>Choose one</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Description" required>
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={initial?.description ?? ''}
          className={inputCls}
        />
      </Field>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Field label="Price 1–4" required>
          <input
            name="price_range"
            type="number"
            min={1}
            max={4}
            required
            defaultValue={initial?.price_range ?? 2}
            className={inputCls}
          />
        </Field>
        <Field label="Rating">
          <input
            name="rating"
            type="number"
            step="0.1"
            min={0}
            max={5}
            defaultValue={initial?.rating ?? 4.5}
            className={inputCls}
          />
        </Field>
        <Field label="Reviews">
          <input
            name="review_count"
            type="number"
            min={0}
            defaultValue={initial?.review_count ?? 0}
            className={inputCls}
          />
        </Field>
        <Field label="City">
          <input name="city" defaultValue={initial?.city ?? 'Portland'} className={inputCls} />
        </Field>
      </div>
      <Field label="Address">
        <input name="address" defaultValue={initial?.address ?? ''} className={inputCls} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Latitude">
          <input
            name="latitude"
            type="number"
            step="any"
            defaultValue={initial?.latitude ?? 45.5231}
            className={inputCls}
          />
        </Field>
        <Field label="Longitude">
          <input
            name="longitude"
            type="number"
            step="any"
            defaultValue={initial?.longitude ?? -122.6765}
            className={inputCls}
          />
        </Field>
      </div>
      <Field label="Tags (comma separated)">
        <input
          name="tags"
          defaultValue={initial?.tags.join(', ') ?? ''}
          className={inputCls}
        />
      </Field>
      <Field label="Images (one URL per line)">
        <textarea
          name="images"
          rows={3}
          defaultValue={initial?.images.join('\n') ?? ''}
          className={inputCls}
        />
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Phone">
          <input name="phone" defaultValue={initial?.phone ?? ''} className={inputCls} />
        </Field>
        <Field label="Website">
          <input name="website" defaultValue={initial?.website ?? ''} className={inputCls} />
        </Field>
      </div>

      <div className="mt-2 flex items-center gap-3">
        <button
          type="submit"
          className="rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
        >
          {submitLabel}
        </button>
        <Link href="/admin" className="text-sm text-gray-600 hover:text-gray-900">Cancel</Link>
      </div>
    </form>
  );
}

const inputCls =
  'w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
        {required && <span className="ml-1 text-rose-500">*</span>}
      </span>
      {children}
    </label>
  );
}
