'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { addFavorite, loadFavorites, removeFavorite } from '@/lib/favorites';

interface Ctx {
  ids: Set<string>;
  isFavorite: (id: string) => boolean;
  toggle: (id: string) => void;
  ready: boolean;
}

const FavoritesContext = createContext<Ctx | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadFavorites().then((list) => {
      setIds(new Set(list));
      setReady(true);
    });
  }, []);

  const isFavorite = useCallback((id: string) => ids.has(id), [ids]);

  const toggle = useCallback(
    (id: string) => {
      setIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
          removeFavorite(id);
        } else {
          next.add(id);
          addFavorite(id);
        }
        return next;
      });
    },
    [],
  );

  return (
    <FavoritesContext.Provider value={{ ids, isFavorite, toggle, ready }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): Ctx {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
