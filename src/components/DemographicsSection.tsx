'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const iconMap: { [key: string]: React.ReactNode } = {
  'Total Penduduk': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
  ),
  'Penduduk Laki-laki': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="14" r="5"></circle><path d="M13.5 10.5l4.5-4.5"></path><path d="M14 6h4v4"></path></svg>
  ),
  'Penduduk Perempuan': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="5"></circle><path d="M12 14v6"></path><path d="M9 17h6"></path></svg>
  ),
  'Jumlah KK': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
  ),
  'default': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>
  )
};

export default function DemographicsSection() {
  const [stats, setStats] = useState<any[]>([]);
  const [statsTitle, setStatsTitle] = useState('Data Semester II 2025');
  const [charts, setCharts] = useState<any[]>([]);
  const [activeChartTab, setActiveChartTab] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, chartsRes, settingsRes] = await Promise.all([
          fetch('/api/statistics'),
          fetch('/api/charts'),
          fetch('/api/settings?key=stats_title')
        ]);
        
        const statsData = await statsRes.json();
        const chartsData = await chartsRes.json();
        const settingsData = await settingsRes.json();
        
        if (Array.isArray(statsData)) setStats(statsData);
        if (Array.isArray(chartsData) && chartsData.length > 0) {
          setCharts(chartsData);
          setActiveChartTab(chartsData[0].name);
        }
        if (settingsData.value) setStatsTitle(settingsData.value);
      } catch (error) {
        console.error('Failed to fetch demographics data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || (stats.length === 0 && charts.length === 0)) return null;

  const activeChart = charts.find(c => c.name === activeChartTab) || charts[0];
  
  const chartOptions: ApexCharts.ApexOptions = activeChart ? {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#27ae60', '#94a3b8'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 8,
        dataLabels: { position: 'top' },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val, opts: any) => {
        const { seriesIndex, dataPointIndex, w } = opts;
        const series = w.config.series;
        if (dataPointIndex === 0) return '';
        const prevVal = series[seriesIndex].data[dataPointIndex - 1];
        if (!prevVal || prevVal === 0) return '';
        const growth = ((Number(val) - Number(prevVal)) / Number(prevVal)) * 100;
        return `${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%`;
      },
      offsetY: -20,
      style: {
        fontSize: '10px',
        fontWeight: 800,
        colors: ['#374151'],
      },
    },
    stroke: {
      show: true,
      width: 3,
      colors: ['transparent'],
    },
    xaxis: {
      categories: activeChart.points.map((p: any) => p.year),
      labels: {
        style: {
          colors: '#94a3b8',
          fontSize: '11px',
          fontWeight: 600,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#94a3b8',
          fontSize: '11px',
          fontWeight: 600,
        },
        formatter: (val) => val.toLocaleString('id-ID'),
      },
    },
    fill: { opacity: 1 },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val, opts: any) => {
          const { series, seriesIndex, dataPointIndex } = opts;
          let text = val.toLocaleString('id-ID');
          if (dataPointIndex > 0) {
            const prevVal = series[seriesIndex][dataPointIndex - 1];
            if (prevVal > 0) {
              const growth = ((val - prevVal) / prevVal) * 100;
              text += ` (${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%)`;
            }
          }
          return text;
        },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '12px',
      fontWeight: 600,
      labels: { colors: '#4b5563' },
    },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 4,
    },
  } : {};

  const chartSeries = activeChart ? [
    { name: 'Lampung Timur', data: activeChart.points.map((p: any) => p.valueLamtim) },
    { name: 'Provinsi', data: activeChart.points.map((p: any) => p.valueProvinsi) },
  ] : [];

  return (
    <section className="py-20 bg-white" id="statistik">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Data & Statistik Kependudukan</h2>
          <div className="flex items-center justify-center gap-2">
             <div className="h-1 w-12 bg-[#27ae60] rounded-full"></div>
             <p className="text-lg text-gray-500 font-bold uppercase tracking-widest text-sm">{statsTitle}</p>
             <div className="h-1 w-12 bg-[#27ae60] rounded-full"></div>
          </div>
        </div>

        {/* Top Cards: Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {stats.map((item, index) => (
            <div key={index} className="group bg-white border border-gray-100 hover:border-[#27ae60] rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#27ae60] mb-5 group-hover:bg-[#27ae60] group-hover:text-white transition-all duration-300">
                {iconMap[item.label] || iconMap['default']}
              </div>

              <div className="flex flex-col items-center mb-2">
                <div className="text-2xl md:text-3xl font-black text-gray-900 flex items-baseline gap-1.5">
                  {item.value} 
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{item.unit}</span>
                </div>
                {item.growth && (
                  <span className="bg-[#27ae60]/10 text-[#27ae60] text-[10px] font-black px-3 py-1 rounded-full mt-2 flex items-center gap-1 ring-1 ring-[#27ae60]/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                    {item.growth}
                  </span>
                )}
              </div>

              <div className="text-[11px] font-black text-gray-400 mt-2 uppercase tracking-[0.2em]">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Bottom Section: Charts */}
        {charts.length > 0 && (
          <div className="bg-gray-50/50 border border-gray-100 rounded-[40px] p-4 md:p-10 shadow-inner">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-1">Grafik Perbandingan Tahunan</h3>
                <p className="text-sm text-gray-400 font-medium">Visualisasi pertumbuhan penduduk antar wilayah</p>
              </div>
              
              <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 w-full md:w-auto">
                {charts.map((chart) => (
                  <button
                    key={chart.name}
                    onClick={() => setActiveChartTab(chart.name)}
                    className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
                      activeChartTab === chart.name
                        ? 'bg-[#27ae60] text-white shadow-lg shadow-green-200'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {chart.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-gray-50">
              <div className="w-full h-[350px] md:h-[450px]">
                {activeChart && (
                  <Chart options={chartOptions} series={chartSeries} type="bar" height="100%" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
