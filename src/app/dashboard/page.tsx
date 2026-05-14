'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalNews: 0,
    totalUsers: 0,
    totalInnovations: 0,
    totalGallery: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setStats(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const statsItems = [
    { title: 'Total Berita', value: stats.totalNews.toString(), icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v14zm-7-10H7v2h5v-2zm0 4H7v2h5v-2zm5-8H7v2h10V6z', color: '#27ae60' },
    { title: 'Total User', value: stats.totalUsers.toString(), icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', color: '#0b2b26' },
    { title: 'Total Inovasi', value: stats.totalInnovations.toString(), icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: '#f39c12' },
    { title: 'Total Foto Galeri', value: stats.totalGallery.toString(), icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', color: '#2980b9' },
  ];

  return (
    <div className="p-8 space-y-8 font-sans">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Ringkasan Dashboard</h1>
        <p className="text-sm text-gray-500">Pantau data dan statistik terbaru hari ini.</p>
      </div>

      {/* Stats Grid 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsItems.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${stat.color}10` }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stat.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={stat.icon}></path>
                </svg>
              </div>
              <span className="text-xs font-bold text-[#27ae60] bg-[#27ae60]/10 px-2.5 py-0.5 rounded-full">+0%</span>
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {loading ? '...' : stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Content Grid (2 columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Area (Mockup) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Grafik Pengunjung</h2>
              <p className="text-xs text-gray-500">Statistik pengunjung 7 hari terakhir</p>
            </div>
            <select className="text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none">
              <option>7 Hari Terakhir</option>
              <option>30 Hari Terakhir</option>
            </select>
          </div>
          
          {/* Chart Mockup */}
          <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200">
            <p className="text-sm text-gray-400">Grafik akan muncul di sini (Integrasi ApexCharts)</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Aktivitas Terbaru</h2>
          <div className="space-y-4">
            {[
              { user: 'Admin', action: 'menambahkan berita baru', time: '2 jam yang lalu' },
              { user: 'Penulis', action: 'mengubah artikel inovasi', time: '4 jam yang lalu' },
              { user: 'Superadmin', action: 'mengubah role user', time: '1 hari yang lalu' },
            ].map((act, idx) => (
              <div key={idx} className="flex gap-3 text-sm">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-gray-600">
                  {act.user.charAt(0)}
                </div>
                <div>
                  <p className="text-gray-900 font-medium">{act.user} <span className="text-gray-500 font-normal">{act.action}</span></p>
                  <p className="text-xs text-gray-400">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
