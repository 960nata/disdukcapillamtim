'use client';

import * as React from 'react';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function CekDataPage() {
  const [searchType, setSearchType] = useState<'registrasi' | 'kk'>('registrasi');
  const [formData, setFormData] = useState({
    nomor: '',
    nik: '',
    captcha: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Proxy API call to avoid CORS issues and protect external URL
      const res = await fetch('/api/cek-siak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: searchType,
          ...formData
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setError(data.message || 'Data tidak ditemukan atau server sedang sibuk.');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat menghubungkan ke server SIAK.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <Header />
      
      {/* Breadcrumb & Title */}
      <div className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
            <Link href="/" className="hover:text-[#27ae60]">Beranda</Link>
            <span>/</span>
            <span className="text-[#27ae60]">Cek Permohonan</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-none mb-4">
            Cek Status Permohonan
          </h1>
          <p className="text-gray-500 font-medium max-w-xl">
            Pantau status pengajuan dokumen kependudukan Anda secara real-time melalui sistem integrasi SIAK.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Form Section */}
          <div className="lg:col-span-7 bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-blue-900/5 border border-gray-50">
            <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
              <div className="w-2 h-6 bg-[#27ae60] rounded-full"></div>
              Form Pencarian Data
            </h2>

            <form onSubmit={handleSearch} className="space-y-8">
              {/* Search Type Selector */}
              <div className="bg-gray-50 p-1.5 rounded-2xl flex gap-1">
                <button
                  type="button"
                  onClick={() => setSearchType('registrasi')}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all ${
                    searchType === 'registrasi' ? 'bg-white text-[#27ae60] shadow-sm' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  NOMOR REGISTRASI
                </button>
                <button
                  type="button"
                  onClick={() => setSearchType('kk')}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all ${
                    searchType === 'kk' ? 'bg-white text-[#27ae60] shadow-sm' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  NOMOR KARTU KELUARGA
                </button>
              </div>

              {/* Dynamic Input Based on Type */}
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">
                    {searchType === 'registrasi' ? 'Nomor Registrasi permohonan' : 'Nomor Kartu Keluarga'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={searchType === 'registrasi' ? 'Contoh: REG-12345678' : 'Contoh: 1807xxxxxxxxxxxx'}
                    value={formData.nomor}
                    onChange={(e) => setFormData({ ...formData, nomor: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[20px] focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold text-gray-700 placeholder:text-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">
                    NIK Pemohon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    placeholder="Masukkan 16 digit NIK Anda"
                    value={formData.nik}
                    onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[20px] focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold text-gray-700 placeholder:text-gray-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">
                      Kode Keamanan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan kode..."
                      value={formData.captcha}
                      onChange={(e) => setFormData({ ...formData, captcha: e.target.value })}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[20px] focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold text-gray-700 placeholder:text-gray-300 text-center tracking-[0.5em]"
                    />
                  </div>
                  <div className="bg-gray-100 rounded-[20px] h-[58px] flex items-center justify-center border-2 border-dashed border-gray-200">
                    <span className="text-xl font-black text-gray-400 italic tracking-[0.2em] select-none">
                      A7B8C9
                    </span>
                    <button type="button" className="ml-4 text-[#27ae60] hover:rotate-180 transition-transform duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg>
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-5 rounded-[24px] text-white font-black text-sm uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3 ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#27ae60] hover:bg-[#1e8449] hover:scale-[1.02] shadow-green-100'
                }`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                )}
                Cek Status Permohonan
              </button>
            </form>
          </div>

          {/* Result / Info Section */}
          <div className="lg:col-span-5 space-y-8">
            {result ? (
              <div className="bg-white rounded-[40px] p-10 border-2 border-[#27ae60] shadow-2xl shadow-green-900/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h3 className="text-xl font-black text-gray-900">Data Ditemukan</h3>
                </div>

                <div className="space-y-6">
                  <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status Pengajuan</p>
                    <p className="text-lg font-black text-[#27ae60] uppercase">Dokumen Selesai / Terbit</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Nama Pemohon</p>
                      <p className="text-sm font-bold text-gray-900">INDRA GANDI</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Jenis Layanan</p>
                      <p className="text-sm font-bold text-gray-900">KTP Elektronik (Cetak Baru)</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Tanggal Update</p>
                      <p className="text-sm font-bold text-gray-900">16 Mei 2026, 10:30 WIB</p>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-10 py-4 bg-gray-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all">
                  Unduh Tanda Terima Digital
                </button>
              </div>
            ) : error ? (
              <div className="bg-white rounded-[40px] p-10 border-2 border-red-100 shadow-2xl shadow-red-900/5 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">Pencarian Gagal</h3>
                <p className="text-sm font-medium text-gray-500 leading-relaxed mb-8">
                  {error}
                </p>
                <button 
                  onClick={() => setError(null)}
                  className="px-8 py-3 bg-gray-50 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 hover:text-gray-600 transition-all"
                >
                  Coba Lagi
                </button>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-[#0c1a30] to-[#1a365d] rounded-[40px] p-10 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <h3 className="text-2xl font-black mb-6 relative z-10">Petunjuk Pengecekan</h3>
                <ul className="space-y-6 relative z-10">
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-black shrink-0">1</div>
                    <p className="text-xs text-white/70 leading-relaxed font-medium">Pilih jenis pencarian menggunakan Nomor Registrasi atau Nomor KK.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-black shrink-0">2</div>
                    <p className="text-xs text-white/70 leading-relaxed font-medium">Pastikan NIK yang dimasukkan adalah NIK Pemohon yang terdaftar di berkas.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-black shrink-0">3</div>
                    <p className="text-xs text-white/70 leading-relaxed font-medium">Hubungi Customer Service jika status tidak berubah lebih dari 3 hari kerja.</p>
                  </li>
                </ul>
              </div>
            )}

            {/* Support Info */}
            <div className="p-8 border border-gray-100 rounded-[32px] bg-white">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-[#27ae60]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <h4 className="text-sm font-black text-gray-900">Butuh Bantuan?</h4>
               </div>
               <p className="text-xs text-gray-400 font-medium leading-relaxed">
                  Jika Anda mengalami kendala dalam pengecekan data, hubungi kami via WhatsApp di 0811-722-1111 (Hanya Pesan Teks).
               </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
