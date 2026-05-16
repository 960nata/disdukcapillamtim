'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';


type Photo = {
  id: number;
  url: string;
  title: string | null;
  tags: string | null;
};

const fallbackRow1 = [
  { id: -1, url: '/images/foto_kegiatan/pelayanan_ktp.avif', title: 'Pelayanan KTP', tags: 'Pelayanan' },
  { id: -2, url: '/images/foto_kegiatan/jemput_bola.avif', title: 'Jemput Bola Adminduk', tags: 'Kegiatan' },
  { id: -3, url: '/images/foto_kegiatan/rapat_koordinasi.avif', title: 'Rapat Koordinasi', tags: 'Internal' },
  { id: -4, url: '/images/foto_kegiatan/penyerahan_ktp.avif', title: 'Penyerahan KTP-el', tags: 'Pelayanan' },
  { id: -5, url: '/images/foto_kegiatan/ruang_tunggu.avif', title: 'Ruang Tunggu Nyaman', tags: 'Fasilitas' },
  { id: -6, url: '/images/foto_kegiatan/penjelasan_prosedur.avif', title: 'Penjelasan Prosedur', tags: 'Edukasi' },
];

const fallbackRow2 = [
  { id: -7, url: '/images/foto_kegiatan/penyerahan_kia.avif', title: 'Penyerahan KIA', tags: 'Pelayanan' },
  { id: -8, url: '/images/foto_kegiatan/sosialisasi_sekolah.avif', title: 'Sosialisasi di Sekolah', tags: 'Edukasi' },
  { id: -9, url: '/images/foto_kegiatan/verifikasi_berkas.avif', title: 'Verifikasi Berkas', tags: 'Pelayanan' },
  { id: -10, url: '/images/foto_kegiatan/kantor_luar.avif', title: 'Kantor Disdukcapil', tags: 'Fasilitas' },
  { id: -11, url: '/images/foto_kegiatan/pelayanan_online.avif', title: 'Pelayanan Online', tags: 'Digital' },
  { id: -12, url: '/images/foto_kegiatan/membantu_lansia.avif', title: 'Pelayanan Prioritas', tags: 'Pelayanan' },
];

export default function GallerySection() {
  const [row1, setRow1] = useState<Photo[]>([]);
  const [row2, setRow2] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (data.gallery && data.featuredIds && data.featuredIds.length > 0) {
          // Filter only featured photos
          const featuredPhotos = data.gallery.filter((p: any) => 
            data.featuredIds.includes(p.id)
          );
          
          if (featuredPhotos.length > 0) {
            // Split into two rows for the marquee
            const mid = Math.ceil(featuredPhotos.length / 2);
            setRow1(featuredPhotos.slice(0, mid));
            setRow2(featuredPhotos.slice(mid));
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch gallery:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  // Use fallback if database is empty
  const displayRow1 = row1.length > 0 ? row1 : fallbackRow1;
  const displayRow2 = row2.length > 0 ? row2 : fallbackRow2;

  // Duplicate items for seamless loop
  const fullRow1 = [...displayRow1, ...displayRow1, ...displayRow1, ...displayRow1];
  const fullRow2 = [...displayRow2, ...displayRow2, ...displayRow2, ...displayRow2];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 mt-2 mb-4">Dokumentasi Kegiatan Disdukcapil</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Momen-momen pelayanan, kegiatan lapangan, dan koordinasi yang kami lakukan untuk memberikan pelayanan terbaik bagi masyarakat Lampung Timur.
        </p>
      </div>

      {/* Wrapper with consistent gap */}
      <div className="flex flex-col gap-6">
        
        {/* Carousel Row 1 (Moves Left) */}
        {row1.length > 0 && (
          <div className="relative flex overflow-x-hidden">
            <div className="animate-marquee flex gap-6 whitespace-nowrap">
              {fullRow1.map((item, index) => (
                <div key={`${item.id}-${index}`} className="inline-block w-[300px] flex-shrink-0 group">
                  <div className="relative h-[200px] rounded-2xl overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <img
                      src={item.url}
                      alt={item.title || 'Foto Kegiatan'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <span className="text-xs font-bold text-[#27ae60] bg-white/90 px-2 py-0.5 rounded-full w-fit mb-1">
                        {item.tags || 'Kegiatan'}
                      </span>
                      <h3 className="text-white font-bold text-sm whitespace-normal">
                        {item.title || 'Dokumentasi'}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Carousel Row 2 (Moves Right) */}
        {row2.length > 0 && (
          <div className="relative flex overflow-x-hidden">
            <div className="animate-marquee-reverse flex gap-6 whitespace-nowrap">
              {fullRow2.map((item, index) => (
                <div key={`${item.id}-${index}`} className="inline-block w-[300px] flex-shrink-0 group">
                  <div className="relative h-[200px] rounded-2xl overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <img
                      src={item.url}
                      alt={item.title || 'Foto Kegiatan'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <span className="text-xs font-bold text-[#27ae60] bg-white/90 px-2 py-0.5 rounded-full w-fit mb-1">
                        {item.tags || 'Kegiatan'}
                      </span>
                      <h3 className="text-white font-bold text-sm whitespace-normal">
                        {item.title || 'Dokumentasi'}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>
    </section>
  );
}
