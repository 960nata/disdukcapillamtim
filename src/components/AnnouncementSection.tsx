'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MegaphoneIcon, XMarkIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function AnnouncementSection() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const res = await fetch('/api/announcements');
        const data = await res.json();
        if (data && data.length > 0) {
          // Get up to 3 active announcements
          const active = data.filter((a: any) => a.isActive).slice(0, 3);
          setAnnouncements(active);
        }
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
      }
    }
    fetchAnnouncements();
  }, []);

  if (announcements.length === 0 || !isVisible) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-white rounded-[32px] p-1 shadow-xl shadow-gray-200/50 border border-gray-100"
      >
        <div className="flex flex-col lg:flex-row items-stretch">
          {/* Label Section - NOW WHITE */}
          <div className="bg-white p-4 lg:p-6 flex items-center gap-3 lg:rounded-l-[31px] rounded-t-[31px] lg:rounded-tr-none shrink-0 border-b lg:border-b-0 lg:border-r border-gray-50">
            <div className="w-10 h-10 bg-[#27ae60]/10 rounded-xl flex items-center justify-center border border-[#27ae60]/20">
              <MegaphoneIcon className="w-6 h-6 text-[#27ae60]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#27ae60]/60">Update</span>
              <span className="text-sm font-black text-[#0c1a30] uppercase tracking-wider">Pengumuman</span>
            </div>
          </div>

          {/* List Section - WHITE */}
          <div className="flex-grow p-4 lg:p-6 flex flex-col gap-4 overflow-hidden">
            <div className="flex flex-col gap-4">
              {announcements.map((ann) => (
                <div key={ann.id} className="flex items-start lg:items-center justify-between gap-4 group">
                  <div className="flex items-start lg:items-center gap-3 min-w-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#27ae60] mt-2 lg:mt-0 shrink-0 animate-pulse" />
                    <h3 className="text-sm md:text-base font-bold text-[#0c1a30] hover:text-[#27ae60] transition-colors line-clamp-1">
                      {ann.title}
                    </h3>
                  </div>
                  <Link 
                    href="/berita" 
                    className="text-[10px] font-black text-[#27ae60] hover:underline shrink-0 whitespace-nowrap uppercase tracking-widest"
                  >
                    Detail
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Close Button Section - WHITE */}
          <div className="border-t lg:border-t-0 lg:border-l border-gray-100 flex items-center justify-center p-4">
            <button 
              onClick={() => setIsVisible(false)}
              className="p-3 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-2xl transition-all border border-gray-100"
              aria-label="Close"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
