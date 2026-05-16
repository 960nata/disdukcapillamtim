'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-6 py-24 md:py-32 bg-[#fefce8]">
        <div className="max-w-3xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-[30px] bg-white shadow-2xl shadow-yellow-900/10 mb-8 border border-yellow-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Ups! Ada Gangguan Teknis
            </h1>
            
            <p className="text-slate-600 text-lg md:text-xl max-w-lg mx-auto mb-12 font-medium leading-relaxed">
              Maaf banget cuy, server lagi ada sedikit kendala atau koneksi kamu terputus. Tenang, tim IT kami lagi beresin secepat mungkin!
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => reset()}
                className="px-8 py-4 bg-yellow-500 text-white font-bold rounded-2xl shadow-xl shadow-yellow-900/20 hover:bg-yellow-600 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
              >
                Coba Lagi Sekarang
              </button>
              <a 
                href="/"
                className="px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto shadow-sm"
              >
                Balik ke Beranda
              </a>
            </div>
            
            <div className="mt-16 pt-8 border-t border-yellow-200/50">
              <p className="text-yellow-800/60 text-xs font-bold uppercase tracking-widest mb-4">Butuh Bantuan Mendesak?</p>
              <div className="flex justify-center gap-8 text-yellow-900/80 font-bold text-sm">
                <a href="https://wa.me/628117961110" target="_blank" className="hover:text-yellow-600 transition-colors">WhatsApp Pelayanan</a>
                <a href="mailto:disdukcapil@lampungtimurkab.go.id" className="hover:text-yellow-600 transition-colors">Email Support</a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
