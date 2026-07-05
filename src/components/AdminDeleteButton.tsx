'use client';

interface Props {
  action: () => Promise<unknown>;
  label: string;
}

export function AdminDeleteButton({ action, label }: Props) {
  return (
    <form action={action} className="inline">
      <button
        type="submit"
        onClick={(e) => {
          if (!confirm(`Delete "${label}"?`)) e.preventDefault();
        }}
        className="text-xs text-rose-600 hover:underline"
      >
        Delete
      </button>
    </form>
  );
}
