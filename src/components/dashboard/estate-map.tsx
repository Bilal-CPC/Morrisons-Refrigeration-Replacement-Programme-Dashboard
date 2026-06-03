'use client';

import { useEffect, useRef } from 'react';
import type { Map as LeafletMap, Marker } from 'leaflet';
import type { Store, StoreStage } from '@/lib/data';

// Stage colours matched to the rest of the app
const STAGE_COLOURS: Record<StoreStage, string> = {
  Complete: '#16a34a',
  OnSite: '#f59e0b',
  Design: '#2563eb',
  Procurement: '#7c3aed',
  AtRisk: '#dc2626',
  NotStarted: '#94a3b8',
};

interface Props {
  stores: Store[];
  selected: Store | null;
  onSelect: (store: Store) => void;
}

export function EstateMap({ stores, selected, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Dynamically import Leaflet to avoid SSR issues
    import('leaflet').then((L) => {
      // Fix default icon paths broken by webpack
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(containerRef.current!, {
        center: [54.4, -2.8],
        zoom: 6,
        zoomControl: true,
        attributionControl: true,
      });

      mapRef.current = map;

      // OpenStreetMap tiles — free, no API key
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Add markers for each store
      stores.forEach((store) => {
        const colour = STAGE_COLOURS[store.stage];
        const isAtRisk = store.stage === 'AtRisk';

        const icon = L.divIcon({
          className: '',
          html: `<div style="
            width:${isAtRisk ? 14 : 12}px;
            height:${isAtRisk ? 14 : 12}px;
            background:${colour};
            border:2.5px solid white;
            border-radius:50%;
            box-shadow:0 1px 4px rgba(0,0,0,0.35);
            ${isAtRisk ? 'animation:pulse-ring 1.8s ease-out infinite;' : ''}
          "></div>`,
          iconSize: [isAtRisk ? 14 : 12, isAtRisk ? 14 : 12],
          iconAnchor: [isAtRisk ? 7 : 6, isAtRisk ? 7 : 6],
          popupAnchor: [0, -10],
        });

        const marker = L.marker([store.lat, store.lon], { icon })
          .addTo(map)
          .bindTooltip(`Morrisons ${store.name}`, {
            permanent: false,
            direction: 'top',
            offset: [0, -8],
            className: 'mor-tooltip',
          })
          .on('click', () => onSelect(store));

        markersRef.current.set(store.id, marker);
      });
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pan to selected store
  useEffect(() => {
    if (!mapRef.current || !selected) return;
    mapRef.current.setView([selected.lat, selected.lon], Math.max(mapRef.current.getZoom(), 10), { animate: true });
    markersRef.current.get(selected.id)?.openTooltip();
  }, [selected]);

  return (
    <>
      <style>{`
        .mor-tooltip {
          background: #0a2417;
          border: none;
          border-radius: 6px;
          color: white;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .mor-tooltip::before { display: none; }
        .leaflet-tooltip-top.mor-tooltip::before {
          display: block;
          border-top-color: #0a2417;
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(220,38,38,0.5), 0 1px 4px rgba(0,0,0,0.35); }
          70%  { box-shadow: 0 0 0 8px rgba(220,38,38,0), 0 1px 4px rgba(0,0,0,0.35); }
          100% { box-shadow: 0 0 0 0 rgba(220,38,38,0), 0 1px 4px rgba(0,0,0,0.35); }
        }
      `}</style>
      <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: 500, zIndex: 0 }} />
    </>
  );
}
