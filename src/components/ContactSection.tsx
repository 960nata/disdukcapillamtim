'use client';

import * as React from 'react';
import Link from 'next/link';

export default function ContactSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner styled like the image but modified */}
        <div className="bg-[#0b2b26] rounded-[2.5rem] p-10 md:p-16 flex flex-col items-center text-center gap-6 shadow-xl">
          
          <div className="max-w-2xl text-white flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">
              Butuh Informasi?
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              Hubungi kami untuk informasi lebih lanjut mengenai layanan kependudukan atau sampaikan pengaduan Anda.
            </p>
            
            {/* Button styled like Hero button but white */}
            <Link 
              href="/kontak" 
              className="inline-flex items-center gap-2 bg-white text-[#0b2b26] hover:bg-white/90 transition-all duration-300 rounded-full px-8 py-3 text-sm font-semibold shadow-lg shadow-black/20"
            >
              Hubungi Kami
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
