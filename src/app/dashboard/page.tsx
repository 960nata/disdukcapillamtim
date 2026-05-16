'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

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

  // GA4 Core Metrics
  const coreMetrics = [
    { title: 'Pengguna', value: '14.5K', change: '+12.5%', isUp: true },
    { title: 'Pengguna Baru', value: '12.1K', change: '+8.2%', isUp: true },
    { title: 'Rata-rata waktu interaksi', value: '2m 14s', change: '-1.4%', isUp: false },
    { title: 'Tayangan (Views)', value: '89.2K', change: '+24.1%', isUp: true },
  ];

  // Main Chart Options
  const mainChartOptions: any = {
    chart: { id: 'ga4-main-chart', toolbar: { show: false }, fontFamily: 'inherit', sparkline: { enabled: false } },
    xaxis: { categories: ['1 Mei', '5 Mei', '10 Mei', '15 Mei', '20 Mei', '25 Mei', '30 Mei'], labels: { style: { colors: '#6b7280' } } },
    yaxis: { labels: { style: { colors: '#6b7280' } } },
    colors: ['#2563eb', '#10b981'],
    stroke: { curve: 'smooth', width: 2 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.2, opacityTo: 0, stops: [0, 100] } },
    dataLabels: { enabled: false },
    grid: { borderColor: '#f3f4f6', strokeDashArray: 4 },
    legend: { position: 'top', horizontalAlign: 'left' },
  };

  const mainChartSeries = [
    { name: 'Pengguna', data: [800, 1200, 950, 1500, 1100, 1800, 2100] },
    { name: 'Pengguna Baru', data: [700, 1000, 800, 1300, 950, 1600, 1900] },
  ];

  // Realtime Chart
  const realtimeOptions: any = {
    chart: { type: 'bar', sparkline: { enabled: true } },
    colors: ['#3b82f6'],
    plotOptions: { bar: { columnWidth: '60%', borderRadius: 2 } },
    tooltip: { fixed: { enabled: false }, x: { show: false }, marker: { show: false } }
  };
  const realtimeSeries = [{ data: [12, 14, 18, 25, 20, 15, 10, 8, 15, 22, 30, 25, 18, 12, 10, 5, 8, 12, 15, 20] }];

  // Device Category
  const deviceOptions: any = {
    labels: ['Mobile', 'Desktop', 'Tablet'],
    colors: ['#3b82f6', '#10b981', '#f59e0b'],
    legend: { position: 'bottom' },
    chart: { fontFamily: 'inherit' },
    dataLabels: { enabled: false },
    plotOptions: { pie: { donut: { size: '75%' } } }
  };
  const deviceSeries = [72, 25, 3];

  // Top Pages
  const topPages = [
    { path: '/', views: '45,230' },
    { path: '/layanan', views: '12,500' },
    { path: '/profil', views: '8,420' },
    { path: '/berita', views: '6,100' },
    { path: '/kontak', views: '4,300' },
    { path: '/lokasi-pelayanan', views: '3,800' },
  ];

  // Traffic Source
  const sourceOptions: any = {
    chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'inherit' },
    plotOptions: { bar: { horizontal: true, borderRadius: 4, barHeight: '50%' } },
    colors: ['#6366f1'],
    dataLabels: { enabled: false },
    xaxis: { categories: ['Direct', 'Organic Search', 'Social', 'Referral', 'Email'], labels: { style: { colors: '#6b7280' } } },
    yaxis: { labels: { style: { colors: '#374151', fontWeight: 500 } } },
    grid: { borderColor: '#f3f4f6', strokeDashArray: 4 },
  };
  const sourceSeries = [{ name: 'Pengguna', data: [5400, 4200, 1800, 950, 400] }];

  // City Data
  const cityOptions: any = {
    chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'inherit' },
    plotOptions: { bar: { horizontal: true, borderRadius: 4, barHeight: '50%' } },
    colors: ['#0ea5e9'],
    dataLabels: { enabled: false },
    xaxis: { categories: ['Lampung Timur', 'Bandar Lampung', 'Jakarta', 'Metro', 'Lainnya'], labels: { style: { colors: '#6b7280' } } },
    yaxis: { labels: { style: { colors: '#374151', fontWeight: 500 } } },
    grid: { borderColor: '#f3f4f6', strokeDashArray: 4 },
  };
  const citySeries = [{ name: 'Pengguna', data: [8500, 2100, 1500, 800, 1600] }];

  return (
    <div className="p-[14px] md:p-8 space-y-6 font-sans bg-[#f3f4f6] min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            Laporan Analitik
          </h1>
          <p className="text-sm text-gray-500 mt-1">Data dari 30 hari terakhir (Mocks berdasarkan integrasi API Analytics)</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold border border-blue-100">
            Disdukcapil App
          </div>
          <div className="bg-gray-50 text-gray-600 px-4 py-2 rounded-xl text-sm font-medium border border-gray-200">
            30 Hari Terakhir
          </div>
        </div>
      </div>

      {/* Database Stats - Quick view */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Berita', val: stats.totalNews, bg: 'bg-emerald-50', text: 'text-emerald-700' },
          { label: 'Total User', val: stats.totalUsers, bg: 'bg-blue-50', text: 'text-blue-700' },
          { label: 'Total Inovasi', val: stats.totalInnovations, bg: 'bg-amber-50', text: 'text-amber-700' },
          { label: 'Total Galeri', val: stats.totalGallery, bg: 'bg-purple-50', text: 'text-purple-700' },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} rounded-xl p-4 border border-white shadow-sm flex items-center justify-between`}>
            <span className="text-sm font-medium text-gray-600">{s.label}</span>
            <span className={`text-xl font-black ${s.text}`}>{loading ? '...' : s.val}</span>
          </div>
        ))}
      </div>

      {/* Main GA4 Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Spans 2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Chart Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 border-b border-gray-50 pb-6">
              {coreMetrics.map((metric, i) => (
                <div key={i} className={`border-l-2 ${i === 0 ? 'border-blue-500' : 'border-transparent hover:border-gray-200'} pl-4 cursor-pointer transition-colors`}>
                  <p className="text-xs font-medium text-gray-500 mb-1">{metric.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                  <p className={`text-xs font-bold mt-1 flex items-center gap-1 ${metric.isUp ? 'text-emerald-600' : 'text-red-500'}`}>
                    {metric.isUp ? '↑' : '↓'} {metric.change}
                  </p>
                </div>
              ))}
            </div>
            <div className="h-[300px]">
              <Chart options={mainChartOptions} series={mainChartSeries} type="area" height="100%" />
            </div>
          </div>

          {/* Traffic Source & City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Pengguna berdasar Grup saluran</h3>
              <div className="h-[250px]">
                <Chart options={sourceOptions} series={sourceSeries} type="bar" height="100%" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Pengguna berdasar Kota</h3>
              <div className="h-[250px]">
                <Chart options={cityOptions} series={citySeries} type="bar" height="100%" />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Realtime Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
            <h3 className="text-sm font-bold text-gray-900">Pengguna dalam 30 menit</h3>
            <div className="text-5xl font-black text-gray-900 my-4">124</div>
            <p className="text-xs text-gray-500 mb-6">Tayangan halaman per menit</p>
            <div className="h-[100px] w-full">
              <Chart options={realtimeOptions} series={realtimeSeries} type="bar" height="100%" />
            </div>
          </div>

          {/* Device Category */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Pengguna berdasar Perangkat</h3>
            <div className="h-[200px] flex items-center justify-center">
              <Chart options={deviceOptions} series={deviceSeries} type="donut" height="100%" />
            </div>
          </div>

          {/* Top Pages */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Halaman dengan tayangan terbanyak</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold text-gray-400 border-b border-gray-100 pb-2">
                <span>Jalur halaman</span>
                <span>Tayangan</span>
              </div>
              {topPages.map((page, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700 truncate pr-4">{page.path}</span>
                  <span className="font-medium text-gray-900">{page.views}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              Lihat halaman dan layar →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
