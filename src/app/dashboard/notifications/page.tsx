'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

type Notification = {
  id: number;
  title: string;
  content: string | null;
  link: string | null;
  isRead: boolean;
  createdAt: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    link: '',
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      if (Array.isArray(data)) setNotifications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ title: '', content: '', link: '' });
        fetchNotifications();
        alert('Notifikasi berhasil dikirim!');
      }
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  };

  return (
    <div className="p-0 md:p-8 space-y-0 md:space-y-6 font-sans min-h-screen bg-gray-50/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-[14px] md:p-6 md:rounded-2xl shadow-sm border-b md:border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            Kirim Notifikasi
          </h1>
          <p className="text-sm text-gray-500">Kirim pemberitahuan langsung ke semua pengunjung situs.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto bg-[#27ae60] hover:bg-[#1e8449] text-white transition-all duration-300 rounded-xl px-5 py-3 text-sm font-bold shadow-lg shadow-green-100 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Buat Notifikasi
        </button>
      </div>

      <div className="px-0 py-4 md:p-0 space-y-4 md:space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 text-center text-gray-500">
          <p className="text-sm">Riwayat notifikasi yang pernah dikirim muncul di bawah ini.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notifications.map((notif) => (
            <div key={notif.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:border-[#27ae60] transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#27ae60]"></div>
              <h3 className="font-bold text-gray-900 mb-1">{notif.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-2 mb-3">{notif.content}</p>
              <div className="text-[10px] text-gray-400 font-medium">
                {new Date(notif.createdAt).toLocaleString('id-ID')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-6 shadow-2xl">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              Push Notifikasi Baru
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Subjek / Judul</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Misal: Update Sistem Pemeliharaan"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] font-medium"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Pesan Notifikasi</label>
                <textarea 
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="Isi pesan notifikasi singkat..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] h-24 font-medium"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Link Tujuan (Opsional)</label>
                <input 
                  type="text" 
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  placeholder="https://..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] font-medium"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-sm font-black text-gray-400">Tutup</button>
                <button type="submit" className="flex-[2] bg-[#27ae60] hover:bg-[#1e8449] text-white font-black py-4 rounded-2xl shadow-lg shadow-green-100 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Kirim Notifikasi Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
