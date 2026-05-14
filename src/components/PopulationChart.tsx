'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const lamtimData = {
  'Total Penduduk': [1110393, 1113977, 1121782, 1129547, 1137280, 1145100],
  'Wajib KTP': [828140, 832450, 844210, 851600, 858900, 862400],
  'Jumlah KK': [358912, 362450, 368813, 371200, 374150, 376249],
  'Angka Kelahiran': [14850, 15100, 15420, 15800, 16150, 16500],
};

const provinsiData = {
  'Total Penduduk': [9010000, 9080000, 9180000, 9310000, 9420000, 9530000],
  'Wajib KTP': [6750000, 6820000, 6950000, 7120000, 7250000, 7340000],
  'Jumlah KK': [2750000, 2810000, 2920000, 3010000, 3120000, 3210000],
  'Angka Kelahiran': [148000, 151200, 154500, 157000, 161400, 164800],
};

const years = ['2020', '2021', '2022', '2023', '2024', '2025'];

export default function PopulationChart() {
  const [activeTab, setActiveTab] = React.useState('Total Penduduk');

  const growthData = {
    'Total Penduduk': '+0.8%',
    'Wajib KTP': '+1.5%',
    'Jumlah KK': '+1.1%',
    'Angka Kelahiran': '+2.3%',
  };

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    colors: ['#27ae60', '#94a3b8'], // Leaf Green and Slate Gray
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val, opts: any) => {
        const { seriesIndex, dataPointIndex, w } = opts;
        const series = w.config.series;
        if (dataPointIndex === 0) return '';
        const prevVal = series[seriesIndex].data[dataPointIndex - 1];
        if (!prevVal) return '';
        const currentVal = Number(val);
        const previousVal = Number(prevVal);
        const growth = ((currentVal - previousVal) / previousVal) * 100;
        return `${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%`;
      },
      offsetY: -20,
      style: {
        fontSize: '10px',
        colors: ['#374151'],
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: years,
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '12px',
        },
        formatter: (val) => {
          return val.toLocaleString('id-ID');
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val, opts: any) => {
          const { series, seriesIndex, dataPointIndex } = opts;
          let text = val.toLocaleString('id-ID') + ' jiwa';
          if (dataPointIndex > 0) {
            const prevVal = series[seriesIndex][dataPointIndex - 1];
            const growth = ((val - prevVal) / prevVal) * 100;
            text += ` (${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%)`;
          }
          return text;
        },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        colors: '#374151',
      },
    },
    grid: {
      borderColor: '#f3f4f6',
    },
    responsive: [{
      breakpoint: 640,
      options: {
        dataLabels: {
          style: {
            fontSize: '8px',
          },
          offsetY: -10,
        },
      },
    }],
  };

  const series = [
    {
      name: 'Lampung Timur',
      data: lamtimData[activeTab as keyof typeof lamtimData],
    },
    {
      name: 'Provinsi',
      data: provinsiData[activeTab as keyof typeof provinsiData],
    },
  ];

  const activeData = lamtimData[activeTab as keyof typeof lamtimData];
  const lastVal = activeData[activeData.length - 1];
  const prevVal = activeData[activeData.length - 2];
  const activeGrowth = ((lastVal - prevVal) / prevVal) * 100;

  return (
    <section className="pt-2 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          {/* Tabs */}
          <div className="flex border-b border-gray-100 mb-6">
            {Object.keys(lamtimData).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-center px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-[2px] ${activeTab === tab
                  ? 'border-[#27ae60] text-[#27ae60]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab} <span className="text-xs font-normal opacity-70">({growthData[tab as keyof typeof growthData]})</span>
              </button>
            ))}
          </div>



          {/* Chart */}
          <div className="w-full h-[450px]">
            <Chart options={options} series={series} type="bar" height="100%" />
          </div>
        </div>
      </div>
    </section>
  );
}
