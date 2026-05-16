'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

type Statistic = {
  id: number;
  label: string;
  value: string;
  unit: string;
  growth: string | null;
  order: number;
};

export default function StatisticsManagementPage() {
  const [stats, setStats] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Statistic | null>(null);
  const [statsTitle, setStatsTitle] = useState('Data Semester II 2025');
  const [formData, setFormData] = useState({
    label: '',
    value: '',
    unit: 'jiwa',
    growth: '',
    order: 0,
  });

  useEffect(() => {
    fetchStats();
    fetchSettings();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/statistics');
      const data = await res.json();
      if (Array.isArray(data)) setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings?key=stats_title');
      const data = await res.json();
      if (data.value) setStatsTitle(data.value);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTitle = async () => {
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'stats_title', value: statsTitle }),
      });
      alert('Judul statistik berhasil diperbarui!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingItem ? `/api/statistics/${editingItem.id}` : '/api/statistics';
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
        setFormData({ label: '', value: '', unit: 'jiwa', growth: '', order: 0 });
        fetchStats();
      }
    } catch (error) {
      console.error('Failed to save statistic:', error);
    }
  };

  const handleEdit = (item: Statistic) => {
    setEditingItem(item);
    setFormData({
      label: item.label,
      value: item.value,
      unit: item.unit,
      growth: item.growth || '',
      order: item.order,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Hapus data statistik ini?')) {
      try {
        const res = await fetch(`/api/statistics/${id}`, { method: 'DELETE' });
        if (res.ok) fetchStats();
      } catch (error) {
        console.error('Failed to delete statistic:', error);
      }
    }
  };

  return (
    <div className="p-0 md:p-8 space-y-0 md:space-y-6 font-sans min-h-screen bg-gray-50/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-[14px] md:p-6 md:rounded-2xl shadow-sm border-b md:border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>
            Manajemen Statistik
          </h1>
          <p className="text-sm text-gray-500">Kelola data kependudukan yang tampil di beranda.</p>
        </div>
        <button 
          onClick={() => {
            setEditingItem(null);
            setFormData({ label: '', value: '', unit: 'jiwa', growth: '', order: stats.length });
            setIsModalOpen(true);
          }}
          className="w-full sm:w-auto bg-[#27ae60] hover:bg-[#1e8449] text-white transition-all duration-300 rounded-xl px-5 py-3 text-sm font-bold shadow-lg shadow-green-100 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Tambah Data
        </button>
      </div>

      <div className="px-0 py-4 md:p-0 space-y-4 md:space-y-6">
        {/* Title Setting */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-end gap-4">
          <div className="flex-grow">
            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Judul Sekunder (Contoh: Data Semester II 2025)</label>
            <input 
              type="text" 
              value={statsTitle}
              onChange={(e) => setStatsTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#27ae60]"
            />
          </div>
          <button 
            onClick={handleUpdateTitle}
            className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-black transition-all"
          >
            Update Judul
          </button>
        </div>

        {/* Stats Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px]">Label</th>
                  <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px]">Nilai</th>
                  <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px]">Satuan</th>
                  <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px]">Pertumbuhan</th>
                  <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">Memuat data...</td></tr>
                ) : stats.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">Belum ada data statistik.</td></tr>
                ) : (
                  stats.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-5 font-bold text-gray-900">{item.label}</td>
                      <td className="px-6 py-5 font-mono text-gray-600">{item.value}</td>
                      <td className="px-6 py-5">{item.unit}</td>
                      <td className="px-6 py-5">
                        {item.growth ? (
                          <span className="bg-[#27ae60]/10 text-[#27ae60] text-[10px] font-bold px-2 py-1 rounded">
                            {item.growth}
                          </span>
                        ) : '-'}
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
            <h2 className="text-xl font-bold">{editingItem ? 'Edit Data' : 'Tambah Data'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Label (Contoh: Total Penduduk)</label>
                <input 
                  type="text" 
                  value={formData.label}
                  onChange={(e) => setFormData({...formData, label: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60]"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Nilai (Contoh: 1.132.341)</label>
                  <input 
                    type="text" 
                    value={formData.value}
                    onChange={(e) => setFormData({...formData, value: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Satuan (Contoh: jiwa/KK)</label>
                  <input 
                    type="text" 
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Pertumbuhan (Contoh: +0.8%)</label>
                <input 
                  type="text" 
                  value={formData.growth}
                  onChange={(e) => setFormData({...formData, growth: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60]"
                  placeholder="Kosongkan jika tidak ada"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Urutan Tampil</label>
                <input 
                  type="number" 
                  value={formData.order}
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60]"
                />
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
