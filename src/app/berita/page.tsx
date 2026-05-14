'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LatestNews from "@/components/LatestNews";
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
            <span className="text-[#27ae60] text-sm font-bold uppercase tracking-wider mb-2 block">Pusat Informasi</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Berita & Pengumuman</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Ikuti kabar terkini, pengumuman resmi, dan liputan kegiatan terbaru dari Dinas Kependudukan dan Pencatatan Sipil Kabupaten Lampung Timur.
            </p>
          </div>
        </div>
      </div>
      
      <main className="flex-grow pt-10 pb-12">
        <LatestNews />
        <div className="mt-12">
          <ContactSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
