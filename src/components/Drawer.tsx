'use client';

import { useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Drawer({ open, onClose, title, children }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <div
      className={
        'fixed inset-0 z-40 lg:hidden ' + (open ? 'pointer-events-auto' : 'pointer-events-none')
      }
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={
          'absolute inset-0 bg-black/40 transition-opacity ' +
          (open ? 'opacity-100' : 'opacity-0')
        }
      />
      <div
        role="dialog"
        aria-modal="true"
        className={
          'absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-white shadow-xl transition-transform duration-200 ' +
          (open ? 'translate-x-0' : '-translate-x-full')
        }
      >
        <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
          <div className="font-medium">{title}</div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-md text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
