'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

type Announcement = {
  id: number;
  title: string;
  type: string;
};

export default function AnnouncementBar() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    fetch('/api/announcements')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAnnouncements(data.filter(a => a.isActive));
        }
      })
      .catch(err => console.error(err));
  }, []);

  if (announcements.length === 0) return null;

  return (
    <div className="bg-[#27ae60] text-white overflow-hidden py-2 relative border-b border-white/10 shadow-sm">
      <div className="flex whitespace-nowrap animate-marquee items-center gap-10 px-4">
        {announcements.map((item, index) => (
          <div key={item.id} className="flex items-center gap-3">
            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
              item.type === 'danger' ? 'bg-red-500' : 
              item.type === 'warning' ? 'bg-orange-500' : 
              'bg-blue-500'
            }`}>
              INFO TERBARU
            </span>
            <span className="text-sm font-bold tracking-tight">
              {item.title}
            </span>
            {index !== announcements.length - 1 && <span className="text-white/30">•</span>}
          </div>
        ))}
        {/* Duplicate for seamless loop if only a few */}
        {announcements.length < 3 && announcements.map((item) => (
          <div key={`${item.id}-dup`} className="flex items-center gap-3">
            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
              item.type === 'danger' ? 'bg-red-500' : 
              item.type === 'warning' ? 'bg-orange-500' : 
              'bg-blue-500'
            }`}>
              INFO TERBARU
            </span>
            <span className="text-sm font-bold tracking-tight">
              {item.title}
            </span>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
