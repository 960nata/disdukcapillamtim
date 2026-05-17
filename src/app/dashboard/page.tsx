'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
const AnalyticsMap = dynamic(() => import('@/components/AnalyticsMap'), { ssr: false });

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalNews: 0,
    totalUsers: 0,
    totalInnovations: 0,
    totalGallery: 0,
    realtimeUsers: 0,
    realtimePages: [] as { pathname: string; count: number }[],
    activeUsersTrend: {
      categories: ['1 Mei', '5 Mei', '10 Mei', '15 Mei', '20 Mei', '25 Mei', '30 Mei'],
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    devices: [0, 0, 0],
    sources: [0, 0, 0, 0],
    locations: {
      categories: ['Sukadana', 'Pekalongan', 'Batanghari', 'Way Jepara', 'Sekampung'],
      data: [0, 0, 0, 0, 0]
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/dashboard/stats');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  // GA4 Style Chart Configurations
  const mainChartOptions: any = {
    chart: { 
      type: 'area', 
      toolbar: { show: false }, 
      zoom: { enabled: false }, 
      sparkline: { enabled: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2, colors: ['#27ae60'] },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05, stops: [20, 100] } },
    xaxis: { 
      categories: stats.activeUsersTrend?.categories || [], 
      axisBorder: { show: false }, 
      axisTicks: { show: false },
      labels: {
        style: {
          colors: '#64748b',
          fontSize: '11px'
        }
      }
    },
    yaxis: { 
      labels: { 
        show: true,
        style: {
          colors: '#64748b',
          fontSize: '11px'
        }
      },
      min: 0,
      forceNiceScale: true
    },
    grid: { borderColor: '#f1f1f1', strokeDashArray: 4 },
    colors: ['#27ae60'],
    tooltip: { theme: 'light', x: { show: true } },
  };
  const mainChartSeries = [{ name: 'Pengguna Aktif', data: stats.activeUsersTrend?.data || [] }];

  const deviceChartOptions: any = {
    chart: { type: 'donut' },
    labels: ['Mobile', 'Desktop', 'Tablet'],
    colors: ['#27ae60', '#2ecc71', '#f59e0b'],
    legend: { position: 'bottom' },
    plotOptions: { 
      pie: { 
        donut: { 
          size: '75%', 
          labels: { 
            show: true, 
            name: { show: true }, 
            value: { show: true, fontWeight: 'bold' }, 
            total: { 
              show: true, 
              label: 'Total', 
              formatter: function(w: any) { 
                return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0) 
              } 
            } 
          } 
        } 
      } 
    },
    dataLabels: { enabled: false },
  };
  const deviceChartSeries = stats.devices || [0, 0, 0];

  const sourceChartOptions: any = {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 4, horizontal: true } },
    dataLabels: { enabled: false },
    colors: ['#2ecc71'],
    xaxis: { categories: ['Google', 'Direct', 'Social', 'Referral'] },
  };
  const sourceChartSeries = [{ name: 'Sesi', data: stats.sources || [0, 0, 0, 0] }];

  const cityChartOptions: any = {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } },
    dataLabels: { enabled: false },
    colors: ['#27ae60'],
    xaxis: { categories: stats.locations?.categories || [], axisBorder: { show: false } },
  };
  const citySeries = [{ name: 'Pengguna', data: stats.locations?.data || [] }];

  return (
    <div className="p-0 md:p-8 space-y-0 md:space-y-6 font-sans bg-[#f8fafc] min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-[14px] md:p-6 md:rounded-2xl shadow-sm border-b md:border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            Laporan Analitik
          </h1>
          <p className="text-sm text-gray-500 mt-1">Data dari 30 hari terakhir (Mocks berdasarkan integrasi API Analytics)</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-[#27ae60]/10 text-[#27ae60] px-4 py-2 rounded-xl text-sm font-bold border border-[#27ae60]/20">
            Disdukcapil App
          </div>
          <div className="bg-gray-50 text-gray-600 px-4 py-2 rounded-xl text-sm font-medium border border-gray-200">
            30 Hari Terakhir
          </div>
        </div>
      </div>

      <div className="px-0 py-4 md:p-0 space-y-4 md:space-y-6">
        {/* Database Stats - Quick view */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Berita', val: stats.totalNews, bg: 'bg-emerald-50', text: 'text-emerald-700' },
            { label: 'Total User', val: stats.totalUsers, bg: 'bg-emerald-50', text: 'text-emerald-700' },
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
          
          {/* Main User Trend Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-base font-bold text-gray-800">Tren Pengguna Aktif</h3>
                <p className="text-xs text-gray-500">Volume pengguna harian website</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-gray-900">
                  {stats.activeUsersTrend?.data ? stats.activeUsersTrend.data.reduce((a, b) => a + b, 0) : 0}
                </span>
                <span className="block text-[10px] text-green-500 font-bold">↑ 100% Real-time</span>
              </div>
            </div>
            <div>
              <Chart options={mainChartOptions} series={mainChartSeries} type="area" height={360} />
            </div>
          </div>

          {/* Realtime Stats / Right Panel */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#27ae60] to-[#2ecc71] p-6 rounded-2xl shadow-lg shadow-green-100 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-sm font-bold opacity-80 mb-4">Pengguna Real-time</h3>
                <div className="text-4xl font-black mb-1">{stats.realtimeUsers > 0 ? stats.realtimeUsers : 0}</div>
                <div className="text-xs opacity-80 mb-6">Pengguna aktif saat ini</div>
                
                <div className="space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider mb-2">Halaman Teratas</div>
                  {stats.realtimePages && stats.realtimePages.length > 0 ? (
                    stats.realtimePages.map((page: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center text-xs bg-white/10 p-2 rounded-lg">
                        <span className="truncate mr-2">{page.pathname}</span>
                        <span className="font-bold">{page.count}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-white/60 italic py-2">Tidak ada aktivitas</div>
                  )}
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-800 mb-4">Perangkat Utama</h3>
              <Chart options={deviceChartOptions} series={deviceChartSeries} type="donut" height="250" />
            </div>
          </div>
        </div>

        {/* Real-time Location Map Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-bold text-gray-800">Peta Sebaran Pengunjung (Lampung Timur)</h3>
              <p className="text-xs text-gray-500">Deteksi lokasi kunjungan riil per kecamatan secara langsung</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#27ae60] bg-[#27ae60]/10 px-3 py-1 rounded-full border border-[#27ae60]/20">
              <span className="w-2 h-2 rounded-full bg-[#27ae60] animate-ping"></span>
              Live Monitoring
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#f8fafc] rounded-2xl overflow-hidden border border-gray-100 h-[380px] relative">
              <AnalyticsMap locations={stats.locations} />
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-4">Aktivitas Teratas per Kecamatan</h4>
                <div className="space-y-3">
                  {stats.locations?.categories && stats.locations.categories.length > 0 ? (
                    stats.locations.categories.map((city, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                            {idx + 1}
                          </span>
                          <span className="text-sm text-gray-700 font-medium">{city}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-400">
                            ({stats.locations?.data ? ((stats.locations.data[idx] / stats.locations.data.reduce((a: number, b: number) => a + b, 1)) * 100).toFixed(0) : 0}%)
                          </span>
                          <span className="text-sm font-bold text-gray-900">
                            {stats.locations?.data ? stats.locations.data[idx] : 0}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-gray-400 italic py-4 text-center">
                      Tidak ada aktivitas kunjungan dalam 30 menit terakhir.
                    </div>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-4 border-t pt-4">
                Sistem analitik melacak IP Address pengunjung secara riil dan memetakan koordinat kecamatan di Kabupaten Lampung Timur.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 mb-4">Sumber Trafik Utama</h3>
            <Chart options={sourceChartOptions} series={sourceChartSeries} type="bar" height="200" />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 mb-4">Pengguna per Lokasi (Kecamatan)</h3>
            <Chart options={cityChartOptions} series={citySeries} type="bar" height="200" />
          </div>
        </div>
      </div>
    </div>
  );
}
