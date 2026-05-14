'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      
      {/* Hero Section Wrapper with Padding (Same as Profile) */}
      <div className="p-[20px]">
        {/* Hero Section Inner with Border Radius */}
        <div className="relative h-[450px] flex items-center justify-center overflow-hidden rounded-[20px]">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/foto_kegiatan/kantor_luar.avif" 
              alt="Kantor Disdukcapil" 
              fill 
              className="object-cover"
              priority
            />
            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center text-white px-4 mt-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Kontak Pelayanan</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Hubungi kami melalui berbagai saluran komunikasi resmi untuk mendapatkan informasi dan pelayanan terbaik.
            </p>
          </div>
        </div>
      </div>
      
      <main className="flex-grow pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Contact Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 relative z-20">
            
            {/* WhatsApp */}
            <a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer" 
               className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-8 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-8 sm:h-8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-4">Chat pelayanan cepat dan responsif.</p>
              <span className="text-[#25D366] font-bold text-xs sm:text-sm">Hubungi Sekarang →</span>
            </a>

            {/* Instagram */}
            <a href="https://instagram.com/disdukcapillamtim" target="_blank" rel="noopener noreferrer" 
               className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-8 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-full flex items-center justify-center text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-8 sm:h-8"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2">Instagram</h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-4">Ikuti dokumentasi dan info terbaru.</p>
              <span className="text-[#ee2a7b] font-bold text-xs sm:text-sm">Ikuti Kami →</span>
            </a>

            {/* TikTok */}
            <a href="https://tiktok.com/@disdukcapillamtim" target="_blank" rel="noopener noreferrer" 
               className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-8 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#000000] rounded-full flex items-center justify-center text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-8 sm:h-8"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2">TikTok</h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-4">Edukasi dan konten kreatif pelayanan.</p>
              <span className="text-[#000000] font-bold text-xs sm:text-sm">Tonton Video →</span>
            </a>

            {/* Email */}
            <a href="mailto:disdukcapillamtim45@gmail.com" target="_blank" rel="noopener noreferrer" 
               className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-8 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#EA4335] rounded-full flex items-center justify-center text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-8 sm:h-8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-4">Kirim surat dan pengaduan resmi.</p>
              <span className="text-[#00529C] font-bold text-xs sm:text-sm">Kirim Email →</span>
            </a>

          </div>
          
          {/* Additional Info / Map Section (Styled like Home page banner) */}
          <div className="mt-16 bg-[#0b2b26] p-10 md:p-14 rounded-[2.5rem] text-white shadow-xl">
            <div className="max-w-3xl">
              <span className="text-[#27ae60] text-sm font-bold uppercase tracking-wider mb-2 block">Lokasi Fisik</span>
              <h2 className="text-3xl font-bold mb-4">Kunjungi Kantor Kami</h2>
              <p className="text-white/80 font-medium leading-relaxed mb-6">
                Jl. Buay Subing No. 7, Desa Sukadana Ilir, Kecamatan Sukadana, Lampung Timur
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-sm font-bold text-white">
                  Senin - Kamis: 08:00 - 15:30
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-sm font-bold text-white">
                  Jumat: 08:00 - 15:00
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
