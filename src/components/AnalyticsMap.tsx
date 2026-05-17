'use client';

import React, { useState } from 'react';

interface AnalyticsMapProps {
  locations: {
    categories: string[];
    data: number[];
  };
}

// Coordinates map for Lampung Timur districts and main visitor cities mapped to a 2D viewport (0-100)
const COORDINATES_MAP: Record<string, { x: number; y: number; label: string }> = {
  'Sukadana': { x: 50, y: 48, label: 'Kec. Sukadana (Pusat Pemerintahan)' },
  'Pekalongan': { x: 28, y: 35, label: 'Kec. Pekalongan' },
  'Batanghari': { x: 22, y: 55, label: 'Kec. Batanghari' },
  'Way Jepara': { x: 74, y: 58, label: 'Kec. Way Jepara' },
  'Labuhan Maringgai': { x: 82, y: 78, label: 'Kec. Labuhan Maringgai' },
  'Sekampung': { x: 38, y: 65, label: 'Kec. Sekampung' },
  'Purbolinggo': { x: 45, y: 30, label: 'Kec. Purbolinggo' },
  'Raman Utara': { x: 62, y: 28, label: 'Kec. Raman Utara' },
  'Metro': { x: 15, y: 45, label: 'Kota Metro (Perbatasan)' },
  'Bandar Lampung': { x: 10, y: 80, label: 'Kota Bandar Lampung (Perbatasan)' },
  'Lainnya': { x: 58, y: 80, label: 'Lainnya (Kecamatan Lain)' }
};

export default function AnalyticsMap({ locations }: AnalyticsMapProps) {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  const maxVal = locations.data.length > 0 ? Math.max(...locations.data) : 1;

  return (
    <div className="relative w-full h-full bg-slate-950 flex flex-col justify-between overflow-hidden font-sans">
      
      {/* Sci-fi Grid Overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(circle, #27ae60 1px, transparent 1px), linear-gradient(to right, rgba(39, 174, 96, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(39, 174, 96, 0.1) 1px, transparent 1px)',
             backgroundSize: '24px 24px, 48px 48px, 48px 48px',
             backgroundPosition: 'center center'
           }} 
      />

      {/* Abstract Lampung Timur SVG Map Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] text-emerald-500 fill-current">
          <path d="M 25 20 
                   Q 35 15, 45 18 
                   T 65 15 
                   Q 75 25, 85 30 
                   T 90 55 
                   Q 85 75, 75 85 
                   T 55 90 
                   Q 40 85, 30 80 
                   T 15 65 
                   Q 10 50, 12 35 
                   Z" 
                stroke="#27ae60" 
                strokeWidth="0.5" 
                strokeDasharray="2,2"
                fill="rgba(39, 174, 96, 0.05)"
          />
        </svg>
      </div>

      {/* Map Labels / Legend */}
      <div className="absolute top-4 left-4 z-10">
        <div className="text-[10px] uppercase font-bold tracking-widest text-[#27ae60] opacity-80">Geografis Pengunjung</div>
        <div className="text-xs text-slate-400 mt-1">Kabupaten Lampung Timur</div>
      </div>

      {/* Interactive Pulsing Map Markers */}
      <div className="absolute inset-0">
        {locations.categories.map((name, index) => {
          const count = locations.data[index];
          const coords = COORDINATES_MAP[name] || COORDINATES_MAP['Lainnya'];
          
          // Size proportional to traffic
          const baseSize = 8;
          const extraSize = (count / maxVal) * 16;
          const totalSize = baseSize + extraSize;

          return (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-20 group"
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
              onMouseEnter={() => setHoveredLocation(name)}
              onMouseLeave={() => setHoveredLocation(null)}
            >
              {/* Outer Radar Pulse */}
              <div 
                className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping"
                style={{ 
                  width: `${totalSize * 2.5}px`, 
                  height: `${totalSize * 2.5}px`,
                  marginLeft: `-${totalSize * 0.75}px`,
                  marginTop: `-${totalSize * 0.75}px`,
                  animationDuration: '2.5s'
                }} 
              />
              
              {/* Inner Pulsing Circle */}
              <div 
                className="rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] border border-white/20 transition-all duration-300 group-hover:scale-125"
                style={{ width: `${totalSize}px`, height: `${totalSize}px` }}
              />

              {/* Minimal Tooltip for Hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-slate-900 border border-emerald-500/30 text-white rounded-lg px-2.5 py-1 text-[10px] font-bold shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-30">
                <span className="text-[#27ae60]">{name}</span>: {count} Pengguna
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Status Pane */}
      <div className="relative z-10 w-full bg-slate-900/80 backdrop-blur-md border-t border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
          <span className="text-[11px] text-slate-300 font-medium tracking-wide">
            {hoveredLocation ? (
              <>
                Fokus: <strong className="text-emerald-400">{hoveredLocation}</strong> ({COORDINATES_MAP[hoveredLocation]?.label})
              </>
            ) : (
              'Memantau aktivitas pengunjung di Lampung Timur secara Real-time'
            )}
          </span>
        </div>
        <div className="text-[10px] text-slate-500 font-mono">
          REF: IP-GEO-API
        </div>
      </div>

    </div>
  );
}
