'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NewsManagementPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
                        <button className="text-xs font-bold text-[#27ae60] hover:text-[#1e8449] transition-colors">Edit</button>
                        <button className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors">Hapus</button>
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
  );
}
