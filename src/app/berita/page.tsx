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
      
      <main className="flex-grow pt-10 pb-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Section: Featured + 3 Small Cards */}
          <section className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              
              {/* Featured Card (Left) */}
              <div className="lg:col-span-3 relative group cursor-pointer overflow-hidden rounded-[20px] h-[400px] lg:h-[500px] shadow-sm bg-white">
                <img 
                  src="/images/inovasi/puakhi.avif" 
                  alt="Featured News" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a30]/90 via-[#0c1a30]/30 to-transparent"></div>
                <div className="absolute bottom-0 p-8 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-[#27ae60] text-white text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wide">
                      Press Release
                    </span>
                    <span className="text-white/70 text-xs font-medium">10 April 2025</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-extrabold mb-2 group-hover:text-[#27ae60] transition-colors leading-tight">
                    Disdukcapil Lamtim Luncurkan Inovasi PUAKHI untuk Jemput Bola IKD
                  </h3>
                  <p className="text-white/70 text-sm line-clamp-2 font-medium">
                    Upaya percepatan kepemilikan Identitas Kependudukan Digital (IKD) di seluruh desa Lampung Timur.
                  </p>
                </div>
              </div>

              {/* 3 Small Cards (Right) */}
              <div className="flex flex-col gap-4 lg:col-span-2">
                {/* Small Card 1 */}
                <div className="flex gap-4 group cursor-pointer border border-gray-100 rounded-[15px] p-4 hover:border-[#27ae60] transition-all duration-300 bg-white hover:shadow-md h-[120px]">
                  <div className="w-32 h-full flex-shrink-0 overflow-hidden rounded-lg">
                    <img src="/images/inovasi/lamtim_ceria.avif" alt="News" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-[#27ae60]/10 text-[#27ae60] text-[10px] font-bold px-2 py-0.5 rounded uppercase">News</span>
                        <span className="text-gray-400 text-xs">10 April 2025</span>
                      </div>
                      <h4 className="text-sm font-bold group-hover:text-[#27ae60] transition-colors line-clamp-2 text-[#0c1a30]">
                        Perekaman KTP-el Pemula di Sekolah Capai Target 90%
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Small Card 2 */}
                <div className="flex gap-4 group cursor-pointer border border-gray-100 rounded-[15px] p-4 hover:border-[#27ae60] transition-all duration-300 bg-white hover:shadow-md h-[120px]">
                  <div className="w-32 h-full flex-shrink-0 overflow-hidden rounded-lg">
                    <img src="/images/inovasi/isbath_nikah.avif" alt="News" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-[#27ae60]/10 text-[#27ae60] text-[10px] font-bold px-2 py-0.5 rounded uppercase">News</span>
                        <span className="text-gray-400 text-xs">5 April 2025</span>
                      </div>
                      <h4 className="text-sm font-bold group-hover:text-[#27ae60] transition-colors line-clamp-2 text-[#0c1a30]">
                        Kolaborasi Isbath Nikah Terpadu Berhasil Terbitkan 100 Buku Nikah
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Small Card 3 */}
                <div className="flex gap-4 group cursor-pointer border border-gray-100 rounded-[15px] p-4 hover:border-[#27ae60] transition-all duration-300 bg-white hover:shadow-md h-[120px]">
                  <div className="w-32 h-full flex-shrink-0 overflow-hidden rounded-lg">
                    <img src="/images/inovasi/silamtim_berjaya.avif" alt="News" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-[#27ae60]/10 text-[#27ae60] text-[10px] font-bold px-2 py-0.5 rounded uppercase">Update</span>
                        <span className="text-gray-400 text-xs">2 April 2025</span>
                      </div>
                      <h4 className="text-sm font-bold group-hover:text-[#27ae60] transition-colors line-clamp-2 text-[#0c1a30]">
                        Layanan SILAMTIM BERJAYA Kini Bisa Diakses Lewat Aplikasi Mobile
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Middle Section: Heading */}
          <div className="mt-12 mb-8">
            <h2 className="text-2xl font-extrabold text-[#0c1a30] tracking-tight">Berita Lainnya</h2>
            <div className="w-12 h-1 bg-[#27ae60] mt-2 rounded-full"></div>
          </div>

          {/* Bottom Section: Grid of 3 Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Grid Card 1 */}
            <div className="bg-white border border-gray-100 rounded-[20px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
              <div className="relative h-48 overflow-hidden">
                <img src="/images/inovasi/sosialisasi_sekolah.avif" alt="Edukasi" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-[#27ae60]/10 text-[#27ae60] text-xs font-bold px-3 py-1 rounded-lg uppercase">Edukasi</span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-gray-400 text-xs font-medium mb-2">28 Maret 2025</span>
                <h3 className="text-lg font-bold text-[#0c1a30] mb-2 group-hover:text-[#27ae60] transition-colors line-clamp-2">Sosialisasi Administrasi Kependudukan bagi Pemilih Pemula</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mt-auto">Edukasi pentingnya dokumen kependudukan bagi generasi muda.</p>
              </div>
            </div>

            {/* Grid Card 2 */}
            <div className="bg-white border border-gray-100 rounded-[20px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
              <div className="relative h-48 overflow-hidden">
                <img src="/images/inovasi/penyerahan_ktp.avif" alt="Pelayanan" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-[#27ae60]/10 text-[#27ae60] text-xs font-bold px-3 py-1 rounded-lg uppercase">Pelayanan</span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-gray-400 text-xs font-medium mb-2">25 Maret 2025</span>
                <h3 className="text-lg font-bold text-[#0c1a30] mb-2 group-hover:text-[#27ae60] transition-colors line-clamp-2">Penyerahan KTP-el Secara Simbolis kepada Warga Disabilitas</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mt-auto">Pelayanan inklusif bagi seluruh lapisan masyarakat tanpa terkecuali.</p>
              </div>
            </div>

            {/* Grid Card 3 */}
            <div className="bg-white border border-gray-100 rounded-[20px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
              <div className="relative h-48 overflow-hidden">
                <img src="/images/inovasi/jemput_bola.avif" alt="Internal" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-[#27ae60]/10 text-[#27ae60] text-xs font-bold px-3 py-1 rounded-lg uppercase">Internal</span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-gray-400 text-xs font-medium mb-2">20 Maret 2025</span>
                <h3 className="text-lg font-bold text-[#0c1a30] mb-2 group-hover:text-[#27ae60] transition-colors line-clamp-2">Peningkatan Kapasitas SDM Petugas Pelayanan Adminduk</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mt-auto">Pelatihan berkala demi menjaga kualitas pelayanan yang ramah dan cepat.</p>
              </div>
            </div>
          </section>

          {/* Pagination */}
          <div className="mt-16 flex justify-center">
            <nav className="inline-flex gap-2 p-1 bg-white border border-gray-100 rounded-full shadow-sm">
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#27ae60] text-white font-bold text-sm">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-50 font-bold text-sm transition-colors">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-50 font-bold text-sm transition-colors">3</button>
              <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-50 font-bold text-sm transition-colors">10</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </nav>
          </div>

          {/* Contact Section */}
          <div className="mt-16">
            <ContactSection />
          </div>
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
