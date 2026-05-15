'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import Image from "next/image";
import Link from "next/link";

export default function BeritaPage() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Filter only Published news and sort by date (assuming API returns sorted or we sort here)
          const publishedNews = data.filter((item: any) => item.status === 'Published');
          setNewsList(publishedNews);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Helper to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const featuredNews = newsList[0];
  const sideNews = newsList.slice(1, 4);
  const bottomNews = newsList.slice(4);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      
      {/* Hero Section Wrapper with Padding */}
      <div className="p-[10px] md:p-[20px]">
        {/* Hero Section Inner with Border Radius */}
        <div className="relative h-[300px] md:h-[450px] flex items-center justify-center overflow-hidden rounded-[20px]">
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
          <div className="relative z-10 text-center text-white px-4 mt-5 md:mt-10">
            <h1 className="text-xl md:text-5xl font-bold mb-4 text-white uppercase">Berita & Pengumuman</h1>
            <p className="text-xs md:text-lg text-white/80 max-w-2xl mx-auto">
              Ikuti kabar terkini, pengumuman resmi, dan liputan kegiatan terbaru dari Dinas Kependudukan dan Pencatatan Sipil Kabupaten Lampung Timur.
            </p>
          </div>
        </div>
      </div>
      
      <main className="flex-grow pt-10 pb-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#27ae60] border-t-transparent"></div>
              <p className="mt-4 text-gray-500 font-medium">Memuat berita...</p>
            </div>
          ) : newsList.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Belum Ada Berita</h3>
              <p className="text-sm text-gray-500">Silakan tambahkan berita baru melalui panel dashboard.</p>
            </div>
          ) : (
            <>
              {/* Top Section: Featured + 3 Small Cards */}
              <section className="py-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  
                  {/* Featured Card (Left) */}
                  {featuredNews && (
                    <Link 
                      href={`/berita/${featuredNews.slug}`}
                      className="lg:col-span-3 relative group cursor-pointer overflow-hidden rounded-[20px] h-[400px] lg:h-[500px] shadow-sm bg-white"
                    >
                      <img 
                        src={featuredNews.coverImage || "/images/news/hero_berita.avif"} 
                        alt={featuredNews.title} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a30]/90 via-[#0c1a30]/30 to-transparent"></div>
                      <div className="absolute bottom-0 p-8 text-white">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="bg-[#27ae60] text-white text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wide">
                            {featuredNews.category || 'Berita'}
                          </span>
                          <span className="text-white/70 text-xs font-medium">{formatDate(featuredNews.createdAt)}</span>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-extrabold mb-2 group-hover:text-[#27ae60] transition-colors leading-tight">
                          {featuredNews.title}
                        </h3>
                      </div>
                    </Link>
                  )}

                  {/* 3 Small Cards (Right) */}
                  <div className="flex flex-col gap-4 lg:col-span-2">
                    {sideNews.map((news) => (
                      <Link 
                        key={news.id}
                        href={`/berita/${news.slug}`}
                        className="flex flex-col sm:flex-row gap-4 group cursor-pointer border border-gray-100 rounded-[15px] p-4 hover:border-[#27ae60] transition-all duration-300 bg-white hover:shadow-md h-auto sm:h-[120px]"
                      >
                        <div className="w-full h-32 sm:w-32 sm:h-full flex-shrink-0 overflow-hidden rounded-lg">
                          <img 
                            src={news.coverImage || "/images/news/hero_berita.avif"} 
                            alt={news.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          />
                        </div>
                        <div className="flex flex-col justify-between py-1">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="bg-[#27ae60]/10 text-[#27ae60] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                                {news.category || 'News'}
                              </span>
                              <span className="text-gray-400 text-xs">{formatDate(news.createdAt)}</span>
                            </div>
                            <h4 className="text-sm font-bold group-hover:text-[#27ae60] transition-colors line-clamp-2 text-[#0c1a30]">
                              {news.title}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    ))}
                    
                    {/* Fallback if less than 3 side news */}
                    {sideNews.length === 0 && (
                      <div className="text-center py-10 text-gray-400 text-sm">
                        Belum ada berita lainnya.
                      </div>
                    )}
                  </div>

                </div>
              </section>

              {/* Middle Section: Heading */}
              {bottomNews.length > 0 && (
                <>
                  <div className="mt-12 mb-8">
                    <h2 className="text-2xl font-extrabold text-[#0c1a30] tracking-tight">Berita Lainnya</h2>
                    <div className="w-12 h-1 bg-[#27ae60] mt-2 rounded-full"></div>
                  </div>

                  {/* Bottom Section: Grid of 3 Cards */}
                  <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {bottomNews.map((news) => (
                      <Link 
                        key={news.id}
                        href={`/berita/${news.slug}`}
                        className="bg-white border border-gray-100 rounded-[20px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={news.coverImage || "/images/news/hero_berita.avif"} 
                            alt={news.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                          <span className="absolute top-4 left-4 bg-[#27ae60]/10 text-[#27ae60] text-xs font-bold px-3 py-1 rounded-lg uppercase">
                            {news.category || 'Berita'}
                          </span>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <span className="text-gray-400 text-xs font-medium mb-2">{formatDate(news.createdAt)}</span>
                          <h3 className="text-lg font-bold text-[#0c1a30] mb-2 group-hover:text-[#27ae60] transition-colors line-clamp-2">
                            {news.title}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </section>
                </>
              )}
            </>
          )}

          {/* Contact Section */}
          <div className="mt-16">
            <ContactSection />
          </div>
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
