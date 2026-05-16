'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MegaphoneIcon, XMarkIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function AnnouncementSection() {
  const [announcement, setAnnouncement] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    async function fetchAnnouncement() {
      try {
        const res = await fetch('/api/announcements');
        const data = await res.json();
        if (data && data.length > 0) {
          // Get the most recent active announcement
          const active = data.find((a: any) => a.isActive);
          if (active) setAnnouncement(active);
        }
      } catch (error) {
        console.error('Failed to fetch announcement:', error);
      }
    }
    fetchAnnouncement();
  }, []);

  if (!announcement || !isVisible) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-r from-[#0b2b26] to-[#051a17] rounded-[20px] p-4 md:p-6 shadow-xl border border-white/5"
      >
        {/* Background Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#27ae60]/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#117a8b]/10 rounded-full blur-2xl -ml-16 -mb-16"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10 shadow-inner">
              <MegaphoneIcon className="w-6 h-6 text-[#2ecc71]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2ecc71]">Info Terbaru</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#2ecc71] animate-pulse"></span>
              </div>
              <h3 className="text-sm md:text-lg font-bold text-white leading-tight">
                {announcement.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link 
              href={`/berita`} 
              className="flex-1 md:flex-none bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-bold px-6 py-3 rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2 group"
            >
              Lihat Detail
              <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button 
              onClick={() => setIsVisible(false)}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5"
              aria-label="Close announcement"
            >
              <XMarkIcon className="w-4 h-4 text-white/40" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
