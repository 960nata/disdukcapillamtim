'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface AnalyticsMapProps {
  locations: {
    categories: string[];
    data: number[];
  };
}

const DISTRICT_COORDINATES: Record<string, [number, number]> = {
  'Sukadana': [-5.0506, 105.5933],
  'Pekalongan': [-5.1611, 105.3703],
  'Batanghari': [-5.1878, 105.4192],
  'Way Jepara': [-5.1481, 105.7486],
  'Labuhan Maringgai': [-5.3197, 105.8089],
  'Sekampung': [-5.2014, 105.4853],
  'Purbolinggo': [-4.9625, 105.5414],
  'Raman Utara': [-4.9222, 105.5972],
  'Metro': [-5.1128, 105.3061],
  'Bandar Lampung': [-5.3971, 105.2663],
  'Lainnya': [-5.0506, 105.5933]
};

export default function AnalyticsMap({ locations }: AnalyticsMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || typeof window === 'undefined') return;

    // Initialize map if it doesn't exist
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        center: [-5.06, 105.59], // Center of Lampung Timur
        zoom: 9.5,
        zoomControl: true,
        scrollWheelZoom: true,
        attributionControl: true
      });

      // Add modern, sleek OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors | Disdukcapil Lamtim'
      }).addTo(mapRef.current);

      markersLayerRef.current = L.layerGroup().addTo(mapRef.current);
    }

    const map = mapRef.current;
    const markersLayer = markersLayerRef.current;

    if (markersLayer) {
      // Clear previous markers
      markersLayer.clearLayers();

      const maxVal = locations.data.length > 0 ? Math.max(...locations.data) : 1;

      // Populate new markers
      locations.categories.forEach((name, index) => {
        const count = locations.data[index];
        const coords = DISTRICT_COORDINATES[name] || DISTRICT_COORDINATES['Lainnya'];
        
        // Dynamic size based on volume
        const size = Math.max(10, 10 + (count / maxVal) * 16);

        // Define a stunning pulsing custom marker using Leaflet divIcon and Tailwind CSS
        const customIcon = L.divIcon({
          html: `
            <div class="relative flex items-center justify-center" style="width: ${size * 2}px; height: ${size * 2}px;">
              <span class="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping"></span>
              <span class="relative inline-flex rounded-full bg-emerald-600 border-2 border-white shadow-lg shadow-emerald-500/50" style="width: ${size}px; height: ${size}px;"></span>
            </div>
          `,
          className: 'bg-transparent border-none',
          iconSize: [size * 2, size * 2],
          iconAnchor: [size, size]
        });

        // Add Marker to map
        L.marker(coords, { icon: customIcon })
          .addTo(markersLayer)
          .bindPopup(`
            <div class="font-sans p-1 text-slate-800">
              <strong class="text-[#27ae60] text-sm">${name}</strong>
              <div class="text-xs mt-1 text-slate-600">
                Active visitors: <strong class="text-slate-900">${count}</strong>
              </div>
            </div>
          `, { closeButton: false });
      });
    }

    // Adjust size on window resize
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [locations]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full z-10" />
      {/* Sci-fi Overlay Border */}
      <div className="absolute inset-0 border border-emerald-500/10 pointer-events-none z-20 rounded-2xl" />
    </div>
  );
}
