'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      
      {/* Premium Hero Banner Section (News Style) */}
      <div className="p-[10px] md:p-[20px]">
        <div className="relative h-[350px] md:h-[600px] overflow-hidden rounded-[20px] shadow-sm">
          <img 
            src="/images/hero/hero1.avif" 
            alt="Not Found" 
            className="w-full h-full object-cover"
          />
          {/* Overlay Gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          {/* Content Overlay - Constrained content width to 1300px (News Style) */}
          <div className="absolute inset-0 flex flex-col justify-end pb-12">
            <div className="max-w-[1300px] mx-auto w-full text-white px-6 md:px-12">
              <div className="w-full lg:w-[75%]">
                <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-[#2ecc71] mb-2 uppercase tracking-widest">
                  <span>Status: 404</span>
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                  <span>Error Page</span>
                </div>
                <h1 className="text-2xl md:text-6xl font-black mb-4 leading-tight drop-shadow-2xl tracking-tight">
                  Ups! Halaman Yang Kamu Cari <span className="text-[#2ecc71]">Gak Ada</span> Cuy
                </h1>
                <p className="text-sm md:text-xl text-white/80 font-bold max-w-2xl drop-shadow-lg leading-relaxed">
                  Mungkin jalannya lagi ditutup atau kamu salah belok. Yuk balik lagi ke jalan yang benar!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex-grow flex items-center justify-center py-16 md:py-24 bg-gray-50">
        <div className="max-w-3xl w-full text-center relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-[120px] md:text-[200px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#27ae60] to-[#117a8b] opacity-20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none z-0">
              404
            </h1>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-[30px] bg-white shadow-2xl shadow-green-900/10 mb-8 border border-green-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                Halaman Tidak Ditemukan
              </h2>
              
              <p className="text-slate-500 text-lg md:text-xl max-w-lg mx-auto mb-12 font-medium leading-relaxed">
                Maaf cuy, sepertinya halaman yang kamu cari tidak ada atau sudah dipindahkan. Yuk balik lagi ke beranda!
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/"
                  className="px-8 py-4 bg-[#27ae60] text-white font-bold rounded-2xl shadow-xl shadow-green-900/20 hover:bg-[#1e8449] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                >
                  Kembali ke Beranda
                </Link>
                <button 
                  onClick={() => window.history.back()}
                  className="px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto shadow-sm"
                >
                  Kembali Sebelumnya
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
