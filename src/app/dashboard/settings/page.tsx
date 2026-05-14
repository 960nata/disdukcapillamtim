'use client';

import * as React from 'react';

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Pengaturan Website</h1>
        <p className="text-xs text-gray-500">Kelola konfigurasi umum website Disdukcapil</p>
      </div>

      <div className="max-w-3xl bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Nama Website</label>
            <input 
              type="text" 
              defaultValue="Disdukcapil Lampung Timur"
              className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Email Kontak</label>
            <input 
              type="email" 
              defaultValue="disdukcapil@lamtim.go.id"
              className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1.5">Alamat Kantor</label>
          <textarea 
            defaultValue="Jl. Sudirman No. 123, Sukadana, Lampung Timur"
            className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#27ae60] h-24 resize-none focus:bg-white transition-all"
          />
        </div>

        <div className="h-px bg-gray-50"></div>

        <div>
          <h3 className="text-sm font-extrabold text-gray-900 mb-4">Media Sosial</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Instagram</label>
              <input type="text" placeholder="https://instagram.com/..." className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#27ae60]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">WhatsApp</label>
              <input type="text" placeholder="08123456789" className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#27ae60]" />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button className="bg-[#27ae60] hover:bg-[#1e8449] text-white transition-all duration-300 rounded-xl px-6 py-2.5 text-sm font-bold shadow-sm">
            Simpan Perubahan
          </button>
        </div>

      </div>
    </div>
  );
}
