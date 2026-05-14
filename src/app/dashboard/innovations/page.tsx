'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

type Innovation = {
  id: number;
  name: string;
  desc: string;
  status: string;
  createdAt: string;
};

export default function InnovationsPage() {
  const [innovations, setInnovations] = useState<Innovation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/innovations')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setInnovations(data);
        } else if (data.error) {
          setError(data.error);
        } else {
          setError('Format data tidak valid');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Gagal memuat data dari server');
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manajemen Inovasi</h1>
          <p className="text-xs text-gray-500">Kelola inovasi pelayanan Disdukcapil</p>
        </div>
        <button className="bg-[#27ae60] hover:bg-[#1e8449] text-white transition-all duration-300 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm">
          Tambah Inovasi
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-sm text-gray-500">Loading data...</div>
        ) : error ? (
          <div className="p-6 text-center text-sm text-red-500">{error}</div>
        ) : innovations.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">Belum ada data inovasi.</div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4">Nama Inovasi</th>
                <th scope="col" className="px-6 py-4">Deskripsi</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {innovations.map((item) => (
                <tr key={item.id} className="bg-white border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">{item.name}</td>
                  <td className="px-6 py-4">{item.desc}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      item.status === 'Aktif' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button className="text-[#27ae60] hover:underline text-xs font-bold">Edit</button>
                    <button className="text-red-500 hover:underline text-xs font-bold">Hapus</button>
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
