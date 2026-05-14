'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import Image from "next/image";

export default function BeritaPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      
      {/* Hero Section Wrapper with Padding */}
      <div className="p-[20px]">
        {/* Hero Section Inner with Border Radius */}
        <div className="relative h-[450px] flex items-center justify-center overflow-hidden rounded-[20px]">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/news/hero_berita.avif" 
              alt="Berita Disdukcapil" 
              fill 
              className="object-cover"
              priority
            />
            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center text-white px-4 mt-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Berita & Pengumuman</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Ikuti kabar terkini, pengumuman resmi, dan liputan kegiatan terbaru dari Dinas Kependudukan dan Pencatatan Sipil Kabupaten Lampung Timur.
            </p>
          </div>
        </div>
      </div>
      
      <main className="flex-grow pt-10 pb-12">
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-[#0c1a30] tracking-tight">Berita & Informasi Terbaru</h2>
                <p className="text-gray-500 text-sm mt-2 max-w-2xl">
                  Pantau perkembangan layanan kependudukan, kebijakan baru, dan inovasi strategis terkini di Kabupaten Lampung Timur.
                </p>
              </div>
            </div>

            {/* 3 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white border border-gray-100 rounded-[20px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <img src="/images/inovasi/puakhi.avif" alt="Inovasi PUAKHI" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 bg-[#27ae60] text-white text-xs font-bold px-3 py-1 rounded-lg uppercase">Press Release</span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-gray-400 text-xs font-medium mb-2">10 April 2025</span>
                  <h3 className="text-lg font-bold text-[#0c1a30] mb-2 group-hover:text-[#27ae60] transition-colors line-clamp-2">Disdukcapil Lamtim Luncurkan Inovasi PUAKHI untuk Jemput Bola IKD</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mt-auto">Upaya percepatan kepemilikan Identitas Kependudukan Digital (IKD) di seluruh desa Lampung Timur.</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-gray-100 rounded-[20px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <img src="/images/inovasi/lamtim_ceria.avif" alt="Perekaman KTP-el" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 bg-[#27ae60]/10 text-[#27ae60] text-xs font-bold px-3 py-1 rounded-lg uppercase">News</span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-gray-400 text-xs font-medium mb-2">10 April 2025</span>
                  <h3 className="text-lg font-bold text-[#0c1a30] mb-2 group-hover:text-[#27ae60] transition-colors line-clamp-2">Perekaman KTP-el Pemula di Sekolah Capai Target 90%</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mt-auto">Dinas Kependudukan dan Pencatatan Sipil terus menggenjot perekaman KTP-el bagi pemula di sekolah-sekolah.</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-gray-100 rounded-[20px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <img src="/images/inovasi/isbath_nikah.avif" alt="Isbath Nikah" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 bg-[#27ae60]/10 text-[#27ae60] text-xs font-bold px-3 py-1 rounded-lg uppercase">News</span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-gray-400 text-xs font-medium mb-2">5 April 2025</span>
                  <h3 className="text-lg font-bold text-[#0c1a30] mb-2 group-hover:text-[#27ae60] transition-colors line-clamp-2">Kolaborasi Isbath Nikah Terpadu Berhasil Terbitkan 100 Buku Nikah</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mt-auto">Kerja sama antara Disdukcapil, Pengadilan Agama, dan Kemenag Lampung Timur.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="mt-12">
          <ContactSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
