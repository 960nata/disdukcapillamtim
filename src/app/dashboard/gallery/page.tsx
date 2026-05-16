'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

type Photo = {
  id: number;
  url: string;
  caption: string | null;
  createdAt: string;
};

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [featuredIds, setFeaturedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="p-[14px] md:p-8 space-y-6 font-sans min-h-screen bg-gray-50/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            Manajemen Galeri
          </h1>
          <p className="text-sm text-gray-500">Pilih maksimal 40 foto untuk ditampilkan di Dokumentasi Kegiatan.</p>
        </div>
        <div className="flex w-full sm:w-auto gap-2">
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
          <span className="text-gray-500 font-medium font-sans">Memuat galeri...</span>
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
                onClick={() => toggleFeatured(photo.id)}
                className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 border-4 ${
                  isFeatured ? 'border-blue-500 ring-4 ring-blue-100 scale-[0.98]' : 'border-white hover:border-gray-200'
                }`}
              >
                <img 
                  src={photo.url} 
                  alt={photo.caption || 'Foto'} 
                  className={`w-full h-full object-cover transition-transform duration-700 ${isFeatured ? 'scale-110 opacity-70' : 'group-hover:scale-110'}`} 
                />
                <div className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center ${
                  isFeatured ? 'bg-blue-600/20 opacity-100' : 'bg-black/20 opacity-0 group-hover:opacity-100'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 ${
                    isFeatured ? 'bg-blue-600 text-white scale-110' : 'bg-white text-gray-400 group-hover:scale-100 scale-75'
                  }`}>
                    {isFeatured ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    )}
                  </div>
                </div>
                {photo.caption && (
                  <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-[10px] text-white font-bold truncate">{photo.caption}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
