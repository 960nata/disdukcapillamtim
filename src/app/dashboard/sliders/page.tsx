'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

type Slider = {
  id: number;
  title: string | null;
  subtitle: string | null;
  imageUrl: string;
  link: string | null;
  order: number;
};

export default function SlidersPage() {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/sliders')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSliders(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus slider ini?')) {
      try {
        const res = await fetch(`/api/sliders/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setSliders(sliders.filter((s) => s.id !== id));
        }
      } catch (error) {
        console.error('Failed to delete slider:', error);
      }
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manajemen Slider Banner</h1>
          <p className="text-xs text-gray-500">Kelola banner slider di halaman utama</p>
        </div>
        <button className="bg-[#27ae60] hover:bg-[#1e8449] text-white transition-all duration-300 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm">
          Tambah Slider
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-sm text-gray-500">Loading data...</div>
        ) : sliders.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">
            Belum ada data slider dari database.
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4">Gambar</th>
                <th scope="col" className="px-6 py-4">Judul</th>
                <th scope="col" className="px-6 py-4">Sub Judul</th>
                <th scope="col" className="px-6 py-4">Order</th>
                <th scope="col" className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {sliders.map((slider) => (
                <tr key={slider.id} className="bg-white border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="w-16 h-10 bg-gray-100 rounded-lg overflow-hidden">
                      <img src={slider.imageUrl} alt={slider.title || 'Slider'} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">{slider.title || '-'}</td>
                  <td className="px-6 py-4">{slider.subtitle || '-'}</td>
                  <td className="px-6 py-4">{slider.order}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button className="text-[#27ae60] hover:underline text-xs font-bold">Edit</button>
                    <button 
                      onClick={() => handleDelete(slider.id)}
                      className="text-red-500 hover:underline text-xs font-bold"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
