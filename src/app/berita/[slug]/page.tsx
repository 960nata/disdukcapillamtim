'use client';

import * as React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import Image from "next/image";
import Link from "next/link";
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

const NewsCarousel = ({ block }: { block: any }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const content = Array.isArray(block.content) ? block.content : [];

  // Auto-slide functionality
  React.useEffect(() => {
    if (content.length <= 1) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const width = scrollRef.current.children[0]?.clientWidth || scrollRef.current.clientWidth;
        // Adding gap to width calculation: child width + gap (1rem = 16px)
        const gap = 16; 
        const totalItemWidth = width + gap;
        
        let nextIndex = activeIndex + 1;
        if (nextIndex >= content.length) nextIndex = 0;
        
        scrollRef.current.scrollTo({
          left: nextIndex * totalItemWidth,
          behavior: 'smooth'
        });
      }
    }, 4000); // 4 seconds per slide
    return () => clearInterval(interval);
  }, [activeIndex, content.length]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.children[0]?.clientWidth || scrollRef.current.clientWidth;
      const gap = 16;
      const totalItemWidth = width + gap;
      const index = Math.round(scrollLeft / totalItemWidth);
      setActiveIndex(index);
    }
  };

  const scrollToSlide = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.children[0]?.clientWidth || scrollRef.current.clientWidth;
      const gap = 16;
      const totalItemWidth = width + gap;
      scrollRef.current.scrollTo({
        left: index * totalItemWidth,
        behavior: 'smooth'
      });
    }
  };

  const layout = block.layout || '1x1';
  let desktopClass = 'md:w-full';
  if (layout === '1x2') desktopClass = 'md:w-[calc(50%-0.5rem)]';
  if (layout === '1x3') desktopClass = 'md:w-[calc(33.333%-0.66rem)]';

  return (
    <div className="relative w-full my-6">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {content.map((img: string, i: number) => (
          <div key={i} className={`snap-center shrink-0 w-[85%] ${desktopClass} aspect-square relative rounded-xl overflow-hidden shadow-sm`}>
            <img src={img} alt="Carousel" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-1.5 mt-3">
        {content.map((_: any, i: number) => (
          <button 
            key={i} 
            onClick={() => scrollToSlide(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-[#27ae60]' : 'w-1.5 bg-gray-300 hover:bg-gray-400'}`} 
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function BeritaDetailPage() {
  const params = useParams();
  const slug = params.slug;

  const [newsDetail, setNewsDetail] = React.useState<any>(null);
  const [popularNews, setPopularNews] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch('/api/news');
        const data = await res.json();
        const item = data.find((n: any) => n.slug === slug);
        
        // Set popular news (excluding current one)
        setPopularNews(data.filter((n: any) => n.slug !== slug).slice(0, 5));

        if (item) {
          let parsedContent = item.content;
          try {
            parsedContent = JSON.parse(item.content);
          } catch (e) {
            // Not JSON
          }
          
          setNewsDetail({
            title: item.title,
            date: new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
            author: item.author?.name || 'Admin Disdukcapil',
            category: item.category || 'Berita',
            coverImage: item.coverImage || '/images/foto_kegiatan/kantor_luar.avif',
            content: parsedContent,
            tags: item.tags ? item.tags.split(',') : ['Pelayanan'],
            seoTitle: item.seoTitle,
            seoDesc: item.seoDesc,
            seoKeywords: item.seoKeywords
          });
        }
      } catch (error) {
        console.error('Failed to fetch news detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

  // Real data is now used from state

  const announcements = [
    { title: 'Pemeliharaan Sistem SIAK pada 15 Mei 2026', date: '13 Mei' },
    { title: 'Lowongan Tenaga Harian Lepas (THL)', date: '10 Mei' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-500 font-bold">
        Memuat artikel...
      </div>
    );
  }

  if (!newsDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-500 font-bold">
        Artikel tidak ditemukan!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {newsDetail && (
        <title>{newsDetail.seoTitle || newsDetail.title}</title>
      )}
      {newsDetail?.seoDesc && (
        <meta name="description" content={newsDetail.seoDesc} />
      )}
      {newsDetail?.seoKeywords && (
        <meta name="keywords" content={newsDetail.seoKeywords} />
      )}
      <Header />
      
      {/* Hero Section - Full Width with Padding (Matching Main Pages) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-[10px] md:p-[20px] w-full"
      >
        <div className="relative h-[400px] md:h-[700px] overflow-hidden rounded-[20px] shadow-sm">
          <img 
            src={newsDetail.coverImage} 
            alt={newsDetail.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30"></div>
          
          {/* Breadcrumb & Title - Constrained to max-w-7xl to align with content below */}
          <div className="absolute inset-0 flex flex-col justify-end pb-12">
            <div className="max-w-[1300px] mx-auto w-full text-white px-[20px]">
              <div className="w-full lg:w-[65%] md:pl-[20px]">
                <div className="flex items-center gap-2 text-[11px] md:text-sm font-bold text-[#2ecc71] mb-2">
                  <Link href="/berita" className="hover:underline">Berita</Link>
                  <span>/</span>
                  <span>{newsDetail.category}</span>
                </div>
                <h1 className="text-xl md:text-4xl font-extrabold mb-3 leading-tight">
                  {newsDetail.title}
                </h1>
                <div className="flex items-center gap-4 text-[11px] md:text-xs text-white/80">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {newsDetail.author.charAt(0)}
                    </div>
                    <span className="font-bold">{newsDetail.author}</span>
                  </div>
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                  <span>{newsDetail.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Area (Split Layout 75% / 25%) */}
      <main className="flex-grow pt-4 pb-16 bg-[#f8fafc]">
        <div className="max-w-[1300px] mx-auto px-[20px] relative z-10">
          
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column (75%) - Main News Card */}
            <div className="w-full lg:w-[65%]">
              <div className="bg-white p-[20px] rounded-2xl border border-gray-100 shadow-sm space-y-6">
                
                {/* Article Content */}
                <div className="max-w-none [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-3 [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-gray-800 [&_h4]:mt-4 [&_h4]:mb-2 [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_li]:text-gray-700 [&_li]:mb-1 [&_a]:text-[#27ae60] [&_a]:hover:text-[#1e8449] [&_a]:font-bold">
                  {Array.isArray(newsDetail.content) ? (
                    newsDetail.content.map((block: any, index: number) => {
                      if (block.type === 'text') {
                        return <div key={index} dangerouslySetInnerHTML={{ __html: block.content }} />;
                      } else if (block.type === 'image') {
                        return <img key={index} src={block.content} alt="Content" className="w-full rounded-xl my-4" />;
                      } else if (block.type === 'video') {
                        return (
                          <div key={index} className="relative aspect-video rounded-xl overflow-hidden my-4">
                            <iframe src={block.content} className="w-full h-full" allowFullScreen></iframe>
                          </div>
                        );
                      } else if (block.type === 'gallery') {
                        return (
                          <div key={index} className="grid grid-cols-2 gap-4 my-4">
                            {Array.isArray(block.content) && block.content.map((img: string, i: number) => (
                              <img key={i} src={img} alt="Gallery" className="w-full rounded-lg" />
                            ))}
                          </div>
                        );
                      } else if (block.type === 'carousel') {
                        return <NewsCarousel key={index} block={block} />;
                      } else if (block.type === 'grid') {
                        const layout = block.layout || '1x2';
                        let gridClass = 'grid-cols-1 sm:grid-cols-2';
                        if (layout === '2x2') gridClass = 'grid-cols-2';
                        if (layout === '1x3') gridClass = 'grid-cols-1 sm:grid-cols-3';
                        if (layout === '1x4') gridClass = 'grid-cols-2 sm:grid-cols-4';

                        return (
                          <div key={index} className={`grid ${gridClass} gap-4 my-6`}>
                            {(block.items || []).map((item: any, i: number) => (
                              <div key={i} className="flex flex-col gap-3">
                                {item.image && (
                                  <div className="rounded-xl overflow-hidden shadow-sm">
                                    <img src={item.image} alt="Grid Item" className="w-full h-auto object-cover" />
                                  </div>
                                )}
                                {item.text && (
                                  <div className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.text }} />
                                )}
                              </div>
                            ))}
                          </div>
                        );
                      } else if (block.type === 'html') {
                        return (
                          <div key={index} className="my-6 w-full overflow-hidden">
                            <div dangerouslySetInnerHTML={{ __html: block.content }} />
                          </div>
                        );
                      }
                      return null;
                    })
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: newsDetail.content }} />
                  )}
                </div>

                <div className="h-px bg-gray-100 my-6"></div>

                {/* Share or Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-400">Bagikan:</span>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-xl text-gray-600 hover:bg-[#27ae60]/10 hover:text-[#27ae60] transition-all border border-gray-100"
                      title="Bagikan ke Facebook"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-8.784h-2.956v-3.425h2.956v-2.525c0-2.93 1.79-4.525 4.403-4.525 1.252 0 2.328.093 2.641.135v3.062h-1.812c-1.422 0-1.697.676-1.697 1.667v2.186h3.391l-.442 3.425h-2.949v8.784h6.035c.732 0 1.325-.593 1.325-1.325v-21.351c0-.732-.593-1.325-1.325-1.325z"/></svg>
                    </a>
                    <a 
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(newsDetail.title + ' - ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-xl text-gray-600 hover:bg-[#27ae60]/10 hover:text-[#27ae60] transition-all border border-gray-100"
                      title="Bagikan ke WhatsApp"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.237 3.483 8.42-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.308 1.648zm5.223-3.23c1.572.933 3.129 1.417 4.75 1.418 5.441 0 9.868-4.427 9.871-9.869.001-2.636-1.026-5.112-2.892-6.98s-4.337-2.891-6.977-2.892c-5.442 0-9.87 4.429-9.872 9.87-.001 1.813.497 3.545 1.44 5.061l-.988 3.61 3.69-.966zm11.434-7.054c-.269-.135-1.594-.787-1.841-.876-.246-.089-.427-.135-.607.135-.18.271-.696.877-.853 1.057-.158.18-.315.203-.584.068-.269-.135-1.138-.42-2.167-1.338-.802-.715-1.343-1.598-1.5-1.869-.158-.271-.017-.417.118-.552.122-.121.269-.315.404-.473.135-.158.18-.271.27-.45.09-.18.045-.338-.022-.473-.068-.135-.607-1.463-.832-2.003-.219-.527-.441-.456-.607-.464-.156-.008-.337-.01-.517-.01-.18 0-.473.068-.72.338-.246.271-.944.923-.944 2.251s.966 2.613 1.101 2.793c.135.18 1.902 2.904 4.609 4.073.645.278 1.148.445 1.54.57.648.205 1.237.176 1.703.106.519-.078 1.594-.653 1.819-1.283.225-.63.225-1.17.157-1.283-.067-.113-.247-.18-.516-.315z"/></svg>
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(newsDetail.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-xl text-gray-600 hover:bg-[#27ae60]/10 hover:text-[#27ae60] transition-all border border-gray-100"
                      title="Bagikan ke X"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.933zm-1.292 19.489h2.039L6.486 3.24H4.298L17.61 20.642z"/></svg>
                    </a>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link berhasil disalin!');
                      }}
                      className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-xl text-gray-600 hover:bg-[#27ae60]/10 hover:text-[#27ae60] transition-all border border-gray-100"
                      title="Salin Link"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                    </button>
                  </div>
                  
                  <Link href="/berita" className="text-sm font-bold text-[#27ae60] hover:text-[#1e8449] flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    Kembali ke Berita
                  </Link>
                </div>

              </div>
            </div>

            {/* Right Column (25%) - Sidebar */}
            <div className="w-full lg:w-[35%] space-y-6">
              
              {/* Card 1: 5 Berita Terpopuler with Images */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-lg font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#27ae60] rounded-full inline-block"></span>
                  Berita Populer
                </h3>
                <div className="space-y-4">
                  {popularNews.map((news, i) => (
                    <Link href={`/berita/${news.slug}`} key={i} className="flex gap-3 group cursor-pointer">
                      <div className="relative w-24 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                        <img 
                          src={news.coverImage || '/images/foto_kegiatan/kantor_luar.avif'} 
                          alt={news.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-between py-0.5">
                        <h4 className="text-sm font-bold text-gray-800 group-hover:text-[#27ae60] transition-colors line-clamp-2 leading-snug">
                          {news.title}
                        </h4>
                        <p className="text-xs text-gray-400 font-medium">
                          {new Date(news.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Card 2: Pengumuman */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#e67e22] rounded-full inline-block"></span>
                  Pengumuman
                </h3>
                <div className="space-y-3">
                  {announcements.map((ann, i) => (
                    <div key={i} className="bg-orange-50/50 p-3 rounded-lg border border-orange-100/50">
                      <h4 className="text-xs font-bold text-gray-800 line-clamp-2">
                        {ann.title}
                      </h4>
                      <p className="text-[10px] text-orange-600 font-bold mt-1">{ann.date}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3: Tags */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#3498db] rounded-full inline-block"></span>
                  Tag Populer
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {newsDetail.tags.map((tag: string, i: number) => (
                    <span key={i} className="text-[10px] font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 px-2 py-1 rounded-lg border border-gray-100 cursor-pointer transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* Contact Section */}
      <div className="bg-[#f8fafc]">
        <ContactSection />
      </div>
      
      <Footer />
    </div>
  );
}
