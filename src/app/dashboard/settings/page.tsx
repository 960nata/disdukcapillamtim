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
            siteName: data.siteName || prev.siteName,
            email: data.email || prev.email,
            address: data.address || prev.address,
            instagram: data.instagram || prev.instagram,
            whatsapp: data.whatsapp || prev.whatsapp,
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
      <div className="p-8 flex justify-center items-center h-full">
        <div className="text-gray-500 text-sm">Memuat pengaturan...</div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Pengaturan Website</h1>
        <p className="text-xs text-gray-500">Kelola konfigurasi umum website Disdukcapil</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6 backdrop-blur-sm bg-white/90">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Nama Website</label>
            <input 
              type="text" 
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Email Kontak</label>
            <input 
              type="email" 
              name="email"
              value={settings.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1.5">Alamat Kantor</label>
          <textarea 
            name="address"
            value={settings.address}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#27ae60] h-24 resize-none focus:bg-white transition-all"
          />
        </div>

        <div className="h-px bg-gray-100"></div>

        <div>
          <h3 className="text-sm font-extrabold text-gray-900 mb-4">Media Sosial</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Instagram</label>
              <input 
                type="text" 
                name="instagram"
                value={settings.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/..." 
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">WhatsApp</label>
              <input 
                type="text" 
                name="whatsapp"
                value={settings.whatsapp}
                onChange={handleChange}
                placeholder="08123456789" 
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all" 
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <div className="text-sm text-green-600 font-medium">{message}</div>
          <button 
            type="submit"
            disabled={saving}
            className={`${saving ? 'bg-gray-400' : 'bg-[#27ae60] hover:bg-[#1e8449]'} text-white transition-all duration-300 rounded-xl px-6 py-2.5 text-sm font-bold shadow-sm flex items-center gap-2`}
          >
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>

      </form>
    </div>
  );
}
