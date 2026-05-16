'use client';

import * as React from 'react';
import Link from 'next/link';

export default function LatestNews() {
  const [newsList, setNewsList] = React.useState<any[]>([]);
  const [announcements, setAnnouncements] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, annRes] = await Promise.all([
          fetch('/api/news'),
          fetch('/api/announcements')
        ]);
        
        const newsData = await newsRes.json();
        const annData = await annRes.json();

        // Filter and map news
        const publishedNews = newsData.filter((item: any) => item.status === 'Published');
        const mappedNews = publishedNews.map((item: any, index: number) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          description: item.seoDesc || 'Baca selengkapnya...',
          tag: item.category || 'BERITA',
          tagColor: index === 0 ? 'bg-[#27ae60] text-white' : 'bg-[#27ae60]/10 text-[#27ae60]',
          date: new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
          image: item.coverImage || '/images/foto_kegiatan/kantor_luar.avif',
          featured: index === 0
        }));

        setNewsList(mappedNews);
        setAnnouncements(Array.isArray(annData) ? annData.filter(a => a.isActive).slice(0, 5) : []);

      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const featuredNews = newsList.find(item => item.featured);
  const otherNews = newsList.filter(item => !item.featured).slice(0, 2);

  return (
    <section className="py-20 bg-[#f8fafc] text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-10 h-[2px] bg-[#27ae60]"></div>
               <span className="text-xs font-black text-[#27ae60] uppercase tracking-[0.3em]">Update Terkini</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#0c1a30] tracking-tight leading-none mb-4">
              Berita & Pengumuman
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl font-medium">
              Informasi resmi kependudukan dan berita terbaru dari Dinas Kependudukan dan Pencatatan Sipil Kabupaten Lampung Timur.
            </p>
          </div>
          <Link href="/berita" className="group flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100 hover:border-[#27ae60] transition-all duration-300">
            <span className="text-sm font-black text-[#0c1a30] group-hover:text-[#27ae60]">SEMUA BERITA</span>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#27ae60] group-hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </Link>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#27ae60]/20 border-t-[#27ae60] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: News (Main) - 8 Cols */}
            <div className="lg:col-span-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Featured News */}
                {featuredNews ? (
                  <Link 
                    href={`/berita/${featuredNews.slug}`}
                    className="md:col-span-2 group relative overflow-hidden rounded-[40px] h-[500px] shadow-2xl shadow-gray-200 block"
                  >
                    <img 
                      src={featuredNews.image} 
                      alt={featuredNews.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a30] via-[#0c1a30]/20 to-transparent"></div>
                    <div className="absolute bottom-0 p-10 text-white w-full">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="bg-[#27ae60] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                          {featuredNews.tag}
                        </span>
                        <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                        <span className="text-white/70 text-xs font-bold uppercase tracking-widest">{featuredNews.date}</span>
                      </div>
                      <h3 className="text-2xl md:text-4xl font-black mb-4 group-hover:text-[#27ae60] transition-colors leading-[1.1]">
                        {featuredNews.title}
                      </h3>
                      <p className="text-sm text-white/60 line-clamp-2 font-medium max-w-2xl">
                        {featuredNews.description}
                      </p>
                    </div>
                  </Link>
                ) : (
                   <div className="md:col-span-2 bg-white rounded-[40px] p-20 text-center border-2 border-dashed border-gray-100">
                      <p className="text-gray-400 font-bold uppercase tracking-widest">Belum ada berita utama</p>
                   </div>
                )}

                {/* Other News List */}
                {otherNews.map(item => (
                  <Link 
                    key={item.id} 
                    href={`/berita/${item.slug}`}
                    className="group flex flex-col gap-6 bg-white p-6 rounded-[32px] border border-gray-50 hover:border-[#27ae60] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[#27ae60] text-[10px] font-black uppercase tracking-widest">
                          {item.tag}
                        </span>
                        <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                        <span className="text-gray-400 text-[10px] font-black tracking-widest">{item.date}</span>
                      </div>
                      <h4 className="text-lg font-black text-[#0c1a30] group-hover:text-[#27ae60] transition-colors line-clamp-2 leading-tight">
                        {item.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column: Announcements - 4 Cols */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="bg-[#0c1a30] rounded-[40px] p-8 md:p-10 text-white flex flex-col h-full shadow-2xl shadow-blue-900/10">
                <div className="flex items-center justify-between mb-10">
                   <h3 className="text-2xl font-black tracking-tight">Pengumuman</h3>
                   <div className="p-3 bg-white/10 rounded-2xl">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01"></path></svg>
                   </div>
                </div>

                <div className="space-y-6 flex-grow">
                  {announcements.length > 0 ? announcements.map((ann, idx) => (
                    <div key={ann.id} className="group cursor-default">
                      <div className="flex items-start gap-4 mb-3">
                        <div className={`w-2 h-2 rounded-full mt-2 transition-transform group-hover:scale-150 ${
                          ann.type === 'danger' ? 'bg-red-500' : 
                          ann.type === 'warning' ? 'bg-yellow-500' : 
                          'bg-[#27ae60]'
                        }`}></div>
                        <div>
                          <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">
                            {new Date(ann.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}
                          </p>
                          <h4 className="text-sm font-bold text-white/90 leading-snug group-hover:text-[#27ae60] transition-colors">
                            {ann.title}
                          </h4>
                        </div>
                      </div>
                      {idx !== announcements.length - 1 && <div className="h-[1px] w-full bg-white/5 ml-6"></div>}
                    </div>
                  )) : (
                    <div className="flex flex-col items-center justify-center py-10 opacity-30 text-center">
                       <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                       <p className="text-xs font-bold uppercase tracking-widest">Belum ada pengumuman</p>
                    </div>
                  )}
                </div>

                <Link 
                  href="/pengumuman" 
                  className="mt-10 flex items-center justify-center gap-2 py-4 bg-white/5 rounded-2xl text-xs font-black uppercase tracking-widest border border-white/10 hover:bg-[#27ae60] hover:border-[#27ae60] transition-all"
                >
                  Lihat Semua
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
