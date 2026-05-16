'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

type Slider = {
  id: number;
  title: string | null;
  subtitle: string | null;
  imageUrl: string;
  link: string | null;
  order: number;
};

export default function SlidersPage() {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Slider | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
    link: '',
    order: 0,
  });

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = () => {
    setLoading(true);
    fetch('/api/sliders')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSliders(data.sort((a, b) => a.order - b.order));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'order' ? parseInt(value) || 0 : value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (data.url) {
        setFormData((prev) => ({ ...prev, imageUrl: data.url }));
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingItem ? `/api/sliders/${editingItem.id}` : '/api/sliders';
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
        setFormData({ title: '', subtitle: '', imageUrl: '', link: '', order: 0 });
        fetchSliders();
      }
    } catch (error) {
      console.error('Failed to save slider:', error);
    }
  };

  const handleEdit = (item: Slider) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      subtitle: item.subtitle || '',
      imageUrl: item.imageUrl,
      link: item.link || '',
      order: item.order,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus slider ini?')) {
      try {
        const res = await fetch(`/api/sliders/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          fetchSliders();
        }
      } catch (error) {
        console.error('Failed to delete slider:', error);
      }
    }
  };

  return (
    <div className="p-0 md:p-8 space-y-0 md:space-y-6 font-sans min-h-screen bg-gray-50/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-[14px] md:p-6 md:rounded-2xl shadow-sm border-b md:border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            Manajemen Slider Banner
          </h1>
          <p className="text-sm text-gray-500">Kelola banner promosi dan informasi di halaman utama.</p>
        </div>
        <button 
          onClick={() => {
            setEditingItem(null);
            setFormData({ title: '', subtitle: '', imageUrl: '', link: '', order: sliders.length });
            setIsModalOpen(true);
          }}
          className="w-full sm:w-auto bg-[#27ae60] hover:bg-[#1e8449] text-white transition-all duration-300 rounded-xl px-5 py-3 text-sm font-bold shadow-lg shadow-green-100 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Tambah Slider
        </button>
      </div>

      <div className="px-[14px] py-4 md:p-0 space-y-4 md:space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px]">Preview</th>
                  <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px]">Informasi</th>
                  <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px]">Urutan</th>
                  <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-[#27ae60] border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-gray-500 font-medium">Memuat data slider...</span>
                      </div>
                    </td>
                  </tr>
                ) : sliders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-medium">
                      Belum ada data slider.
                    </td>
                  </tr>
                ) : (
                  sliders.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="w-24 aspect-video bg-gray-100 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                          <img src={item.imageUrl} alt={item.title || 'Slider'} className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 group-hover:text-[#27ae60] transition-colors">{item.title || 'Tanpa Judul'}</span>
                          <span className="text-xs text-gray-400 line-clamp-1">{item.subtitle || 'Tanpa Sub-judul'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg">#{item.order}</span>
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
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-900">
                {editingItem ? 'Edit Slider' : 'Tambah Slider'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col items-center gap-4">
                <div className="w-full aspect-[21/9] bg-white rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 relative group flex items-center justify-center">
                  {formData.imageUrl ? (
                    <>
                      <img src={formData.imageUrl} alt="Slider" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <label className="bg-white text-gray-900 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer">Ganti Gambar</label>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <svg className="w-10 h-10 text-gray-300 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <label className="text-sm font-bold text-gray-400 cursor-pointer">Pilih Gambar Slider</label>
                    </div>
                  )}
                  <input type="file" onChange={handleImageUpload} className="hidden" id="slider-image" accept="image/*" />
                  <label htmlFor="slider-image" className="absolute inset-0 cursor-pointer"></label>
                  {uploading && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-gray-400 font-medium">Rekomendasi rasio 21:9 atau 16:9 untuk tampilan terbaik.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Judul Utama</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 text-sm bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold"
                    placeholder="Masukkan judul..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Sub Judul</label>
                  <input 
                    type="text" 
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 text-sm bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold"
                    placeholder="Masukkan sub judul..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Link URL (Opsional)</label>
                  <input 
                    type="url" 
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 text-sm bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold"
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Urutan Tampil</label>
                  <input 
                    type="number" 
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 text-sm bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold"
                  />
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
                  disabled={uploading || !formData.imageUrl}
                  className={`flex-[2] ${uploading || !formData.imageUrl ? 'bg-gray-400' : 'bg-[#27ae60] hover:bg-[#1e8449]'} text-white rounded-2xl py-4 text-sm font-black shadow-lg shadow-green-100 transition-all hover:scale-[1.02] active:scale-[0.98]`}
                >
                  {editingItem ? 'Simpan Perubahan' : 'Buat Slider Baru'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
