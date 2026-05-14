'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationSection from "@/components/LocationSection";
import ContactSection from "@/components/ContactSection";
import Image from "next/image";

export default function LokasiPelayananPage() {
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
              src="/images/HERO MAPS/hERO MAPS.avif" 
              alt="Hero Maps" 
              fill 
              className="object-cover"
              priority
            />
            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center text-white px-4 mt-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Titik Layanan Disdukcapil</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Temukan lokasi pelayanan kami yang terdekat dari tempat tinggal Anda. Kami hadir di berbagai titik untuk melayani Anda lebih baik.
            </p>
          </div>
        </div>
      </div>
      
      <main className="flex-grow py-12">
        <LocationSection />
        
        {/* Reuse existing ContactSection component */}
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}
