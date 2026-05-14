'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopularServices from "@/components/PopularServices";
import ContactSection from "@/components/ContactSection";
import Image from "next/image";

export default function LayananPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {/* Hero Section Wrapper with Padding */}
      <div className="p-[20px]">
        {/* Hero Section Inner with Border Radius */}
        <div className="relative h-[450px] flex items-center justify-center overflow-hidden rounded-[20px]">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/foto_kegiatan/pelayanan_ktp.avif" 
              alt="Pelayanan KTP" 
              fill 
              className="object-cover"
              priority
            />
            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center text-white px-4 mt-10">
            <span className="text-[#27ae60] text-sm font-bold uppercase tracking-wider mb-2 block">Layanan Kami</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Layanan Kependudukan</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Akses cepat dan mudah ke dokumen yang paling sering dibutuhkan masyarakat Lampung Timur.
            </p>
          </div>
        </div>
      </div>
      
      <main className="flex-grow">
        {/* Reuse the PopularServices component */}
        <PopularServices />
        
        {/* Contact Section */}
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}
