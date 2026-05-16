'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

type Innovation = {
  id: number;
  name: string;
  desc: string;
  status: string;
  url: string | null;
  createdAt: string;
};

export default function InnovationsPage() {
  const [innovations, setInnovations] = useState<Innovation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Innovation | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    status: 'Aktif',
    url: '',
  });

  useEffect(() => {
    fetchInnovations();
  }, []);

  const fetchInnovations = () => {
    setLoading(true);
    fetch('/api/innovations')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setInnovations(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingItem ? `/api/innovations/${editingItem.id}` : '/api/innovations';
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
        setFormData({ name: '', desc: '', status: 'Aktif', url: '' });
        fetchInnovations();
      }
    } catch (error) {
      console.error('Failed to save innovation:', error);
    }
  };

  const handleEdit = (item: Innovation) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      desc: item.desc,
      status: item.status,
      url: item.url || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus inovasi ini?')) {
      try {
        const res = await fetch(`/api/innovations/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          fetchInnovations();
        }
      } catch (error) {
        console.error('Failed to delete innovation:', error);
      }
    }
  };

  return (
    <div className="p-[14px] md:p-8 space-y-6 font-sans min-h-screen bg-gray-50/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Manajemen Inovasi
          </h1>
          <p className="text-sm text-gray-500">Kelola inovasi pelayanan Disdukcapil.</p>
        </div>
        <button 
          onClick={() => {
            setEditingItem(null);
            setFormData({ name: '', desc: '', status: 'Aktif', url: '' });
            setIsModalOpen(true);
          }}
          className="w-full sm:w-auto bg-[#27ae60] hover:bg-[#1e8449] text-white transition-all duration-300 rounded-xl px-5 py-3 text-sm font-bold shadow-lg shadow-green-100 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Tambah Inovasi
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px]">Nama Inovasi</th>
                <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px]">Status</th>
                <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px] text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-[#27ae60] border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-gray-500 font-medium">Memuat data...</span>
                    </div>
                  </td>
                </tr>
              ) : innovations.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-gray-500 font-medium">
                    Belum ada data inovasi.
                  </td>
                </tr>
              ) : (
                innovations.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 group-hover:text-[#27ae60] transition-colors">{item.name}</span>
                        <span className="text-xs text-gray-400 line-clamp-1">{item.desc}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${
                        item.status === 'Aktif' 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                          : 'bg-yellow-50 text-yellow-600 border border-yellow-100'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all border border-transparent hover:border-emerald-100"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-900">
                {editingItem ? 'Edit Inovasi' : 'Tambah Inovasi'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Nama Inovasi</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 text-sm bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold"
                  placeholder="Masukkan nama inovasi..."
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Deskripsi Singkat</label>
                <textarea 
                  name="desc"
                  value={formData.desc}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 text-sm bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-medium h-32 resize-none"
                  placeholder="Jelaskan tentang inovasi ini..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Link URL (Opsional)</label>
                  <input 
                    type="url" 
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 text-sm bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold"
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Status</label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 text-sm bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Perbaikan">Perbaikan</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors"
                >
                  Batalkan
                </button>
                <button 
                  type="submit"
                  className="flex-[2] bg-[#27ae60] hover:bg-[#1e8449] text-white rounded-2xl py-4 text-sm font-black shadow-lg shadow-green-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {editingItem ? 'Simpan Perubahan' : 'Tambah Inovasi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
