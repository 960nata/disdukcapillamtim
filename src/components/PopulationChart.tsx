'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function PopulationChart() {
  const [charts, setCharts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const res = await fetch('/api/charts');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setCharts(data);
          setActiveTab(data[0].name);
        } else {
          // Fallback static data structure if empty
          setCharts([
            {
              name: 'Total Penduduk',
              growthLabel: '+0.8%',
              points: [
                { year: '2020', valueLamtim: 1110393, valueProvinsi: 9010000 },
                { year: '2021', valueLamtim: 1113977, valueProvinsi: 9080000 },
                { year: '2022', valueLamtim: 1121782, valueProvinsi: 9180000 },
                { year: '2023', valueLamtim: 1129547, valueProvinsi: 9310000 },
                { year: '2024', valueLamtim: 1137280, valueProvinsi: 9420000 },
                { year: '2025', valueLamtim: 1145100, valueProvinsi: 9530000 },
              ]
            }
          ]);
          setActiveTab('Total Penduduk');
        }
      } catch (error) {
        console.error('Failed to fetch charts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCharts();
  }, []);

  const activeChart = charts.find(c => c.name === activeTab) || charts[0];
  if (!activeChart || loading) return null;

  const years = activeChart.points.map((p: any) => p.year);
  const dataLamtim = activeChart.points.map((p: any) => p.valueLamtim);
  const dataProvinsi = activeChart.points.map((p: any) => p.valueProvinsi);

  const options: ApexCharts.ApexOptions = {
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
      categories: years,
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
      markers: { radius: 12 },
      labels: { colors: '#4b5563' },
    },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 4,
    },
  };

  const series = [
    { name: 'Lampung Timur', data: dataLamtim },
    { name: 'Provinsi', data: dataProvinsi },
  ];

  return (
    <section className="pt-2 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-100 rounded-3xl p-4 md:p-8 shadow-sm">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 bg-gray-50/50 p-1.5 rounded-2xl">
            {charts.map((chart) => (
              <button
                key={chart.name}
                onClick={() => setActiveTab(chart.name)}
                className={`flex-1 min-w-[140px] text-center px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === chart.name
                    ? 'bg-white text-[#27ae60] shadow-sm ring-1 ring-gray-100'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className="flex flex-col items-center">
                  <span>{chart.name}</span>
                  {chart.growthLabel && (
                    <span className={`text-[9px] mt-0.5 ${activeTab === chart.name ? 'text-[#27ae60]' : 'text-gray-300'}`}>
                      ({chart.growthLabel})
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Chart Container */}
          <div className="w-full h-[400px] md:h-[500px]">
            <Chart options={options} series={series} type="bar" height="100%" />
          </div>
        </div>
      </div>
    </section>
  );
}

