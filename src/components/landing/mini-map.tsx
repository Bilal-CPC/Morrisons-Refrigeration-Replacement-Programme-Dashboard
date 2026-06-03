'use client';

import { useEffect, useRef } from 'react';
import { STORES, STAGE_META } from '@/lib/data';

// Lightweight read-only estate map for the landing page feature section.
// Uses Leaflet + OSM — no API key. Zoom/pan enabled, no store drawer.
export function MiniEstateMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    import('leaflet').then((L) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      const map = L.map(containerRef.current!, {
        center: [54.4, -2.8],
        zoom: 5,
        zoomControl: true,
        attributionControl: false,
        scrollWheelZoom: false,
      });

      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 14,
      }).addTo(map);

      // Minimal attribution
      L.control.attribution({ prefix: '© OpenStreetMap' }).addTo(map);

      STORES.forEach((store) => {
        const colour = STAGE_META[store.stage].color;
        const icon = L.divIcon({
          className: '',
          html: `<div style="
            width:9px; height:9px;
            background:${colour};
            border:1.5px solid white;
            border-radius:50%;
            box-shadow:0 1px 3px rgba(0,0,0,0.3);
          "></div>`,
          iconSize: [9, 9],
          iconAnchor: [4.5, 4.5],
        });

        L.marker([store.lat, store.lon], { icon })
          .bindTooltip(`Morrisons ${store.name}`, {
            direction: 'top',
            offset: [0, -6],
            className: 'mini-mor-tip',
          })
          .addTo(map);
      });
    });

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mapRef.current as any)?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <>
      <style>{`
        .mini-mor-tip {
          background: #0a2417;
          border: none;
          border-radius: 5px;
          color: white;
          font-size: 10px;
          font-weight: 600;
          padding: 3px 7px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
        }
        .mini-mor-tip::before { display: none; }
      `}</style>
      <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: 340, zIndex: 0 }} />
    </>
  );
}
