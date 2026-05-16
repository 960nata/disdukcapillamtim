'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationBell from './NotificationBell';

const investmentItems = [
  { title: 'Mengapa Lamtim', href: '#', description: 'Pelajari posisi strategis dan performa ekonomi Lampung Timur.' },
  { title: 'Proyek', href: '#', description: 'Lihat katalog proyek yang siap untuk investasi.' },
  { title: 'Peta', href: '#', description: 'Visualisasi interaktif peluang investasi.' },
  { title: 'Prosedur', href: '#', description: 'Panduan langkah demi langkah untuk berinvestasi.' },
  { title: 'Insentif', href: '#', description: 'Tax holiday, tunjangan, dan insentif KEK.' },
  { title: 'Infrastruktur', href: '#', description: 'Konektivitas, utilitas, dan detail logistik.' },
  { title: 'Data Ekonomi', href: '#', description: 'Grafik real-time dan ringkasan ekonomi.' },
  { title: 'Buku Presentasi', href: '#', description: 'Unduh panduan investor terbaru kami.' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setIsOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-300 ${isScrolled ? 'top-[10px]' : 'top-[30px]'}`}>
      <div className={`backdrop-blur-md rounded-full px-8 py-3 flex items-center justify-between border border-white/10 shadow-2xl shadow-black/30 transition-all duration-300 ${isScrolled ? 'bg-white/30' : 'bg-white/5'}`}>
        {/* Logo */}
        <Link href="/" className={`flex items-center gap-2 font-bold transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>
          <Image src="/images/logo/logo.avif" alt="Logo" width={24} height={24} className="object-contain" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-wide">DISDUKCAPIL</span>
            <span className={`text-[10px] font-medium transition-colors ${isScrolled ? 'text-black/60' : 'text-white/60'}`}>LAMPUNG TIMUR</span>
          </div>
        </Link>

        {/* Center Nav */}
        <nav className={`hidden md:flex items-center gap-6 font-medium text-xs transition-colors ${isScrolled ? 'text-black' : 'text-white/90'}`}>
          <Link href="/" className={`transition-colors ${isScrolled ? 'hover:text-[#27ae60]' : 'hover:text-white'}`}>Beranda</Link>
          <Link href="/profil" className={`transition-colors ${isScrolled ? 'hover:text-[#27ae60]' : 'hover:text-white'}`}>Profil</Link>
          <Link href="/layanan" className={`transition-colors ${isScrolled ? 'hover:text-[#27ae60]' : 'hover:text-white'}`}>Layanan</Link>
          <Link href="/lokasi-pelayanan" className={`transition-colors ${isScrolled ? 'hover:text-[#27ae60]' : 'hover:text-white'}`}>Lokasi Pelayanan</Link>
          <Link href="/berita" className={`transition-colors ${isScrolled ? 'hover:text-[#27ae60]' : 'hover:text-white'}`}>Berita</Link>
          <Link href="/cek-data" className={`transition-colors ${isScrolled ? 'hover:text-[#27ae60]' : 'hover:text-white'}`}>Cek Permohonan</Link>
          <Link href="/kontak" className={`transition-colors ${isScrolled ? 'hover:text-[#27ae60]' : 'hover:text-white'}`}>Kontak</Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <NotificationBell isScrolled={isScrolled} />

          {/* Button */}
          <Link href="/kontak">
            <button className="bg-gradient-to-r from-[#27ae60] to-[#117a8b] hover:from-[#1e8449] hover:to-[#0b6260] text-white transition-all duration-300 rounded-full px-5 py-2 text-xs font-semibold shadow-lg shadow-teal-900/20">
              Hubungi Kami
            </button>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden transition-colors ${isScrolled ? 'text-black hover:text-black/80' : 'text-white hover:text-white/80'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Popup */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Invisible overlay to catch clicks outside */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-lg border border-gray-100 rounded-2xl p-6 z-50 shadow-xl"
            >
              <div className="flex flex-col gap-4 text-gray-800 font-medium">
                <Link href="/" className="hover:text-[#27ae60] transition-colors py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>Beranda</Link>
                <Link href="/profil" className="hover:text-[#27ae60] transition-colors py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>Profil</Link>
                <Link href="/layanan" className="hover:text-[#27ae60] transition-colors py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>Layanan</Link>
                <Link href="/lokasi-pelayanan" className="hover:text-[#27ae60] transition-colors py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>Lokasi Pelayanan</Link>
                <Link href="/berita" className="hover:text-[#27ae60] transition-colors py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>Berita</Link>
                <Link href="/cek-data" className="hover:text-[#27ae60] transition-colors py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>Cek Permohonan</Link>
                <Link href="/kontak" className="hover:text-[#27ae60] transition-colors py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>Kontak</Link>
                <Link href="/kontak" onClick={() => setIsOpen(false)}>
                  <button className="bg-gradient-to-r from-[#27ae60] to-[#117a8b] text-white hover:from-[#1e8449] hover:to-[#0b6260] transition-colors rounded-full px-5 py-2 text-sm font-semibold mt-2 w-full">Hubungi Kami</button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
