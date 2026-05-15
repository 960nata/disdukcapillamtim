'use client';

import * as React from 'react';
import Image from 'next/image';

const row1Items = [
  { image: '/images/foto_kegiatan/pelayanan_ktp.avif', title: 'Pelayanan KTP', tag: 'Pelayanan' },
  { image: '/images/foto_kegiatan/jemput_bola.avif', title: 'Jemput Bola Adminduk', tag: 'Kegiatan' },
  { image: '/images/foto_kegiatan/rapat_koordinasi.avif', title: 'Rapat Koordinasi', tag: 'Internal' },
  { image: '/images/foto_kegiatan/penyerahan_ktp.avif', title: 'Penyerahan KTP-el', tag: 'Pelayanan' },
  { image: '/images/foto_kegiatan/ruang_tunggu.avif', title: 'Ruang Tunggu Nyaman', tag: 'Fasilitas' },
  { image: '/images/foto_kegiatan/penjelasan_prosedur.avif', title: 'Penjelasan Prosedur', tag: 'Edukasi' },
];

const row2Items = [
  { image: '/images/foto_kegiatan/penyerahan_kia.avif', title: 'Penyerahan KIA', tag: 'Pelayanan' },
  { image: '/images/foto_kegiatan/sosialisasi_sekolah.avif', title: 'Sosialisasi di Sekolah', tag: 'Edukasi' },
  { image: '/images/foto_kegiatan/verifikasi_berkas.avif', title: 'Verifikasi Berkas', tag: 'Pelayanan' },
  { image: '/images/foto_kegiatan/kantor_luar.avif', title: 'Kantor Disdukcapil', tag: 'Fasilitas' },
  { image: '/images/foto_kegiatan/pelayanan_online.avif', title: 'Pelayanan Online', tag: 'Digital' },
  { image: '/images/foto_kegiatan/membantu_lansia.avif', title: 'Pelayanan Prioritas', tag: 'Pelayanan' },
];

// Duplicate items for seamless loop
const fullRow1 = [...row1Items, ...row1Items, ...row1Items];
const fullRow2 = [...row2Items, ...row2Items, ...row2Items];

export default function GallerySection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 mt-2 mb-4">Dokumentasi Kegiatan Disdukcapil</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Momen-momen pelayanan, kegiatan lapangan, dan koordinasi yang kami lakukan untuk memberikan pelayanan terbaik bagi masyarakat Lampung Timur.
        </p>
      </div>

      {/* Wrapper with gap-12 to make it more spacious */}
      <div className="flex flex-col gap-12">
        
        {/* Carousel Row 1 (Moves Left) */}
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee flex gap-6 whitespace-nowrap">
            {fullRow1.map((item, index) => (
              <div key={index} className="inline-block w-[300px] flex-shrink-0 group">
                <div className="relative h-[200px] rounded-2xl overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-xs font-bold text-[#27ae60] bg-white/90 px-2 py-0.5 rounded-full w-fit mb-1">{item.tag}</span>
                    <h3 className="text-white font-bold text-sm whitespace-normal">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Row 2 (Moves Right) */}
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee-reverse flex gap-6 whitespace-nowrap">
            {fullRow2.map((item, index) => (
              <div key={index} className="inline-block w-[300px] flex-shrink-0 group">
                <div className="relative h-[200px] rounded-2xl overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-xs font-bold text-[#27ae60] bg-white/90 px-2 py-0.5 rounded-full w-fit mb-1">{item.tag}</span>
                    <h3 className="text-white font-bold text-sm whitespace-normal">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
