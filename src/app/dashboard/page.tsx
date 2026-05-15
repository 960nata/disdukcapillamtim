'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import ApexCharts secara dinamis untuk menghindari error SSR
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

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

  // Konfigurasi Chart untuk Google Analytics Mockup
  const chartOptions: any = {
    chart: {
      id: 'ga4-chart',
      toolbar: { show: false },
      fontFamily: 'inherit',
    },
    xaxis: {
      categories: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
      labels: { style: { colors: '#9ca3af', fontWeight: 600 } },
    },
    yaxis: {
      labels: { style: { colors: '#9ca3af', fontWeight: 600 } },
    },
    colors: ['#27ae60', '#2980b9'],
    stroke: { curve: 'smooth', width: 3 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    grid: { borderColor: '#f3f4f6', strokeDashArray: 4 },
    dataLabels: { enabled: false },
    legend: { position: 'top', horizontalAlign: 'right' },
  };

  const chartSeries = [
    {
      name: 'Pengguna Aktif (Mock)',
      data: [120, 150, 180, 220, 210, 250, 310],
    },
    {
      name: 'Sesi (Mock)',
      data: [90, 110, 140, 170, 160, 190, 240],
    },
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
              <span className="text-xs font-bold text-[#27ae60] bg-[#27ae60]/10 px-2.5 py-0.5 rounded-full">+12%</span>
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
        
        {/* Main Chart Area (GA4 Mockup) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Statistik GA4 (Google Analytics)</h2>
              <p className="text-xs text-gray-500">Visualisasi data pengunjung 7 hari terakhir</p>
            </div>
            <div className="text-xs font-bold text-[#27ae60] bg-[#27ae60]/10 px-3 py-1 rounded-full">
              Live Preview
            </div>
          </div>
          
          {/* Chart */}
          <div className="h-64">
            <Chart options={chartOptions} series={chartSeries} type="area" height={250} />
          </div>
        </div>

        {/* Google Analytics Data Mockup */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Tujuan Bisnis</h2>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><polyline points="18 15 12 9 6 15"></polyline></svg>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><polyline points="6 9 12 15 18 9"></polyline></svg>
              Memperoleh prospek
            </div>
            
            <div className="space-y-2 ml-6">
              {[
                { name: 'Ringkasan', value: '1.250' },
                { name: 'Audiens', value: '850' },
                { name: 'Akuisisi pengguna', value: '420' },
                { name: 'Akuisisi traffic', value: '3.100' },
                { name: 'Akuisisi prospek', value: '150' },
                { name: 'Halaman landing', value: '/berita/test' },
                { name: 'Kelompok akuisisi pengguna', value: '12' },
                { name: 'Prospek yang Tidak Berpot...', value: '5' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-gray-600 font-medium">{item.name}</span>
                  <span className="text-xs font-bold text-[#27ae60] bg-[#27ae60]/10 px-2 py-0.5 rounded-full">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
