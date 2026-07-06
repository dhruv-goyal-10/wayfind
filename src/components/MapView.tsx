'use client';

import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import type { Listing } from '@/lib/types';
import { priceLabel } from '@/lib/format';

const pinIcon = L.divIcon({
  className: 'wayfind-pin',
  html: '<div style="width:14px;height:14px;border-radius:50%;background:#4f5df0;box-shadow:0 0 0 3px rgba(79,93,240,.25);border:2px solid white"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

function FitBounds({ listings }: { listings: Listing[] }) {
  const map = useMap();
  useEffect(() => {
    if (listings.length === 0) return;
    const bounds = L.latLngBounds(listings.map((l) => [l.latitude, l.longitude] as [number, number]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }, [listings, map]);
  return null;
}

export function MapView({ listings }: { listings: Listing[] }) {
  const center = useMemo<[number, number]>(() => {
    if (listings.length === 0) return [45.5231, -122.6765];
    const lat = listings.reduce((s, l) => s + l.latitude, 0) / listings.length;
    const lng = listings.reduce((s, l) => s + l.longitude, 0) / listings.length;
    return [lat, lng];
  }, [listings]);

  return (
    <div className="h-[70vh] w-full overflow-hidden rounded-xl ring-1 ring-black/5">
      <MapContainer center={center} zoom={12} scrollWheelZoom className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <FitBounds listings={listings} />
        {listings.map((l) => {
          const cover = l.images[0];
          return (
            <Marker key={l.id} position={[l.latitude, l.longitude]} icon={pinIcon}>
              <Popup>
                <Link href={`/listings/${l.slug}`} className="block w-[220px] no-underline">
                  {cover && (
                    <img
                      src={cover}
                      alt={l.name}
                      loading="lazy"
                      className="mb-2 h-[110px] w-full rounded-md object-cover"
                    />
                  )}
                  <div className="text-[11px] uppercase tracking-wide text-gray-500">{l.category}</div>
                  <div className="font-semibold text-brand-700 hover:underline">{l.name}</div>
                  <div className="mt-1 text-xs text-gray-600">
                    ★ {l.rating.toFixed(1)} · {l.review_count} reviews · {priceLabel(l.price_range)}
                  </div>
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
