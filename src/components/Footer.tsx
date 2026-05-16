'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const [settings, setSettings] = React.useState<any>(null);

  React.useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/settings');
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
  const mapsUrl = settings?.mapsUrl || "https://maps.google.com/maps?q=Disdukcapil%20Lampung%20Timur&t=&z=13&ie=UTF8&iwloc=&output=embed";

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
                src={mapsUrl}
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
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
          <div>
            {footerText}
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
