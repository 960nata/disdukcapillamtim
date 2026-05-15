'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

type Speech = {
  id: number;
  name: string;
  title: string;
  quote: string;
  image: string | null;
};

export default function SpeechesPage() {
  const [speeches, setSpeeches] = useState<Speech[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpeech, setEditingSpeech] = useState<Speech | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    quote: '',
    image: '',
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSpeeches();
  }, []);

  const fetchSpeeches = () => {
    setLoading(true);
    fetch('/api/speeches')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSpeeches(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (data.url) {
        setFormData((prev) => ({ ...prev, image: data.url }));
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingSpeech ? `/api/speeches/${editingSpeech.id}` : '/api/speeches';
    const method = editingSpeech ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingSpeech(null);
        setFormData({ name: '', title: '', quote: '', image: '' });
        fetchSpeeches();
      }
    } catch (error) {
      console.error('Failed to save speech:', error);
    }
  };

  const handleEdit = (speech: Speech) => {
    setEditingSpeech(speech);
    setFormData({
      name: speech.name,
      title: speech.title,
      quote: speech.quote,
      image: speech.image || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus sambutan ini?')) {
      try {
        const res = await fetch(`/api/speeches/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          fetchSpeeches();
        }
      } catch (error) {
        console.error('Failed to delete speech:', error);
      }
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manajemen Sambutan</h1>
          <p className="text-xs text-gray-500">Kelola pidato/sambutan kepala daerah</p>
        </div>
        <button 
          onClick={() => {
            setEditingSpeech(null);
            setFormData({ name: '', title: '', quote: '', image: '' });
            setIsModalOpen(true);
          }}
          className="bg-[#27ae60] hover:bg-[#1e8449] text-white transition-all duration-300 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm"
        >
          Tambah Sambutan
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-sm text-gray-500">Loading data...</div>
        ) : speeches.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">
            Belum ada data sambutan dari database.
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4">Foto</th>
                <th scope="col" className="px-6 py-4">Nama</th>
                <th scope="col" className="px-6 py-4">Jabatan</th>
                <th scope="col" className="px-6 py-4">Isi Sambutan</th>
                <th scope="col" className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {speeches.map((speech) => (
                <tr key={speech.id} className="bg-white border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden">
                      {speech.image ? (
                        <img src={speech.image} alt={speech.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Pic</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">{speech.name}</td>
                  <td className="px-6 py-4">{speech.title}</td>
                  <td className="px-6 py-4 truncate max-w-xs">{speech.quote}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button 
                      onClick={() => handleEdit(speech)}
                      className="text-[#27ae60] hover:underline text-xs font-bold"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(speech.id)}
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

      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg space-y-4">
            <h2 className="text-lg font-bold text-gray-900">
              {editingSpeech ? 'Edit Sambutan' : 'Tambah Sambutan'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Nama Pejabat</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27ae60]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Jabatan</label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27ae60]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Isi Sambutan</label>
                <textarea 
                  name="quote"
                  value={formData.quote}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27ae60] h-24"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Foto (Auto AVIF)</label>
                <div className="flex items-center gap-3">
                  {formData.image && (
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#27ae60]/10 file:text-[#27ae60] hover:file:bg-[#27ae60]/20"
                  />
                  {uploading && <span className="text-xs text-gray-500">Uploading...</span>}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  disabled={uploading}
                  className="bg-[#27ae60] hover:bg-[#1e8449] text-white rounded-lg px-4 py-2 text-sm font-semibold shadow-sm disabled:bg-gray-400"
                >
                  {editingSpeech ? 'Simpan' : 'Tambah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
