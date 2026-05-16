'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

type Announcement = {
  id: number;
  title: string;
  content: string | null;
  type: string;
  isActive: boolean;
  createdAt: string;
};

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Announcement | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'info',
    isActive: true,
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/announcements');
      const data = await res.json();
      if (Array.isArray(data)) setAnnouncements(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingItem ? `/api/announcements/${editingItem.id}` : '/api/announcements';
    const method = editingItem ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingItem(null);
        setFormData({ title: '', content: '', type: 'info', isActive: true });
        fetchAnnouncements();
      }
    } catch (error) {
      console.error('Failed to save announcement:', error);
    }
  };

  const handleEdit = (item: Announcement) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      content: item.content || '',
      type: item.type,
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Hapus pengumuman ini?')) {
      try {
        const res = await fetch(`/api/announcements/${id}`, { method: 'DELETE' });
        if (res.ok) fetchAnnouncements();
      } catch (error) {
        console.error('Failed to delete announcement:', error);
      }
    }
  };

  return (
    <div className="p-0 md:p-8 space-y-0 md:space-y-6 font-sans min-h-screen bg-gray-50/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-[14px] md:p-6 md:rounded-2xl shadow-sm border-b md:border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            Manajemen Pengumuman
          </h1>
          <p className="text-sm text-gray-500">Kelola info penting yang muncul di halaman depan.</p>
        </div>
        <button 
          onClick={() => {
            setEditingItem(null);
            setFormData({ title: '', content: '', type: 'info', isActive: true });
            setIsModalOpen(true);
          }}
          className="w-full sm:w-auto bg-[#27ae60] hover:bg-[#1e8449] text-white transition-all duration-300 rounded-xl px-5 py-3 text-sm font-bold shadow-lg shadow-green-100 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Tambah Pengumuman
        </button>
      </div>

      <div className="px-0 py-4 md:p-0 space-y-4 md:space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px]">Judul</th>
                  <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px]">Tipe</th>
                  <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px]">Status</th>
                  <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-500">Memuat data...</td></tr>
                ) : announcements.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-500">Belum ada pengumuman.</td></tr>
                ) : (
                  announcements.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="font-bold text-gray-900">{item.title}</div>
                        <div className="text-[10px] text-gray-400 mt-1 truncate max-w-xs">{item.content}</div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${
                          item.type === 'danger' ? 'bg-red-50 text-red-600' : 
                          item.type === 'warning' ? 'bg-orange-50 text-orange-600' : 
                          'bg-blue-50 text-blue-600'
                        }`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`w-3 h-3 rounded-full inline-block ${item.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                      </td>
                      <td className="px-6 py-5 text-right space-x-2">
                        <button onClick={() => handleEdit(item)} className="text-blue-500 font-bold text-xs hover:underline">Edit</button>
                        <button onClick={() => handleDelete(item.id)} className="text-red-500 font-bold text-xs hover:underline">Hapus</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-6">
            <h2 className="text-xl font-bold">{editingItem ? 'Edit Pengumuman' : 'Tambah Pengumuman'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Judul</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Konten Singkat</label>
                <textarea 
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] h-24"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Tipe</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60]"
                  >
                    <option value="info">Info (Biru)</option>
                    <option value="warning">Peringatan (Oranye)</option>
                    <option value="danger">Bahaya (Merah)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Status</label>
                  <select 
                    value={formData.isActive ? 'true' : 'false'}
                    onChange={(e) => setFormData({...formData, isActive: e.target.value === 'true'})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60]"
                  >
                    <option value="true">Aktif</option>
                    <option value="false">Nonaktif</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 font-bold text-gray-400">Batal</button>
                <button type="submit" className="flex-1 bg-[#27ae60] text-white font-bold py-3 rounded-2xl shadow-lg">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
