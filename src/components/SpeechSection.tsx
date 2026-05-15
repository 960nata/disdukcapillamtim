'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const defaultSpeeches = [
  {
    name: "Ela Siti Nuryamah, S.Sos.",
    title: "Bupati Lampung Timur",
    quote: "Pelayanan publik yang cepat, transparan, dan membahagiakan adalah komitmen kami untuk seluruh warga Lampung Timur. Disdukcapil hadir untuk mempermudah urusan Anda.",
    image: "/images/pidato/pidato_1.avif"
  },
  {
    name: "Azwar Hadi, S.E., M.Si.",
    title: "Wakil Bupati Lampung Timur",
    quote: "Inovasi tiada henti dalam administrasi kependudukan adalah kunci mewujudkan Lampung Timur yang Berjaya. Kami siap melayani dengan sepenuh hati.",
    image: "/images/pidato/pidato_2.avif"
  }
];

export default function SpeechSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speeches, setSpeeches] = useState(defaultSpeeches);

  useEffect(() => {
    async function fetchSpeeches() {
      try {
        const res = await fetch('/api/speeches');
        const data = await res.json();
        if (data && data.length > 0) {
          setSpeeches(data);
        }
      } catch (error) {
        console.error('Failed to fetch speeches:', error);
      }
    }
    fetchSpeeches();
  }, []);

  return (
    <section className="relative min-h-[600px] md:h-[700px] py-20 md:py-0 px-6 overflow-hidden border-t border-gray-100 flex items-center">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/pidato/bg_speech.avif" 
          alt="Leadership Background" 
          fill 
          className="object-cover"
          quality={100}
          priority
        />
        {/* Gradient Overlay: Natural at top, dark green at bottom to match theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#0b331a]/50 to-[#0b331a]"></div>
      </div>

      {/* Background Watermark for Design Consistency */}
      <div className="absolute top-1/2 left-0 w-full text-center overflow-hidden pointer-events-none z-10 opacity-[0.03]">
        <h1 className="text-[6rem] md:text-[10rem] font-black text-white tracking-tighter leading-none select-none uppercase">
          LAMPUNG TIMUR
        </h1>
      </div>

      <div className="relative z-20 max-w-5xl mx-auto w-full">

        <div className="text-center mb-10">
          <span className="text-white text-sm font-bold uppercase tracking-wider">Sambutan</span>
          <h2 className="text-xl md:text-4xl font-bold text-white tracking-tight mt-2">
            Pidato Kepala Daerah
          </h2>
          <div className="w-20 h-1 bg-[#27ae60] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Apple Style Glass Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ scale: 1.01 }}
              className="bg-white/20 md:bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-12 border border-white/20 flex flex-col md:flex-row gap-8 items-center md:items-center shadow-2xl shadow-black/30 cursor-pointer"
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl border-2 border-white/30">
                <Image src={speeches[currentIndex].image} alt={speeches[currentIndex].name} fill className="object-cover object-top" />
              </div>
              <div className="flex flex-col gap-4 text-white">
                {/* Quote Icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path><path d="M4 11h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm0 4v2a2 2 0 0 0 2 2h2"></path></svg>
                
                <p className="text-lg md:text-xl font-medium italic leading-relaxed tracking-tight text-white/90">
                  "{speeches[currentIndex].quote}"
                </p>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="font-bold text-xl text-white">{speeches[currentIndex].name}</div>
                  <div className="text-[#27ae60] font-bold text-xs uppercase tracking-widest mt-1">{speeches[currentIndex].title}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {speeches.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "h-2 rounded-full transition-all duration-500",
                  currentIndex === idx 
                    ? "bg-white w-8" 
                    : "bg-white/30 w-2 hover:bg-white/50"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
