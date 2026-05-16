'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Notification = {
  id: number;
  title: string;
  content: string | null;
  link: string | null;
  createdAt: string;
};

export default function NotificationBell({ isScrolled, isDashboard }: { isScrolled?: boolean, isDashboard?: boolean }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      if (Array.isArray(data)) {
        // Simple check for new ones by comparing ID
        if (notifications.length > 0 && data.length > 0 && data[0].id > notifications[0].id) {
          setHasNew(true);
        }
        setNotifications(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => {
          setIsOpen(!isOpen);
          setHasNew(false);
        }}
        className={`p-2 rounded-full transition-all relative ${
          isDashboard
            ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            : isScrolled 
              ? 'text-black/60 hover:text-black hover:bg-black/5' 
              : 'text-white/60 hover:text-white hover:bg-white/10'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        {hasNew && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse border border-white"></span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-50 origin-top-right"
            >
              <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-bold text-gray-900 text-sm">Notifikasi Terbaru</h3>
                <span className="text-[10px] font-bold text-[#27ae60] bg-[#27ae60]/10 px-2 py-0.5 rounded-full">
                  Sistem
                </span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 text-xs italic">
                    Belum ada notifikasi baru.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div key={notif.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <h4 className="text-xs font-bold text-gray-900 mb-1">{notif.title}</h4>
                      <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">{notif.content}</p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-[9px] text-gray-400 font-medium">
                          {new Date(notif.createdAt).toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {notif.link && (
                          <a href={notif.link} className="text-[10px] font-bold text-[#27ae60] hover:underline">Lihat Detail</a>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="p-3 bg-gray-50/50 text-center">
                <button className="text-[10px] font-bold text-gray-400 hover:text-gray-600 transition-colors">
                  Tandai Semua Sudah Dibaca
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
