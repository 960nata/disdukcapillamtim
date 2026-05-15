'use client';

import * as React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import Image from "next/image";
import Link from "next/link";
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

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
        setPopularNews(data.filter((n: any) => n.slug !== slug).slice(0, 3));

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
            tags: item.tags ? item.tags.split(',') : ['Pelayanan']
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
      <Header />
      
      {/* Hero Section - Full Width with Padding (Matching Main Pages) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-[20px] w-full"
      >
        <div className="relative h-[700px] overflow-hidden rounded-[20px] shadow-sm">
          <img 
            src={newsDetail.coverImage} 
            alt={newsDetail.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
          
          {/* Breadcrumb & Title - Constrained to max-w-7xl to align with content below */}
          <div className="absolute inset-0 flex flex-col justify-end pb-12">
            <div className="max-w-[1300px] mx-auto w-full text-white px-[20px]">
              <div className="w-full lg:w-[65%] pl-[20px]">
                <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-[#2ecc71] mb-3">
                  <Link href="/berita" className="hover:underline">Berita</Link>
                  <span>/</span>
                  <span>{newsDetail.category}</span>
                </div>
                <h1 className="text-2xl md:text-4xl font-extrabold mb-4 leading-tight">
                  {newsDetail.title}
                </h1>
                <div className="flex items-center gap-4 text-xs md:text-sm text-white/80">
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
              <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                
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
                        return (
                          <div key={index} className="relative w-full overflow-hidden my-4">
                            <div className="flex gap-4 overflow-x-auto snap-x scrollbar-hide py-2">
                              {Array.isArray(block.content) && block.content.map((img: string, i: number) => (
                                <div key={i} className="snap-center shrink-0 w-full sm:w-2/3 md:w-1/2 aspect-[4/3] relative rounded-xl overflow-hidden">
                                  <img src={img} alt="Carousel" className="w-full h-full object-cover" />
                                </div>
                              ))}
                            </div>
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
                      className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-xl text-gray-600 hover:bg-[#27ae60]/10 hover:text-[#27ae60] transition-all border border-gray-100 text-xs font-bold"
                    >
                      FB
                    </a>
                    <a 
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(newsDetail.title + ' - ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-xl text-gray-600 hover:bg-[#27ae60]/10 hover:text-[#27ae60] transition-all border border-gray-100 text-xs font-bold"
                    >
                      WA
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(newsDetail.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-xl text-gray-600 hover:bg-[#27ae60]/10 hover:text-[#27ae60] transition-all border border-gray-100 text-xs font-bold"
                    >
                      X
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
                        <Image 
                          src={news.coverImage || '/images/foto_kegiatan/kantor_luar.avif'} 
                          alt={news.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
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
