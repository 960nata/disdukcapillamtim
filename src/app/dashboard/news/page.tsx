'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NewsManagementPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Dummy data for fallback
  const dummyNews = [
    { id: 1, title: 'Pelayanan KTP Elektronik Jemput Bola di Desa Sukadana (Dummy)', date: '14 Mei 2026', status: 'Published', author: { name: 'Admin' } },
    { id: 2, title: 'Sosialisasi Pentingnya KIA di Sekolah Dasar Negeri 1 (Dummy)', date: '12 Mei 2026', status: 'Published', author: { name: 'Penulis 1' } },
    { id: 3, title: 'Rapat Koordinasi Evaluasi Pelayanan Triwulan I (Dummy)', date: '10 Mei 2026', status: 'Draft', author: { name: 'Admin' } },
    { id: 4, title: 'Inovasi Baru: Cetak Kartu Keluarga Mandiri via Online (Dummy)', date: '08 Mei 2026', status: 'Published', author: { name: 'Penulis 2' } },
  ];

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/news');
        const data = await res.json();
        if (data && data.length > 0) {
          setNews(data);
        } else {
          setNews(dummyNews);
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
        setNews(dummyNews);
      } finally {
        setLoading(false);
      }
    }
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
      
      alert('Berita berhasil dihapus!');
      setNews(news.filter(item => item.id !== deleteId));
    } catch (error) {
      console.error('Error deleting news:', error);
      alert('Gagal menghapus berita');
    } finally {
      setShowModal(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Manajemen Berita</h1>
          <p className="text-sm text-gray-500">Kelola semua artikel dan berita yang ditayangkan.</p>
        </div>
        
        <Link href="/dashboard/news/create" className="bg-[#27ae60] hover:bg-[#1e8449] text-white transition-all duration-300 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Tambah Berita
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-64">
          <input 
            type="text" 
            placeholder="Cari berita..." 
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27ae60] transition-colors"
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-2.5 text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <select className="text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#27ae60] transition-colors w-full md:w-auto">
            <option>Semua Status</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
          <select className="text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#27ae60] transition-colors w-full md:w-auto">
            <option>Semua Kategori</option>
            <option>Pelayanan</option>
            <option>Kegiatan</option>
            <option>Edukasi</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th scope="col" className="px-6 py-4 font-bold">Judul Berita</th>
                <th scope="col" className="px-6 py-4 font-bold">Tanggal</th>
                <th scope="col" className="px-6 py-4 font-bold">Penulis</th>
                <th scope="col" className="px-6 py-4 font-bold">Status</th>
                <th scope="col" className="px-6 py-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">Memuat data...</td>
                </tr>
              ) : (
                news.map((item) => (
                  <tr key={item.id} className="bg-white border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 max-w-md">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : item.date}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {item.author?.name || 'Anonim'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        item.status === 'Published' ? 'bg-[#27ae60]/10 text-[#27ae60]' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <Link 
                          href={`/berita/${item.slug}`} 
                          target="_blank" 
                          className="p-1.5 bg-gray-50 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors border border-gray-100 flex items-center justify-center"
                          title="Lihat"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        </Link>
                        <Link 
                          href={`/dashboard/news/edit/${item.id}`}
                          className="p-1.5 bg-gray-50 rounded-lg text-[#27ae60] hover:bg-green-50 transition-colors border border-gray-100 flex items-center justify-center"
                          title="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </Link>
                        <button 
                          onClick={() => handleDeleteClick(item.id)}
                          className="p-1.5 bg-gray-50 rounded-lg text-red-600 hover:bg-red-50 transition-colors border border-gray-100 flex items-center justify-center"
                          title="Hapus"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
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

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-gray-100 space-y-6 transform transition-all scale-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-600 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Konfirmasi Hapus</h3>
                <p className="text-sm text-gray-500 mt-1">Apakah Anda yakin ingin menghapus berita ini? Tindakan ini tidak dapat dibatalkan.</p>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => {
                  setShowModal(false);
                  setDeleteId(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={executeDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors shadow-sm shadow-red-100"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
