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
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch('/api/news');
        const data = await res.json();
        const item = data.find((n: any) => n.slug === slug);
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

  const relatedNews = [
    { title: 'Inovasi SIAP: Solusi Cepat Urus KIA', date: '12 Mei 2026', image: '/images/foto_kegiatan/pelayanan_ktp.avif' },
    { title: 'Sosialisasi IKD di Kecamatan Sukadana', date: '10 Mei 2026', image: '/images/foto_kegiatan/kantor_luar.avif' },
    { title: 'Peningkatan Pelayanan Ramah Disabilitas', date: '08 Mei 2026', image: '/images/foto_kegiatan/pelayanan_ktp.avif' },
  ];

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
        <div className="relative h-[350px] md:h-[400px] overflow-hidden rounded-[20px] shadow-sm">
          <Image 
            src={newsDetail.coverImage} 
            alt={newsDetail.title} 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
          
          {/* Breadcrumb & Title - Constrained to max-w-7xl to align with content below */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <div className="max-w-7xl mx-auto w-full text-white px-[20px]">
              <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-[#2ecc71] mb-3">
                <Link href="/berita" className="hover:underline">Berita</Link>
                <span>/</span>
                <span>{newsDetail.category}</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold mb-4 leading-tight max-w-4xl">
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
      </motion.div>

      {/* Content Area (Split Layout 75% / 25%) */}
      <main className="flex-grow pt-4 pb-16 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-[20px] relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Column (75%) - Main News Card */}
            <div className="lg:col-span-3">
              <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                
                {/* Article Content */}
                <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#27ae60] prose-a:hover:text-[#1e8449] prose-a:font-bold prose-ul:text-gray-700 prose-li:text-gray-700">
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
                      } else if (block.type === 'gallery' || block.type === 'carousel') {
                        return (
                          <div key={index} className="grid grid-cols-2 gap-4 my-4">
                            {Array.isArray(block.content) && block.content.map((img: string, i: number) => (
                              <img key={i} src={img} alt="Gallery" className="w-full rounded-lg" />
                            ))}
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
                    <button className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-xl text-gray-600 hover:bg-[#27ae60]/10 hover:text-[#27ae60] transition-all border border-gray-100">
                      FB
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-xl text-gray-600 hover:bg-[#27ae60]/10 hover:text-[#27ae60] transition-all border border-gray-100">
                      WA
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-xl text-gray-600 hover:bg-[#27ae60]/10 hover:text-[#27ae60] transition-all border border-gray-100">
                      X
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
            <div className="lg:col-span-1 space-y-6">
              
              {/* Card 1: 5 Berita Terpopuler with Images */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#27ae60] rounded-full inline-block"></span>
                  Berita Populer
                </h3>
                <div className="space-y-4">
                  {relatedNews.map((news, i) => (
                    <div key={i} className="flex gap-3 group cursor-pointer">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                        <Image 
                          src={news.image} 
                          alt={news.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-between py-0.5">
                        <h4 className="text-xs font-bold text-gray-800 group-hover:text-[#27ae60] transition-colors line-clamp-2 leading-snug">
                          {news.title}
                        </h4>
                        <p className="text-[10px] text-gray-400 font-medium">{news.date}</p>
                      </div>
                    </div>
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
                    <div key={i} className="bg-orange-50/50 p-3 rounded-lg border border-orange-100/50 cursor-pointer hover:bg-orange-50 transition-colors">
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
                  {tags.map((tag, i) => (
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
