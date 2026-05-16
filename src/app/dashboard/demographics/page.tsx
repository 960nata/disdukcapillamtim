'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

type Statistic = {
  id: number;
  label: string;
  value: string;
  unit: string;
  growth: string | null;
  order: number;
};

type ChartPoint = {
  year: string;
  valueLamtim: number;
  valueProvinsi: number;
};

type Chart = {
  id: number;
  name: string;
  growthLabel: string | null;
  order: number;
  points: ChartPoint[];
};

export default function DemographicsManagementPage() {
  const [activeSubTab, setActiveSubTab] = useState<'statistics' | 'charts'>('statistics');
  
  // Statistics State
  const [stats, setStats] = useState<Statistic[]>([]);
  const [statsTitle, setStatsTitle] = useState('Data Semester II 2025');
  const [isStatModalOpen, setIsStatModalOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<Statistic | null>(null);
  const [statFormData, setStatFormData] = useState({
    label: '',
    value: '',
    unit: 'jiwa',
    growth: '',
    order: 0,
  });

  // Charts State
  const [charts, setCharts] = useState<Chart[]>([]);
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [editingChart, setEditingChart] = useState<Chart | null>(null);
  const [chartFormData, setChartFormData] = useState<{
    name: string;
    growthLabel: string;
    order: number;
    points: ChartPoint[];
  }>({
    name: '',
    growthLabel: '',
    order: 0,
    points: [
      { year: '2020', valueLamtim: 0, valueProvinsi: 0 },
      { year: '2021', valueLamtim: 0, valueProvinsi: 0 },
      { year: '2022', valueLamtim: 0, valueProvinsi: 0 },
      { year: '2023', valueLamtim: 0, valueProvinsi: 0 },
      { year: '2024', valueLamtim: 0, valueProvinsi: 0 },
      { year: '2025', valueLamtim: 0, valueProvinsi: 0 },
    ],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
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
      if (Array.isArray(chartsData)) setCharts(chartsData);
      if (settingsData.value) setStatsTitle(settingsData.value);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Statistics Handlers
  const handleStatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingStat ? `/api/statistics/${editingStat.id}` : '/api/statistics';
    const method = editingStat ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(statFormData),
      });
      if (res.ok) {
        setIsStatModalOpen(false);
        fetchData();
      }
    } catch (error) { console.error(error); }
  };

  const handleUpdateStatsTitle = async () => {
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'stats_title', value: statsTitle }),
      });
      alert('Judul statistik berhasil diperbarui!');
    } catch (err) { console.error(err); }
  };

  // Chart Handlers
  const handleChartSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingChart ? `/api/charts/${editingChart.id}` : '/api/charts';
    const method = editingChart ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chartFormData),
      });
      if (res.ok) {
        setIsChartModalOpen(false);
        fetchData();
      }
    } catch (error) { console.error(error); }
  };

  const updateChartPoint = (index: number, field: keyof ChartPoint, value: string | number) => {
    const newPoints = [...chartFormData.points];
    newPoints[index] = { 
      ...newPoints[index], 
      [field]: field === 'year' ? String(value) : parseFloat(String(value)) || 0 
    };
    setChartFormData({ ...chartFormData, points: newPoints });
  };

  return (
    <div className="p-0 md:p-8 space-y-0 md:space-y-6 font-sans min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white p-[14px] md:p-8 md:rounded-3xl shadow-sm border-b md:border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 flex items-center gap-3">
              <div className="p-2 bg-[#27ae60]/10 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>
              </div>
              Manajemen Data Demografi
            </h1>
            <p className="text-sm font-medium text-gray-400">Kelola angka statistik dan grafik penduduk Lampung Timur dalam satu tempat.</p>
          </div>
        </div>

        {/* Unified Tabs */}
        <div className="flex gap-2 mt-8 bg-gray-50 p-1.5 rounded-2xl w-full md:w-fit">
          <button 
            onClick={() => setActiveSubTab('statistics')}
            className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-sm font-bold transition-all ${activeSubTab === 'statistics' ? 'bg-white text-[#27ae60] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Angka Statistik
          </button>
          <button 
            onClick={() => setActiveSubTab('charts')}
            className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-sm font-bold transition-all ${activeSubTab === 'charts' ? 'bg-white text-[#27ae60] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Grafik Perbandingan
          </button>
        </div>
      </div>

      <div className="px-0 py-4 md:p-0">
        {activeSubTab === 'statistics' ? (
          <div className="space-y-6">
            {/* Title Setting */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-end gap-4">
              <div className="flex-grow">
                <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Judul Periode Data</label>
                <input 
                  type="text" 
                  value={statsTitle}
                  onChange={(e) => setStatsTitle(e.target.value)}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] font-bold text-gray-700"
                />
              </div>
              <button 
                onClick={handleUpdateStatsTitle}
                className="bg-gray-900 text-white px-8 py-4 rounded-2xl text-sm font-bold hover:bg-black transition-all shadow-lg shadow-gray-200"
              >
                Update Judul
              </button>
            </div>

            {/* Stats Table */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Daftar Angka Statistik</h3>
                <button 
                  onClick={() => {
                    setEditingStat(null);
                    setStatFormData({ label: '', value: '', unit: 'jiwa', growth: '', order: stats.length });
                    setIsStatModalOpen(true);
                  }}
                  className="text-xs font-bold text-[#27ae60] hover:underline"
                >
                  + Tambah Data
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-6 py-5 font-black text-gray-400 uppercase tracking-widest text-[10px]">Label</th>
                      <th className="px-6 py-5 font-black text-gray-400 uppercase tracking-widest text-[10px]">Nilai</th>
                      <th className="px-6 py-5 font-black text-gray-400 uppercase tracking-widest text-[10px]">Pertumbuhan</th>
                      <th className="px-6 py-5 font-black text-gray-400 uppercase tracking-widest text-[10px] text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400">Memuat data...</td></tr>
                    ) : stats.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-5 font-bold text-gray-900">{item.label}</td>
                        <td className="px-6 py-5 font-mono text-gray-600 font-bold">{item.value} <span className="text-[10px] text-gray-400 uppercase">{item.unit}</span></td>
                        <td className="px-6 py-5">
                          {item.growth ? (
                            <span className="bg-[#27ae60]/10 text-[#27ae60] text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                              {item.growth}
                            </span>
                          ) : '-'}
                        </td>
                        <td className="px-6 py-5 text-right space-x-4">
                          <button onClick={() => {
                            setEditingStat(item);
                            setStatFormData({ label: item.label, value: item.value, unit: item.unit, growth: item.growth || '', order: item.order });
                            setIsStatModalOpen(true);
                          }} className="text-[#27ae60] font-bold text-xs">Edit</button>
                          <button onClick={async () => {
                            if (confirm('Hapus data ini?')) {
                              await fetch(`/api/statistics/${item.id}`, { method: 'DELETE' });
                              fetchData();
                            }
                          }} className="text-red-500 font-bold text-xs">Hapus</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {charts.map((chart) => (
              <div key={chart.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                   <span className="text-[10px] bg-gray-50 px-2 py-1 rounded-lg font-black text-gray-300 uppercase">TAB {chart.order + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 mb-1">{chart.name}</h3>
                  <p className="text-xs font-black text-[#27ae60] mb-6 uppercase tracking-wider">{chart.growthLabel || '0%'}</p>
                  
                  <div className="space-y-3 mb-8">
                    {chart.points.slice(-3).map((p, i) => (
                      <div key={i} className="flex justify-between items-center text-[11px] py-1.5 border-b border-gray-50">
                        <span className="text-gray-400 font-bold uppercase">{p.year}</span>
                        <span className="font-mono font-black text-gray-700">{p.valueLamtim.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-4 border-t border-gray-50">
                  <button 
                    onClick={() => {
                      setEditingChart(chart);
                      setChartFormData({ name: chart.name, growthLabel: chart.growthLabel || '', order: chart.order, points: chart.points });
                      setIsChartModalOpen(true);
                    }}
                    className="flex-1 py-3 text-xs font-bold bg-[#27ae60] text-white rounded-xl shadow-lg shadow-green-50 hover:bg-[#1e8449] transition-all"
                  >
                    Edit Grafik
                  </button>
                  <button 
                    onClick={async () => {
                      if (confirm('Hapus grafik ini?')) {
                        await fetch(`/api/charts/${chart.id}`, { method: 'DELETE' });
                        fetchData();
                      }
                    }}
                    className="p-3 text-xs font-bold bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              </div>
            ))}
            <button 
              onClick={() => {
                setEditingChart(null);
                setChartFormData({
                  name: '', growthLabel: '', order: charts.length,
                  points: [
                    { year: '2020', valueLamtim: 0, valueProvinsi: 0 },
                    { year: '2021', valueLamtim: 0, valueProvinsi: 0 },
                    { year: '2022', valueLamtim: 0, valueProvinsi: 0 },
                    { year: '2023', valueLamtim: 0, valueProvinsi: 0 },
                    { year: '2024', valueLamtim: 0, valueProvinsi: 0 },
                    { year: '2025', valueLamtim: 0, valueProvinsi: 0 },
                  ]
                });
                setIsChartModalOpen(true);
              }}
              className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-[#27ae60] hover:text-[#27ae60] transition-all group min-h-[250px]"
            >
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </div>
              <span className="text-sm font-bold">Tambah Grafik Baru</span>
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {isStatModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] p-8 w-full max-w-md space-y-8 shadow-2xl">
            <h2 className="text-2xl font-black text-gray-900">{editingStat ? 'Edit Statistik' : 'Tambah Statistik'}</h2>
            <form onSubmit={handleStatSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Label Data</label>
                <input type="text" value={statFormData.label} onChange={(e) => setStatFormData({...statFormData, label: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] font-bold" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Nilai</label>
                  <input type="text" value={statFormData.value} onChange={(e) => setStatFormData({...statFormData, value: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] font-mono font-bold" required />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Satuan</label>
                  <input type="text" value={statFormData.unit} onChange={(e) => setStatFormData({...statFormData, unit: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] font-bold" required />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Pertumbuhan</label>
                <input type="text" value={statFormData.growth} onChange={(e) => setStatFormData({...statFormData, growth: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] font-bold" placeholder="+0.0%" />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsStatModalOpen(false)} className="flex-1 py-4 font-bold text-gray-400">Batal</button>
                <button type="submit" className="flex-1 bg-[#27ae60] text-white font-black py-4 rounded-2xl shadow-xl shadow-green-100">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isChartModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-gray-900">{editingChart ? 'Edit Grafik' : 'Tambah Grafik'}</h2>
              <button onClick={() => setIsChartModalOpen(false)} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <form onSubmit={handleChartSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Nama Grafik</label>
                  <input type="text" value={chartFormData.name} onChange={(e) => setChartFormData({...chartFormData, name: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] font-bold" required />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Label Tumbuh</label>
                  <input type="text" value={chartFormData.growthLabel} onChange={(e) => setChartFormData({...chartFormData, growthLabel: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] font-bold" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Urutan Tab</label>
                  <input type="number" value={chartFormData.order} onChange={(e) => setChartFormData({...chartFormData, order: parseInt(e.target.value)})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#27ae60] font-bold" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#27ae60] rounded-full"></div>
                  Data Poin Tahunan
                </h3>
                <div className="bg-gray-50/50 p-6 rounded-[24px] space-y-4 border border-gray-100">
                  <div className="grid grid-cols-12 gap-4 px-2 text-[9px] font-black text-gray-300 uppercase tracking-widest">
                    <div className="col-span-2">Tahun</div>
                    <div className="col-span-5">Lampung Timur</div>
                    <div className="col-span-5">Provinsi</div>
                  </div>
                  {chartFormData.points.map((p, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-3 items-center">
                      <div className="col-span-2">
                        <input type="text" value={p.year} onChange={(e) => updateChartPoint(idx, 'year', e.target.value)} className="w-full text-center px-2 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-bold shadow-sm" />
                      </div>
                      <div className="col-span-5">
                        <input type="number" value={p.valueLamtim} onChange={(e) => updateChartPoint(idx, 'valueLamtim', e.target.value)} className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-mono font-bold shadow-sm" />
                      </div>
                      <div className="col-span-5">
                        <input type="number" value={p.valueProvinsi} onChange={(e) => updateChartPoint(idx, 'valueProvinsi', e.target.value)} className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-mono font-bold shadow-sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsChartModalOpen(false)} className="flex-1 py-4 font-bold text-gray-400">Batal</button>
                <button type="submit" className="flex-1 bg-[#27ae60] text-white font-black py-4 rounded-[20px] shadow-xl shadow-green-100 hover:scale-[1.02] transition-transform">Simpan Data Grafik</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
