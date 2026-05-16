'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

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

export default function Statistics() {
  const [stats, setStats] = useState<any[]>([]);
  const [title, setTitle] = useState('Data Semester II 2025');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, settingsRes] = await Promise.all([
          fetch('/api/statistics'),
          fetch('/api/settings?key=stats_title')
        ]);
        
        const statsData = await statsRes.json();
        const settingsData = await settingsRes.json();
        
        if (Array.isArray(statsData) && statsData.length > 0) {
          setStats(statsData);
        }
        
        if (settingsData.value) setTitle(settingsData.value);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || stats.length === 0) return null;

  return (
    <section className="pt-16 pb-2 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">Statistik Penduduk Kabupaten Lampung Timur</h2>
          <p className="text-lg text-gray-500 font-medium">{title}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((item, index) => (
            <div key={index} className="group bg-white border border-gray-100 hover:border-[#27ae60] rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center">
              {/* Icon */}
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-[#27ae60] mb-4 group-hover:bg-[#27ae60]/10 transition-colors">
                {iconMap[item.label] || iconMap['default']}
              </div>

              {/* Value and Growth */}
              <div className="flex flex-col items-center mb-1">
                <div className="text-xl md:text-2xl font-black text-gray-900 flex items-baseline gap-1">
                  {item.value} <span className="text-[10px] font-bold text-gray-400 uppercase">{item.unit}</span>
                </div>
                {item.growth && (
                  <span className="bg-[#27ae60]/10 text-[#27ae60] text-[10px] font-black px-2 py-0.5 rounded-full mt-1.5 flex items-center gap-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                    {item.growth}
                  </span>
                )}
              </div>

              {/* Label */}
              <div className="text-[11px] font-bold text-gray-500 mt-2 uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

