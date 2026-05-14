'use client';

import * as React from 'react';
import Link from 'next/link';

const newsList = [
  {
    id: 1,
    title: 'Disdukcapil Lamtim Luncurkan Inovasi PUAKHI untuk Jemput Bola IKD',
    description: 'Upaya percepatan kepemilikan Identitas Kependudukan Digital (IKD) di seluruh desa Lampung Timur.',
    tag: 'PRESS RELEASE',
    tagColor: 'bg-[#27ae60] text-white', // Green
    date: '10 April 2025',
    image: '/images/inovasi/puakhi.avif',
    featured: true
  },
  {
    id: 2,
    title: 'Perekaman KTP-el Pemula di Sekolah Capai Target 90%',
    tag: 'NEWS',
    tagColor: 'bg-[#27ae60]/10 text-[#27ae60]', // Light Green with Green text
    date: '10 April 2025',
    image: '/images/inovasi/lamtim_ceria.avif',
    featured: false
  },
  {
    id: 3,
    title: 'Kolaborasi Isbath Nikah Terpadu Berhasil Terbitkan 100 Buku Nikah',
    tag: 'NEWS',
    tagColor: 'bg-[#27ae60]/10 text-[#27ae60]',
    date: '5 April 2025',
    image: '/images/inovasi/isbath_nikah.avif',
    featured: false
  },
  {
    id: 4,
    title: 'Layanan SILAMTIM BERJAYA Kini Bisa Diakses Lewat Aplikasi Mobile',
    tag: 'UPDATE',
    tagColor: 'bg-[#27ae60]/10 text-[#27ae60]',
    date: '2 April 2025',
    image: '/images/inovasi/silamtim_berjaya.avif',
    featured: false
  }
];

export default function LatestNews() {
  const featuredNews = newsList.find(item => item.featured);
  const otherNews = newsList.filter(item => !item.featured);

  return (
    <section className="py-16 bg-white text-gray-900">
      {/* Container widened to max-w-7xl (1280px) to maximize space */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0c1a30] tracking-tight">Berita & Informasi Terbaru</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-2xl">
              Pantau perkembangan layanan kependudukan, kebijakan baru, dan inovasi strategis terkini di Kabupaten Lampung Timur.
            </p>
          </div>
          <Link href="#" className="text-[#27ae60] font-bold hover:text-[#1e8449] transition-colors flex items-center gap-1 text-sm">
            Lihat Semua Berita 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Featured News (Left) - 60% */}
          <div className="lg:col-span-3 relative group cursor-pointer overflow-hidden rounded-3xl h-[400px] lg:h-full shadow-sm">
            <img 
              src={featuredNews?.image} 
              alt={featuredNews?.title} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a30]/90 via-[#0c1a30]/30 to-transparent"></div>
            <div className="absolute bottom-0 p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <span className={`${featuredNews?.tagColor} text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wide`}>
                  {featuredNews?.tag}
                </span>
                <span className="text-white/70 text-xs font-medium">{featuredNews?.date}</span>
              </div>
              <h3 className="text-2xl font-extrabold mb-2 group-hover:text-[#27ae60] transition-colors leading-tight">
                {featuredNews?.title}
              </h3>
              <p className="text-white/70 text-sm line-clamp-2 font-medium">
                {featuredNews?.description}
              </p>
            </div>
          </div>

          {/* Other News List (Right) - 40% */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            {otherNews.map(item => (
              <div 
                key={item.id} 
                className="flex gap-4 group cursor-pointer border border-gray-100 rounded-2xl p-4 hover:border-[#27ae60] transition-all duration-300 bg-white hover:shadow-md"
              >
                <div className="w-40 h-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-50">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className={`${item.tagColor} text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide`}>
                        {item.tag}
                      </span>
                      <span className="text-gray-400 text-xs font-medium">{item.date}</span>
                    </div>
                    <h4 className={`text-sm font-bold group-hover:text-[#27ae60] transition-colors line-clamp-2 leading-snug text-[#0c1a30]`}>
                      {item.title}
                    </h4>
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
