'use client';

import * as React from 'react';
import Link from 'next/link';

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
          tag: item.category || 'BERITA',
          date: new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
          image: item.coverImage || '/images/foto_kegiatan/kantor_luar.avif',
        }));

        setNewsList(mappedNews.slice(0, 3));

      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="py-20 bg-white text-gray-900 overflow-hidden border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-10 h-[2px] bg-[#27ae60]"></div>
               <span className="text-xs font-black text-[#27ae60] uppercase tracking-[0.3em]">Update Terkini</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#0c1a30] tracking-tight leading-none mb-4">
              Berita Terbaru
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl font-medium">
              Dapatkan informasi dan berita terbaru seputar pelayanan publik di Kabupaten Lampung Timur.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsList.map(item => (
              <Link 
                key={item.id} 
                href={`/berita/${item.slug}`}
                className="group flex flex-col bg-white rounded-[32px] overflow-hidden border border-gray-100 hover:border-[#27ae60] transition-all duration-500 hover:shadow-2xl hover:shadow-green-900/5 hover:-translate-y-2"
              >
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-[#27ae60] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                      {item.tag}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    {item.date}
                  </div>
                  <h4 className="text-xl font-black text-[#0c1a30] group-hover:text-[#27ae60] transition-colors line-clamp-2 leading-tight mb-4">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed mb-6 font-medium">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-black text-[#27ae60] uppercase tracking-widest group-hover:gap-3 transition-all">
                    Baca Selengkapnya
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
