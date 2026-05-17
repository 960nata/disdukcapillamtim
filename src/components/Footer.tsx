'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/settings');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        if (data && !data.error) {
          setSettings(data);
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    }
    fetchSettings();
  }, []);

  const footerText = settings?.footerText || `© ${new Date().getFullYear()} Disdukcapil Lampung Timur. All rights reserved.`;
  const siteName = settings?.siteName || 'DISDUKCAPIL';
  const email = settings?.email || 'disdukcapillamtim45@gmail.com';
  const phone = settings?.phone || '+62 811-7961-110';
  const address = settings?.address || 'Jl. Buay Subing No. 7, Desa Sukadana Ilir, Kecamatan Sukadana, Lampung Timur';
  const mapsSearchQuery = settings?.mapsUrl || settings?.address || 'Jl. Buay Subing No. 7, Desa Sukadana Ilir, Kecamatan Sukadana, Lampung Timur';
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapsSearchQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <footer className="bg-[#050a05] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Column 1: Brand */}
          <div className="col-span-1 md:col-span-4">
            <div className="flex items-center gap-2 font-bold transition-colors text-white mb-4">
              <Image src="/images/logo/logo.avif" alt="Logo" width={24} height={24} className="object-contain" />
              <div className="flex flex-col leading-tight text-white">
                <span className="text-sm font-bold tracking-wide uppercase">{siteName}</span>
                <span className="text-[10px] font-medium text-white/60">KAB. LAMPUNG TIMUR</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Dinas Kependudukan dan Pencatatan Sipil Kabupaten Lampung Timur. Kami berkomitmen memberikan pelayanan administrasi kependudukan yang cepat, mudah, dan membahagiakan bagi seluruh masyarakat.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-[#27ae60] transition-colors font-medium">Beranda</Link></li>
              <li><Link href="/layanan" className="hover:text-[#27ae60] transition-colors font-medium">Layanan Populer</Link></li>
              <li><Link href="/berita" className="hover:text-[#27ae60] transition-colors font-medium">Berita Terbaru</Link></li>
              <li><Link href="/#galeri" className="hover:text-[#27ae60] transition-colors font-medium">Galeri Kegiatan</Link></li>
              <li><Link href="/kontak" className="hover:text-[#27ae60] transition-colors font-medium">Kontak</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="col-span-1 md:col-span-3">
            <h3 className="text-lg font-bold mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#27ae60]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <span className="font-medium">{phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#27ae60]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                </div>
                <span className="font-medium">{email}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#27ae60] mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <span className="font-medium text-white/80 leading-relaxed">{address}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Maps */}
          <div className="col-span-1 md:col-span-3">
            <h3 className="text-lg font-bold mb-4">Lokasi Kantor</h3>
            <div className="rounded-2xl overflow-hidden h-[150px] border border-white/10 shadow-2xl">
              <iframe 
                src={mapsEmbedUrl}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
              ></iframe>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-gray-400 font-medium">
            <p className="text-center md:text-left">{footerText}</p>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20"></div>
            <div className="flex items-center gap-2">
              <span>Powered by</span>
              <a 
                href="https://hadinata.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center px-3 py-1 text-xs font-bold text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-[#27ae60]/50 transition-all group overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#27ae60]/0 via-[#27ae60]/10 to-[#27ae60]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <span className="relative z-10 bg-gradient-to-r from-gray-200 to-white group-hover:from-[#27ae60] group-hover:to-[#2ecc71] bg-clip-text text-transparent transition-all">Hadinata Dev</span>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-500 font-medium text-xs md:text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors hover:underline underline-offset-4 decoration-white/30">Kebijakan Privasi</Link>
            <div className="w-1 h-1 rounded-full bg-white/20"></div>
            <Link href="/terms" className="hover:text-white transition-colors hover:underline underline-offset-4 decoration-white/30">Syarat & Ketentuan</Link>
          </div>

        </div>

      </div>
    </footer>
  );
}
