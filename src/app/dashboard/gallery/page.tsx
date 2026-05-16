'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Photo = {
  id: number;
  url: string;
  title: string | null;
  tags: string | null;
  caption: string | null;
  createdAt: string;
};

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [featuredIds, setFeaturedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<Partial<Photo>>({
    url: '',
    title: '',
    tags: 'Kegiatan',
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (data.gallery) {
          setPhotos(data.gallery);
          setFeaturedIds(data.featuredIds || []);
        } else {
          setError('Format data tidak valid');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Gagal memuat data dari server');
        setLoading(false);
      });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setCurrentPhoto((prev) => ({ ...prev, url: data.url }));
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Gagal mengunggah foto');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPhoto.url) {
      alert('Silakan pilih foto terlebih dahulu');
      return;
    }

    setSaving(true);
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `/api/gallery/${currentPhoto.id}` : '/api/gallery';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentPhoto),
      });

      if (res.ok) {
        fetchData();
        setIsModalOpen(false);
        setCurrentPhoto({ url: '', title: '', tags: 'Kegiatan' });
      }
    } catch (err) {
      console.error('Save failed:', err);
      alert('Gagal menyimpan foto');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus foto ini?')) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setPhotos((prev) => prev.filter((p) => p.id !== id));
        setFeaturedIds((prev) => prev.filter((fid) => fid !== id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Gagal menghapus foto');
    }
  };

  const toggleFeatured = (id: number) => {
    setFeaturedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      } else {
        if (prev.length >= 40) {
          alert('Maksimal 40 foto yang dapat dipilih untuk Dokumentasi Kegiatan.');
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  const handleSaveFeatured = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featuredIds }),
      });
      if (res.ok) {
        alert('Pengaturan Dokumentasi Kegiatan berhasil disimpan!');
      }
    } catch (error) {
      console.error('Failed to save featured photos:', error);
      alert('Gagal menyimpan pengaturan.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-0 md:p-8 space-y-0 md:space-y-6 font-sans min-h-screen bg-gray-50/50">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-[14px] md:p-6 md:rounded-2xl shadow-sm border-b md:border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            Manajemen Galeri
          </h1>
          <p className="text-sm text-gray-500">Upload foto kegiatan, beri judul/tag, dan pilih untuk carousel.</p>
        </div>
        <div className="flex w-full sm:w-auto gap-2">
          <button 
            onClick={() => {
              setIsEditing(false);
              setCurrentPhoto({ url: '', title: '', tags: 'Kegiatan' });
              setIsModalOpen(true);
            }}
            className="flex-1 sm:flex-none bg-[#27ae60] hover:bg-[#1e8449] text-white transition-all duration-300 rounded-xl px-5 py-3 text-sm font-bold shadow-lg shadow-green-100 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Tambah Foto
          </button>
          <button 
            onClick={handleSaveFeatured}
            disabled={saving}
            className={`flex-1 sm:flex-none ${saving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-all duration-300 rounded-xl px-5 py-3 text-sm font-bold shadow-lg shadow-blue-100 flex items-center justify-center gap-2`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            {saving ? 'Menyimpan...' : 'Simpan Pilihan'}
          </button>
        </div>
      </div>

      <div className="px-[14px] py-4 md:p-0 space-y-4 md:space-y-6">
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold shadow-sm">
            {featuredIds.length}
          </div>
          <div className="text-sm text-blue-800 font-medium">
            Foto terpilih untuk Dokumentasi Kegiatan (Maksimal 40)
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-[#27ae60] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-500 font-medium">Memuat galeri...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-medium bg-white rounded-3xl border border-red-50">
            {error}
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-medium bg-white rounded-3xl border border-gray-100">
            Belum ada foto di galeri.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {photos.map((photo) => {
              const isFeatured = featuredIds.includes(photo.id);
              return (
                <div 
                  key={photo.id} 
                  className={`relative aspect-square rounded-2xl overflow-hidden group transition-all duration-300 border-2 ${
                    isFeatured ? 'border-blue-500 ring-4 ring-blue-100' : 'border-white hover:border-gray-200'
                  }`}
                >
                  <img 
                    src={photo.url} 
                    alt={photo.title || 'Foto'} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  {/* Overlay for selection */}
                  <div 
                    onClick={() => toggleFeatured(photo.id)}
                    className={`absolute inset-0 cursor-pointer transition-opacity duration-300 flex items-center justify-center ${
                      isFeatured ? 'bg-blue-600/20 opacity-100' : 'bg-black/20 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 ${
                      isFeatured ? 'bg-blue-600 text-white scale-110' : 'bg-white text-gray-400 group-hover:scale-100 scale-75'
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                  </div>

                  {/* Actions (Edit/Delete) */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditing(true);
                        setCurrentPhoto(photo);
                        setIsModalOpen(true);
                      }}
                      className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-blue-600 hover:bg-white shadow-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(photo.id);
                      }}
                      className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-red-600 hover:bg-white shadow-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>

                  {/* Info Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#2ecc71] bg-white/10 px-2 py-0.5 rounded-full mb-1 inline-block">
                      {photo.tags || 'Kegiatan'}
                    </span>
                    <p className="text-[11px] text-white font-bold truncate">
                      {photo.title || 'Tanpa Judul'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Tambah/Edit */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-xl font-bold text-gray-900">
                  {isEditing ? 'Edit Informasi Foto' : 'Tambah Foto Baru'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
                {/* Upload Section */}
                {!isEditing && (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Foto</label>
                    {currentPhoto.url ? (
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-100">
                        <img src={currentPhoto.url} className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => setCurrentPhoto(prev => ({ ...prev, url: '' }))}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg shadow-lg"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-gray-200 rounded-2xl hover:border-[#27ae60] hover:bg-green-50 transition-all cursor-pointer group">
                        {uploading ? (
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 border-3 border-[#27ae60] border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm text-gray-500 font-medium">Mengunggah...</span>
                          </div>
                        ) : (
                          <>
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                            </div>
                            <span className="text-sm text-gray-500 font-bold">Pilih Foto Kegiatan</span>
                            <span className="text-[10px] text-gray-400 mt-1 uppercase">JPG, PNG, WEBP (Maks 5MB)</span>
                          </>
                        )}
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                      </label>
                    )}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Judul Gambar</label>
                    <input 
                      type="text" 
                      value={currentPhoto.title || ''}
                      onChange={(e) => setCurrentPhoto(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Contoh: Rapat Koordinasi Tahunan"
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#27ae60]/20 focus:border-[#27ae60] transition-all font-bold text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Tag / Kategori</label>
                    <select 
                      value={currentPhoto.tags || 'Kegiatan'}
                      onChange={(e) => setCurrentPhoto(prev => ({ ...prev, tags: e.target.value }))}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#27ae60]/20 focus:border-[#27ae60] transition-all font-bold text-gray-900 appearance-none"
                    >
                      <option value="Pelayanan">Pelayanan</option>
                      <option value="Kegiatan">Kegiatan</option>
                      <option value="Edukasi">Edukasi</option>
                      <option value="Internal">Internal</option>
                      <option value="Fasilitas">Fasilitas</option>
                      <option value="Digital">Digital</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all border border-gray-100"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    disabled={saving}
                    className="flex-1 px-6 py-4 bg-[#27ae60] text-white rounded-2xl font-bold hover:bg-[#1e8449] transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2"
                  >
                    {saving ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                    )}
                    {saving ? 'Menyimpan...' : 'Simpan Foto'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
