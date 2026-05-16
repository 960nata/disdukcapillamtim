'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'Disdukcapil Lampung Timur',
    email: 'disdukcapil@lamtim.go.id',
    address: 'Jl. Sudirman No. 123, Sukadana, Lampung Timur',
    instagram: '',
    whatsapp: '',
    facebook: '',
    twitter: '',
    youtube: '',
    phone: '',
    workingHours: 'Senin - Jumat: 08:00 - 16:00',
    footerText: '© 2024 Dinas Kependudukan dan Pencatatan Sipil Kabupaten Lampung Timur.',
    logo: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data && !data.error) {
          setSettings((prev) => ({
            ...prev,
            ...data,
          }));
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setSettings((prev) => ({ ...prev, logo: data.url }));
        setMessage('Logo berhasil diupload! Klik Simpan untuk mempermanenkan.');
      }
    } catch (error) {
      console.error('Failed to upload logo:', error);
      setMessage('Gagal mengupload logo.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setMessage('Pengaturan berhasil disimpan!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Gagal menyimpan pengaturan.');
      }
    } catch (error) {
      setMessage('Terjadi kesalahan saat menyimpan.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center h-full min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#27ae60] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-500 font-medium font-sans">Memuat pengaturan...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-0 md:p-8 space-y-0 md:space-y-6 font-sans min-h-screen bg-gray-50/50">
      <div className="bg-white p-[14px] md:p-6 md:rounded-2xl shadow-sm border-b md:border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            Pengaturan Website
          </h1>
          <p className="text-sm text-gray-500">Kelola identitas, kontak, dan konfigurasi umum portal Disdukcapil.</p>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={saving}
          className={`w-full sm:w-auto ${saving ? 'bg-gray-400' : 'bg-[#27ae60] hover:bg-[#1e8449]'} text-white transition-all duration-300 rounded-xl px-8 py-3 text-sm font-black shadow-lg shadow-green-100 flex items-center justify-center gap-2`}
        >
          {saving ? 'Menyimpan...' : 'Simpan Semua Perubahan'}
        </button>
      </div>

      <div className="px-0 py-4 md:p-0 space-y-4 md:space-y-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Identitas & Logo */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-lg font-black text-gray-900 border-b border-gray-50 pb-4">Identitas Website</h2>
              
              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                <div className="w-24 h-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative group">
                  {settings.logo ? (
                    <img src={settings.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                  ) : (
                    <svg className="w-8 h-8 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  )}
                  <input type="file" onChange={handleLogoUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Logo Website</label>
                  <p className="text-xs text-gray-500 mb-2">Klik ikon kotak di samping untuk mengunggah logo baru.</p>
                  <div className="text-[10px] text-green-600 font-bold">{message}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Nama Instansi / Website</label>
                  <input 
                    type="text" 
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold text-gray-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Footer Copyright Text</label>
                  <input 
                    type="text" 
                    name="footerText"
                    value={settings.footerText}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-medium text-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Kontak & Alamat */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-lg font-black text-gray-900 border-b border-gray-50 pb-4">Kontak & Operasional</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Resmi</label>
                  <input 
                    type="email" 
                    name="email"
                    value={settings.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Nomor Telepon / Kantor</label>
                  <input 
                    type="text" 
                    name="phone"
                    value={settings.phone}
                    onChange={handleChange}
                    placeholder="(0721) ..."
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Jam Operasional Pelayanan</label>
                <input 
                  type="text" 
                  name="workingHours"
                  value={settings.workingHours}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Alamat Lengkap Kantor</label>
                <textarea 
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-medium h-24 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Media Sosial */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-lg font-black text-gray-900 border-b border-gray-50 pb-4">Media Sosial</h2>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">WhatsApp Center</label>
                  <input 
                    type="text" 
                    name="whatsapp"
                    value={settings.whatsapp}
                    onChange={handleChange}
                    placeholder="628123456789"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold text-emerald-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Instagram URL</label>
                  <input 
                    type="text" 
                    name="instagram"
                    value={settings.instagram}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Facebook URL</label>
                  <input 
                    type="text" 
                    name="facebook"
                    value={settings.facebook}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">YouTube Channel URL</label>
                  <input 
                    type="text" 
                    name="youtube"
                    value={settings.youtube}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Twitter / X URL</label>
                  <input 
                    type="text" 
                    name="twitter"
                    value={settings.twitter}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-[#27ae60] to-[#2ecc71] rounded-3xl shadow-lg shadow-green-100 text-white">
              <h3 className="font-black text-sm mb-2">Tips Pengaturan</h3>
              <p className="text-xs opacity-90 leading-relaxed">
                Pastikan alamat email dan nomor WhatsApp sudah benar karena data ini akan tampil di bagian footer dan halaman kontak website utama.
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
