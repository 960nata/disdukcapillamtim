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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

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
  const allBottomNews = newsList.slice(4);

  // Pagination logic
  const totalPages = Math.ceil(allBottomNews.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBottomNews = allBottomNews.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

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
            <h1 className="text-xl md:text-5xl font-bold mb-4 text-white uppercase">Berita Terbaru</h1>
            <p className="text-xs md:text-lg text-white/80 max-w-2xl mx-auto">
              Ikuti kabar terkini dan liputan kegiatan terbaru dari Dinas Kependudukan dan Pencatatan Sipil Kabupaten Lampung Timur.
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
                {/* Grid Title */}
                <div className="mb-8 md:mb-12">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl md:text-3xl font-black text-[#0c1a30] tracking-tight uppercase italic">
                      Berita Terkini
                    </h3>
                    <div className="flex-grow h-[2px] bg-gradient-to-r from-[#27ae60] to-transparent opacity-20"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                  
                  {/* Featured Card (Left) */}
                  <div className="lg:col-span-7 h-full">
                    {featuredNews && (
                      <Link 
                        href={`/berita/${featuredNews.slug}`} 
                        className="group block relative h-[400px] md:h-[512px] rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:border-[#27ae60] hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500"
                      >
                        <div className="absolute inset-0">
                          <img 
                            src={featuredNews.coverImage || "/images/news/hero_berita.avif"} 
                            alt={featuredNews.title} 
                            className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-105"
                          />
                        </div>
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b2b26]/90 via-black/20 to-transparent"></div>
                        
                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
                          <div className="flex items-center gap-4 mb-3 md:mb-5">
                            <span className="bg-[#27ae60] text-white text-[9px] md:text-[10px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider">
                              {featuredNews.category || 'BERITA'}
                            </span>
                            <span className="text-white/70 text-[10px] md:text-xs font-medium tracking-wide">
                              {formatDate(featuredNews.createdAt)}
                            </span>
                          </div>
                          <h3 className="text-xl md:text-3xl font-bold text-white leading-tight group-hover:text-green-300 transition-colors tracking-tight">
                            {featuredNews.title}
                          </h3>
                        </div>
                      </Link>
                    )}
                  </div>

                  {/* 3 Small Cards (Right) */}
                  <div className="lg:col-span-5 flex flex-col gap-4 h-full">
                    {sideNews.map((news, idx) => (
                      <div key={news.id} className="flex-1">
                        <Link 
                          href={`/berita/${news.slug}`} 
                          className={`flex gap-6 group transition-all p-4 rounded-xl border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-md h-full ${
                            idx !== sideNews.length - 1 ? "border-b-slate-100" : ""
                          }`}
                        >
                          <div className="relative w-28 h-auto md:w-40 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 shadow-sm">
                            <img 
                              src={news.coverImage || "/images/news/hero_berita.avif"} 
                              alt={news.title} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                          <div className="flex flex-col justify-center flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-[10px] font-bold text-[#27ae60] bg-green-50 px-2 py-0.5 rounded uppercase tracking-widest">
                                {news.category || 'NEWS'}
                              </span>
                              <span className="text-slate-400 text-[11px] font-medium">
                                {formatDate(news.createdAt)}
                              </span>
                            </div>
                            <h4 className="text-base md:text-lg font-bold text-slate-900 leading-snug group-hover:text-[#27ae60] transition-colors line-clamp-2 tracking-tight">
                              {news.title}
                            </h4>
                          </div>
                        </Link>
                      </div>
                    ))}
                    
                    {sideNews.length === 0 && (
                      <div className="text-center py-10 text-gray-400 text-sm italic">
                        Belum ada berita tambahan.
                      </div>
                    )}
                  </div>

                </div>
              </section>

              {/* Middle Section: Heading */}
              {allBottomNews.length > 0 && (
                <>
                  <div className="mt-12 mb-8">
                    <h2 className="text-2xl font-extrabold text-[#0c1a30] tracking-tight">Berita Lainnya</h2>
                    <div className="w-12 h-1 bg-[#27ae60] mt-2 rounded-full"></div>
                  </div>

                  {/* Bottom Section: Grid of 3 Cards */}
                  <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {currentBottomNews.map((news) => (
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

                  {/* Pagination Section */}
                  {totalPages > 1 && (
                    <div className="mt-16 flex justify-center items-center gap-2">
                      <button 
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-full border transition-all ${currentPage === 1 ? 'text-gray-300 border-gray-100 cursor-not-allowed' : 'text-[#27ae60] border-gray-200 hover:border-[#27ae60] hover:bg-[#27ae60] hover:text-white'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === number ? 'bg-[#27ae60] text-white shadow-lg shadow-green-900/20' : 'bg-white text-gray-500 border border-gray-100 hover:border-[#27ae60] hover:text-[#27ae60]'}`}
                        >
                          {number}
                        </button>
                      ))}

                      <button 
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-full border transition-all ${currentPage === totalPages ? 'text-gray-300 border-gray-100 cursor-not-allowed' : 'text-[#27ae60] border-gray-200 hover:border-[#27ae60] hover:bg-[#27ae60] hover:text-white'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </button>
                    </div>
                  )}
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
