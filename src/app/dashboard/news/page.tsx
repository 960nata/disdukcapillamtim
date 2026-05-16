'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NewsManagementPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua Status');

  // Dummy data for fallback
  const dummyNews = [
    { id: 1, title: 'Pelayanan KTP Elektronik Jemput Bola di Desa Sukadana (Dummy)', date: '14 Mei 2026', status: 'Published', author: { name: 'Admin' }, category: 'Pelayanan' },
    { id: 2, title: 'Sosialisasi Pentingnya KIA di Sekolah Dasar Negeri 1 (Dummy)', date: '12 Mei 2026', status: 'Published', author: { name: 'Penulis 1' }, category: 'Edukasi' },
    { id: 3, title: 'Rapat Koordinasi Evaluasi Pelayanan Triwulan I (Dummy)', date: '10 Mei 2026', status: 'Draft', author: { name: 'Admin' }, category: 'Kegiatan' },
    { id: 4, title: 'Inovasi Baru: Cetak Kartu Keluarga Mandiri via Online (Dummy)', date: '08 Mei 2026', status: 'Published', author: { name: 'Penulis 2' }, category: 'Pelayanan' },
  ];

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      if (Array.isArray(data)) {
        setNews(data.length > 0 ? data : dummyNews);
      } else {
        setNews(dummyNews);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setNews(dummyNews);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const executeDelete = async () => {
    if (!deleteId) return;
    
    try {
      const res = await fetch(`/api/news/${deleteId}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Gagal menghapus berita');
      
      setNews(news.filter(item => item.id !== deleteId));
    } catch (error) {
      console.error('Error deleting news:', error);
    } finally {
      setShowModal(false);
      setDeleteId(null);
    }
  };

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'Semua Status' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-0 md:p-8 space-y-0 md:space-y-6 font-sans min-h-screen bg-gray-50/50">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-[14px] md:p-6 md:rounded-2xl shadow-sm border-b md:border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14z"/><path d="M12 11H7v2h5v-2z"/><path d="M12 15H7v2h5v-2z"/><path d="M17 7H7v2h10V7z"/></svg>
            Manajemen Berita
          </h1>
          <p className="text-sm text-gray-500">Kelola semua artikel dan berita yang ditayangkan di portal.</p>
        </div>
        
        <Link href="/dashboard/news/create" className="w-full sm:w-auto bg-[#27ae60] hover:bg-[#1e8449] text-white transition-all duration-300 rounded-xl px-5 py-3 text-sm font-bold shadow-lg shadow-green-100 flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Tambah Berita
        </Link>
      </div>

      <div className="px-[14px] py-4 md:p-0 space-y-4 md:space-y-6">
        {/* Filters & Search */}
        <div className="bg-white p-[10px] md:p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul berita..." 
              className="w-full pl-11 pr-4 py-3 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 md:w-44 px-4 py-3 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#27ae60] font-bold text-gray-700 appearance-none bg-no-repeat bg-[right_1rem_center]"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")` }}
            >
              <option>Semua Status</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px]">Artikel</th>
                  <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px]">Penulis & Tanggal</th>
                  <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px]">Kategori</th>
                  <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px]">Status</th>
                  <th className="px-6 py-5 font-bold text-gray-600 uppercase tracking-wider text-[11px] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-[#27ae60] border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-gray-500 font-medium">Memuat data berita...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredNews.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-medium">
                      Tidak ada berita yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredNews.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 group-hover:text-[#27ae60] transition-colors line-clamp-1">{item.title}</span>
                          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">ID: #{item.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-700 text-xs">{item.author?.name || 'Admin'}</span>
                          <span className="text-[10px] text-gray-400">{item.date || new Date(item.createdAt).toLocaleDateString('id-ID')}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                          {item.category || 'Berita'}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${
                          item.status === 'Published' 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                            : 'bg-orange-50 text-orange-600 border border-orange-100'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <Link 
                            href={`/berita/${item.slug}`}
                            target="_blank"
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                          </Link>
                          <Link 
                            href={`/dashboard/news/edit/${item.id}`}
                            className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all border border-transparent hover:border-emerald-100"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                          </Link>
                          <button 
                            onClick={() => handleDeleteClick(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl transition-all scale-100">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-red-100 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Hapus Berita?</h3>
              <p className="text-sm text-gray-500 font-medium">Tindakan ini tidak dapat dibatalkan. Berita akan dihapus permanen dari sistem.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-4 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors"
              >
                Batalkan
              </button>
              <button 
                onClick={executeDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-2xl py-4 text-sm font-black shadow-lg shadow-red-100 transition-all hover:scale-105"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
