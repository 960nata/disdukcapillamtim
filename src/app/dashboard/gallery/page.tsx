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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPhotos(data);
        } else if (data.error) {
          setError(data.error);
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
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manajemen Galeri</h1>
          <p className="text-xs text-gray-500">Kelola foto-foto kegiatan dan media</p>
        </div>
        <button className="bg-[#27ae60] hover:bg-[#1e8449] text-white transition-all duration-300 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm">
          Upload Foto
        </button>
      </div>

      {loading ? (
        <div className="text-center text-sm text-gray-500 py-10">Loading data...</div>
      ) : error ? (
        <div className="text-center text-sm text-red-500 py-10">{error}</div>
      ) : photos.length === 0 ? (
        <div className="text-center text-sm text-gray-500 py-10">Belum ada foto di galeri.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
              <div className="relative h-48 bg-gray-100">
                <img src={photo.url} alt={photo.caption || 'Foto'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="p-2 bg-white rounded-full text-red-500 hover:text-red-700 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs font-bold text-gray-900 truncate">{photo.caption || 'Tanpa Keterangan'}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  Uploaded: {new Date(photo.createdAt).toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
