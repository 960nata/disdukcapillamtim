'use client';

import { useEffect, useRef } from 'react';

const locations = [
  { id: 1, name: "MPP LAMPUNG TIMUR", lat: -5.0188279, lng: 105.5353965, type: "Pusat", image: "/images/foto_kegiatan/pelayanan_ktp.avif", mapUrl: "https://www.google.com/maps/place/Mal+Pelayanan+Publik+(MPP)+Kabupaten+Lampung+Timur/@-5.0345837,105.5422375,12.5z/data=!4m12!1m5!3m4!2zNcKwMDYnMzYuMCJTIDEwNcKwMzInMjQuMCJF!8m2!3d-5.11!4d105.54!3m5!1s0x2e409b0032466e6f:0x140b8000f6895559!8m2!3d-5.0188279!4d105.5353965!16s%2Fg%2F11xf8nn920?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D" },
  { id: 2, name: "Kecamatan Batanghari", lat: -5.05, lng: 105.35, type: "Kecamatan", image: "/images/foto_kegiatan/jemput_bola.avif" },
  { id: 3, name: "Kecamatan Way Jepara", lat: -5.20, lng: 105.65, type: "Kecamatan", image: "/images/foto_kegiatan/penyerahan_ktp.avif" },
  { id: 4, name: "Kecamatan Mataram Baru", lat: -5.30, lng: 105.70, type: "Kecamatan", image: "/images/foto_kegiatan/sosialisasi_sekolah.avif" },
  { id: 5, name: "Kecamatan Labuhan Maringgai", lat: -5.35, lng: 105.80, type: "Kecamatan", image: "/images/foto_kegiatan/pelayanan_online.avif" },
  { id: 7, name: "Kecamatan Marga Sekampung", lat: -5.25, lng: 105.45, type: "Kecamatan", image: "/images/foto_kegiatan/penyerahan_kia.avif" }
];

export default function LocationSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = () => {
      const L = (window as any).L;
      
      // Fix for default marker icon broken images
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!mapInstance.current) {
        mapInstance.current = L.map(mapRef.current!).setView([-5.2, 105.5], 10);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance.current);
      }

      // Clear existing markers
      mapInstance.current.eachLayer((layer: any) => {
        if (layer instanceof L.Marker) {
          mapInstance.current.removeLayer(layer);
        }
      });

      // Add markers for locations
      locations.forEach(loc => {
        const popupContent = `
          <div class="relative bg-white/60 backdrop-blur-xl p-3 rounded-2xl flex gap-3 items-center w-[300px] border border-white/40 shadow-xl">
            <!-- Image on Left -->
            <div class="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
              <img src="${loc.image}" class="object-cover w-full h-full" />
            </div>
            
            <!-- Content on Right -->
            <div class="flex flex-col flex-grow" style="gap: 4px !important;">
              <div class="flex flex-col" style="gap: 1px !important;">
                <span class="font-bold text-[#27ae60] uppercase tracking-wider" style="font-size: 9px !important; line-height: 1 !important; margin: 0 !important;">${loc.type}</span>
                <h3 class="font-bold text-gray-900" style="font-size: 12px !important; line-height: 1.2 !important; margin: 2px 0 !important;">${loc.name.replace('Kecamatan ', '')}</h3>
                <p class="text-gray-600" style="font-size: 9px !important; line-height: 1 !important; margin: 0 !important;">Zona Pelayanan</p>
              </div>

              <!-- Google Maps Button -->
              <a href="${loc.mapUrl || `https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`}" target="_blank" style="background: linear-gradient(to right, #27ae60, #117a8b) !important; color: white !important; margin-top: 2px !important;" class="w-full text-[9px] font-bold py-1 rounded-full flex items-center justify-center gap-1 no-underline shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                Google Maps
              </a>
            </div>
          </div>
        `;

        const marker = L.marker([loc.lat, loc.lng])
          .addTo(mapInstance.current)
          .bindPopup(popupContent);

        // Open popup by default for MPP LAMPUNG TIMUR
        if (loc.id === 1) {
          marker.openPopup();
        }
      });
    };
    document.body.appendChild(script);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="py-16 bg-white" id="lokasi-pelayanan">
      
      {/* Custom Style for Leaflet Popup (Blur Effect) */}
      <style>{`
        .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          border: none !important;
          padding: 0 !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          width: 300px !important;
        }
        .leaflet-popup-tip {
          background: rgba(255, 255, 255, 0.9) !important;
          backdrop-filter: blur(10px) !important;
        }
        .leaflet-popup {
          animation: popup-fade 0.3s ease-out;
        }
        @keyframes popup-fade {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .map-fade-in {
          animation: map-fade 0.5s ease-out;
        }
        @keyframes map-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Map Container with Relative positioning for floating elements */}
        <div className="relative h-[600px] rounded-[20px] overflow-hidden shadow-xl border border-gray-100 map-fade-in">
          
          {/* Map */}
          <div ref={mapRef} className="h-full w-full z-10" />

        </div>
      </div>
    </section>
  );
}
