'use client';

import * as React from 'react';
import Link from 'next/link';

const basePrograms = [
  {
    no: '01',
    title: 'PUAKHI',
    description: 'Jemput bola aktivasi dan sosialisasi Identitas Kependudukan Digital (IKD) langsung ke desa-desa seluruh Lampung Timur.',
    tag: 'IKD · Digital',
    image: '/images/inovasi/puakhi.avif',
    url: '#',
  },
  {
    no: '02',
    title: 'PLESIR DJAUH',
    description: 'Penerbitan dokumen kependudukan bagi masyarakat desa terpencil yang jauh dari ibukota kabupaten atau di wilayah perbatasan.',
    tag: 'Jemput Bola',
    image: '/images/inovasi/plesir_djauh.avif',
    url: '#',
  },
  {
    no: '03',
    title: 'LAMTIM CERIA',
    description: 'Cetak rekam KIA terintegrasi bekerjasama dengan sekolah, PAUD, dan TK seluruh Kabupaten Lampung Timur.',
    tag: 'KIA · Anak',
    image: '/images/inovasi/lamtim_ceria.avif',
    url: '#',
  },
  {
    no: '04',
    title: 'SILAMTIM BERJAYA',
    description: 'Platform layanan online administrasi kependudukan — urus semua dokumen dari mana saja tanpa antre di kantor.',
    tag: 'Online · 24/7',
    image: '/images/inovasi/silamtim_berjaya.avif',
    url: '#',
  },
  {
    no: '05',
    title: 'PALING MANTAB',
    description: 'Layanan daring terintegrasi bersama BPJS Kesehatan — terbitkan akta lahir dan daftar BPJS dalam satu layanan.',
    tag: 'BPJS · Integrasi',
    image: '/images/inovasi/paling_mantab.avif',
    url: '#',
  },
  {
    no: '06',
    title: 'ISBATH NIKAH TERPADU',
    description: 'Kolaborasi Pemkab, Pengadilan Agama & Kemenag — sidang isbath, buku nikah, KTP dan KK diterbitkan dalam satu hari.',
    tag: 'Kolaborasi',
    image: '/images/inovasi/isbath_nikah.avif',
    url: '#',
  },
];

