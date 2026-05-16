'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LatestNews() {
  const [newsList, setNewsList] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const newsRes = await fetch('/api/news');
        const newsData = await newsRes.json();

        // Filter and map news
        const publishedNews = newsData.filter((item: any) => item.status === 'Published');
        const mappedNews = publishedNews.map((item: any, index: number) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          description: item.seoDesc || 'Baca selengkapnya...',
          category: item.category || 'BERITA',
          date: new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
          image: item.coverImage || '/images/foto_kegiatan/kantor_luar.avif',
          isFeatured: index === 0
        }));

        setNewsList(mappedNews);

      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const featuredNews = newsList.find(item => item.isFeatured);
  const otherNews = newsList.filter(item => !item.isFeatured).slice(0, 3);

  if (loading) {
    return (
      <div className="flex justify-center py-32 bg-white">
        <div className="w-12 h-12 border-4 border-[#00529C]/20 border-t-[#00529C] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="relative py-32 bg-white overflow-hidden font-sans border-t border-slate-100">
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Standardized Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-[42px] font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Berita & Informasi Terbaru
            </h2>
            <p className="text-slate-500 text-base md:text-lg font-normal leading-relaxed max-w-2xl">
              Pantau perkembangan kependudukan, kebijakan terbaru, dan informasi strategis terkini di Kabupaten Lampung Timur.
            </p>
          </div>
          
          <Link 
            href="/berita" 
            className="bg-[#27ae60] text-white px-8 py-4 rounded-full text-[15px] font-bold flex items-center gap-3 hover:bg-white hover:text-[#27ae60] border border-transparent hover:border-[#27ae60] transition-all duration-300 shadow-xl shadow-green-900/20 group"
          >
            <span>Lihat Semua Berita</span> <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid Title */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-3">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight uppercase">
              Berita Terkini
            </h3>
            <div className="flex-grow h-[1px] bg-slate-200"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column - Featured News Card */}
          <div className="lg:col-span-7">
            {featuredNews && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="h-full"
              >
                <Link 
                  href={`/berita/${featuredNews.slug}`} 
                  className="group block relative h-[400px] lg:h-full rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:border-[#27ae60] hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500"
                >
                  <div className="absolute inset-0">
                    <img 
                      src={featuredNews.image} 
                      alt={featuredNews.title} 
                      className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-105"
                    />
                  </div>
                  {/* Overlay Gradient - Limited to bottom with 40% opacity */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
                    <div className="flex items-center gap-4 mb-3 md:mb-5">
                      <span className="bg-[#27ae60] text-white text-[9px] md:text-[10px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider">
                        {featuredNews.category}
                      </span>
                      <span className="text-white/70 text-[10px] md:text-xs font-medium tracking-wide">
                        {featuredNews.date}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-3xl font-bold text-white leading-tight group-hover:text-green-300 transition-colors tracking-tight">
                      {featuredNews.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Right Column - News List items with refined style */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {otherNews.map((news, idx) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.4, 0, 0.2, 1] }}
              >
                <Link 
                  href={`/berita/${news.slug}`} 
                  className={cn(
                    "flex gap-6 group transition-all p-4 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50/50 hover:shadow-sm",
                    idx !== otherNews.length - 1 ? "border-b-slate-100" : ""
                  )}
                >
                  <div className="relative w-28 h-20 md:w-40 md:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 shadow-sm">
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold text-[#27ae60] bg-green-50 px-2 py-0.5 rounded uppercase tracking-widest">
                        {news.category}
                      </span>
                      <span className="text-slate-400 text-[11px] font-medium">
                        {news.date}
                      </span>
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-slate-900 leading-snug group-hover:text-[#27ae60] transition-colors line-clamp-2 tracking-tight">
                      {news.title}
                    </h4>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
