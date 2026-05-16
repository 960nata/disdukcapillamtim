'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

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

export default function ChartsManagementPage() {
  const [charts, setCharts] = useState<Chart[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Chart | null>(null);
  
  const [formData, setFormData] = useState<{
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

  useEffect(() => {
    fetchCharts();
  }, []);

  const fetchCharts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/charts');
      const data = await res.json();
      if (Array.isArray(data)) setCharts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingItem ? `/api/charts/${editingItem.id}` : '/api/charts';
    const method = editingItem ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingItem(null);
        fetchCharts();
      }
    } catch (error) {
      console.error('Failed to save chart:', error);
    }
  };

  const handleEdit = (item: Chart) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      growthLabel: item.growthLabel || '',
      order: item.order,
      points: item.points.length > 0 ? item.points : formData.points,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Hapus data grafik ini?')) {
      try {
        const res = await fetch(`/api/charts/${id}`, { method: 'DELETE' });
        if (res.ok) fetchCharts();
      } catch (error) {
        console.error('Failed to delete chart:', error);
      }
    }
  };

  const updatePoint = (index: number, field: keyof ChartPoint, value: string | number) => {
    const newPoints = [...formData.points];
    newPoints[index] = { 
      ...newPoints[index], 
      [field]: field === 'year' ? String(value) : parseFloat(String(value)) || 0 
    };
    setFormData({ ...formData, points: newPoints });
  };

  const addPoint = () => {
    const lastYear = parseInt(formData.points[formData.points.length - 1]?.year || '2025');
    setFormData({
      ...formData,
      points: [...formData.points, { year: String(lastYear + 1), valueLamtim: 0, valueProvinsi: 0 }]
    });
  };

  const removePoint = (index: number) => {
    const newPoints = [...formData.points];
    newPoints.splice(index, 1);
    setFormData({ ...formData, points: newPoints });
  };

  return (
    <div className="p-0 md:p-8 space-y-0 md:space-y-6 font-sans min-h-screen bg-gray-50/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-[14px] md:p-6 md:rounded-2xl shadow-sm border-b md:border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            Manajemen Grafik Demografi
          </h1>
          <p className="text-sm text-gray-500">Kelola data perbandingan tahunan untuk grafik di beranda.</p>
        </div>
        <button 
          onClick={() => {
            setEditingItem(null);
            setFormData({
              name: '',
              growthLabel: '',
              order: charts.length,
              points: [
                { year: '2020', valueLamtim: 0, valueProvinsi: 0 },
                { year: '2021', valueLamtim: 0, valueProvinsi: 0 },
                { year: '2022', valueLamtim: 0, valueProvinsi: 0 },
                { year: '2023', valueLamtim: 0, valueProvinsi: 0 },
                { year: '2024', valueLamtim: 0, valueProvinsi: 0 },
                { year: '2025', valueLamtim: 0, valueProvinsi: 0 },
              ],
            });
            setIsModalOpen(true);
          }}
          className="w-full sm:w-auto bg-[#27ae60] hover:bg-[#1e8449] text-white transition-all duration-300 rounded-xl px-5 py-3 text-sm font-bold shadow-lg shadow-green-100 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Tambah Grafik
        </button>
      </div>

      <div className="px-0 py-4 md:p-0 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-12 text-center text-gray-500">Memuat data grafik...</div>
          ) : charts.length === 0 ? (
            <div className="col-span-full py-12 text-center text-gray-500">Belum ada data grafik. Klik "Tambah Grafik" untuk memulai.</div>
          ) : (
            charts.map((chart) => (
              <div key={chart.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{chart.name}</h3>
                      <p className="text-xs font-bold text-[#27ae60]">{chart.growthLabel || '0%'}</p>
                    </div>
                    <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-lg font-bold text-gray-400">ORDER: {chart.order}</span>
                  </div>
                  <div className="space-y-2 mb-6">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Preview Data (3 Tahun Terakhir)</p>
                    {chart.points.slice(-3).map((p, i) => (
                      <div key={i} className="flex justify-between text-xs py-1 border-b border-gray-50">
                        <span className="text-gray-500">{p.year}</span>
                        <span className="font-mono font-bold text-gray-700">{p.valueLamtim.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-4 border-t border-gray-50">
                  <button 
                    onClick={() => handleEdit(chart)}
                    className="flex-1 py-2 text-xs font-bold bg-gray-50 text-gray-600 rounded-lg hover:bg-[#27ae60] hover:text-white transition-all"
                  >
                    Edit Data
                  </button>
                  <button 
                    onClick={() => handleDelete(chart.id)}
                    className="py-2 px-3 text-xs font-bold bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{editingItem ? 'Edit Grafik' : 'Tambah Grafik Baru'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Nama Grafik</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Contoh: Total Penduduk"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#27ae60] font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Label Pertumbuhan</label>
                  <input 
                    type="text" 
                    value={formData.growthLabel}
                    onChange={(e) => setFormData({...formData, growthLabel: e.target.value})}
                    placeholder="Contoh: +0.8%"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#27ae60]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Urutan (Tab)</label>
                  <input 
                    type="number" 
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#27ae60]"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#27ae60] text-white flex items-center justify-center text-[10px]">2</span>
                    Data Poin Tahunan
                  </h3>
                  <button 
                    type="button" 
                    onClick={addPoint}
                    className="text-xs font-bold text-[#27ae60] hover:underline"
                  >
                    + Tambah Tahun
                  </button>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-2xl space-y-3">
                  <div className="grid grid-cols-12 gap-4 px-2 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                    <div className="col-span-2 text-center">Tahun</div>
                    <div className="col-span-4">Lampung Timur</div>
                    <div className="col-span-4">Provinsi</div>
                    <div className="col-span-2"></div>
                  </div>
                  {formData.points.map((point, index) => (
                    <div key={index} className="grid grid-cols-12 gap-3 items-center bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                      <div className="col-span-2">
                        <input 
                          type="text" 
                          value={point.year}
                          onChange={(e) => updatePoint(index, 'year', e.target.value)}
                          className="w-full text-center text-sm font-bold bg-gray-50 border-none rounded-lg py-2 focus:ring-1 focus:ring-[#27ae60]"
                        />
                      </div>
                      <div className="col-span-4">
                        <input 
                          type="number" 
                          value={point.valueLamtim}
                          onChange={(e) => updatePoint(index, 'valueLamtim', e.target.value)}
                          className="w-full text-sm font-mono bg-gray-50 border-none rounded-lg py-2 px-3 focus:ring-1 focus:ring-[#27ae60]"
                        />
                      </div>
                      <div className="col-span-4">
                        <input 
                          type="number" 
                          value={point.valueProvinsi}
                          onChange={(e) => updatePoint(index, 'valueProvinsi', e.target.value)}
                          className="w-full text-sm font-mono bg-gray-50 border-none rounded-lg py-2 px-3 focus:ring-1 focus:ring-[#27ae60]"
                        />
                      </div>
                      <div className="col-span-2 text-center">
                        <button 
                          type="button" 
                          onClick={() => removePoint(index)}
                          className="text-red-400 hover:text-red-600 p-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-[#27ae60] text-white py-4 rounded-2xl text-sm font-bold shadow-xl shadow-green-100 hover:bg-[#1e8449] transition-all"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