export default function FeaturedPrograms() {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [programsList, setProgramsList] = React.useState(basePrograms);
  const [activeIndex, setActiveIndex] = React.useState(basePrograms.length * 5);
  const [progress, setProgress] = React.useState(0);
  const prevIndex = React.useRef(activeIndex);

  // Generate large pool for seamless scrolling dynamically
  const programs = React.useMemo(() => {
    return Array(10).fill(programsList).flat();
  }, [programsList]);

  // Fetch real innovations from DB
  React.useEffect(() => {
    fetch('/api/innovations')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item, idx) => ({
            no: String(idx + 1).padStart(2, '0'),
            title: item.name,
            description: item.desc,
            tag: item.status === 'Aktif' ? 'Program Unggulan' : item.status,
            image: item.image || '/images/inovasi/puakhi.avif',
            url: item.url || '#',
          }));
          setProgramsList(mapped);
          setActiveIndex(mapped.length * 5);
        }
      })
      .catch((err) => console.error('Failed to fetch innovations from API:', err));
  }, []);

  // Auto-sliding and loading effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            // If we reach the very end of the large array, reset to the middle
            if (nextIndex >= programs.length) {
              return programsList.length * 5;
            }
            return nextIndex;
          });
          return 0;
        }
        return prev + 1; // Increment by 1%
      });
    }, 50); // 5 seconds per slide

    return () => clearInterval(interval);
  }, [programs.length, programsList.length]);

  // Scroll to active index when it changes
  React.useEffect(() => {
    if (scrollRef.current && programs.length > 0) {
      const cardWidth = 344; // 320px width + 24px gap
      const scrollPosition = activeIndex * cardWidth;
      
      // If the index jumped (more than 1 step), use instant scroll to hide the loop reset
      const isJump = Math.abs(activeIndex - prevIndex.current) > 1;
      
      scrollRef.current.scrollTo({ 
        left: scrollPosition, 
        behavior: isJump ? 'auto' : 'smooth' 
      });
      
      prevIndex.current = activeIndex;
    }
  }, [activeIndex, programs.length]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    setProgress(0); // Reset progress on manual interaction
    if (direction === 'left') {
      setActiveIndex((prev) => (prev === 0 ? programs.length - 1 : prev - 1));
    } else {
      setActiveIndex((prev) => (prev === programs.length - 1 ? 0 : prev + 1));
    }
  };

  const currentProgramNo = programsList[activeIndex % programsList.length]?.no || '01';
  const currentBgImage = programs[activeIndex]?.image || '/images/inovasi/puakhi.avif';

  return (
    <section className="py-24 bg-[#0c1a30] text-white relative overflow-hidden">
      {/* Dynamic Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 -z-20 scale-110 blur-2xl opacity-60"
        style={{ backgroundImage: `url(${currentBgImage})` }}
      ></div>
      {/* Dark Green Overlay */}
      <div className="absolute inset-0 bg-[#020f0a]/75 -z-10"></div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#27ae60]/5 rounded-full blur-3xl -z-10"></div>

      {/* Header: Bounded by 1140px */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <span className="bg-[#27ae60]/20 text-[#27ae60] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">Inovasi Layanan</span>
          <h2 className="text-xl md:text-4xl font-bold mt-4 mb-4">Program Unggulan</h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-2xl mx-auto">
            Program yang memastikan layanan kependudukan menjangkau seluruh pelosok Lampung Timur.
          </p>
        </div>
      </div>

      {/* Cards Container: FULL SCREEN (Bleeds to edges) */}
      <div 
        ref={scrollRef} 
        className="w-full overflow-x-auto pb-6 flex gap-6 snap-x scroll-smooth no-scrollbar"
      >
        <div className="flex gap-6">
          {programs.map((program, index) => (
            <div 
              key={`${program.no}-${index}`} 
              className={`snap-center flex-shrink-0 w-[280px] sm:w-[320px] h-auto bg-white/5 backdrop-blur-md border rounded-2xl flex flex-col transition-all duration-500 group cursor-pointer overflow-hidden ${
                index === activeIndex ? 'border-[#27ae60]/50 bg-white/10' : 'border-white/10'
              }`}
              onClick={() => {
                setActiveIndex(index);
                setProgress(0);
              }}
            >
              {/* Image at the top with 4px padding */}
              <div className="p-1">
                <div className="w-full h-[180px] overflow-hidden rounded-xl bg-gray-900/40">
                  <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>

              <div className="p-6 flex flex-col gap-4 flex-grow">
                <div>
                  <h3 className={`text-xl font-bold mt-2 mb-2 transition-colors line-clamp-1 ${
                    index === activeIndex ? 'text-[#27ae60]' : 'text-white'
                  }`}>{program.title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed line-clamp-3">{program.description}</p>
                </div>

                <div className="mt-auto">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    index === activeIndex ? 'text-[#27ae60] bg-[#27ae60]/10' : 'text-white/40 bg-white/5'
                  }`}>
                    {program.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls: Bounded by 1140px */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex flex-col items-center gap-8">
        
        <div className="w-full flex items-center gap-6">
          {/* Progress line */}
          <div className="flex-grow h-[2px] bg-white/20 relative">
            <div 
              className="absolute left-0 top-0 h-full bg-[#27ae60]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleManualScroll('left')}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </button>
            <button 
              onClick={() => handleManualScroll('right')}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>

          {/* Dynamic Number (Looped) */}
          <span className="text-2xl font-bold text-white/80">{currentProgramNo}</span>
        </div>

        <Link href="/dashboard/innovations" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#27ae60] to-[#117a8b] hover:from-[#1e8449] hover:to-[#0e6273] text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-green-900/20 text-sm">
          Kelola Program Inovasi <span>→</span>
        </Link>
      </div>
    </section>
  );
}
