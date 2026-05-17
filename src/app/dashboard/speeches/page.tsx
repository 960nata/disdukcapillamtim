'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import MediaLibraryModal from '@/components/MediaLibraryModal';

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
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [editingSpeech, setEditingSpeech] = useState<Speech | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    quote: '',
    image: '',
  });

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
    <div className="p-0 md:p-8 space-y-0 md:space-y-6 font-sans min-h-screen bg-gray-50/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-[14px] md:p-6 md:rounded-2xl shadow-sm border-b md:border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v14zm-7-10H7v2h5v-2zm0 4H7v2h5v-2zm5-8H7v2h10V6z"/></svg>
            Manajemen Sambutan
          </h1>
          <p className="text-sm text-gray-500">Kelola pidato/sambutan kepala daerah</p>
        </div>
        <button 
          onClick={() => {
            setEditingSpeech(null);
            setFormData({ name: '', title: '', quote: '', image: '' });
            setIsModalOpen(true);
          }}
          className="w-full sm:w-auto bg-[#27ae60] hover:bg-[#1e8449] text-white transition-all duration-300 rounded-xl px-5 py-3 text-sm font-bold shadow-lg shadow-green-100 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Tambah Sambutan
        </button>
      </div>

      <div className="px-0 py-4 md:p-0 space-y-4 md:space-y-6">

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
                <label className="block text-xs font-bold text-gray-600 mb-1">Foto Pejabat</label>
                <div className="flex items-center gap-3">
                  <div 
                    onClick={() => setIsMediaOpen(true)}
                    className="w-16 h-16 bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 relative group flex items-center justify-center cursor-pointer hover:border-[#27ae60] transition-colors"
                  >
                    {formData.image ? (
                      <>
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="text-[8px] text-white font-bold bg-black/50 px-1 py-0.5 rounded">Ganti</span>
                        </div>
                      </>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMediaOpen(true)}
                    className="text-xs font-bold bg-[#27ae60]/10 text-[#27ae60] hover:bg-[#27ae60]/20 transition-colors py-2 px-4 rounded-xl border border-transparent"
                  >
                    {formData.image ? 'Ubah dari Pustaka Media' : 'Pilih dari Pustaka Media'}
                  </button>
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
                  className="bg-[#27ae60] hover:bg-[#1e8449] text-white rounded-lg px-4 py-2 text-sm font-semibold shadow-sm"
                >
                  {editingSpeech ? 'Simpan' : 'Tambah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* WordPress Media Library Modal */}
      <MediaLibraryModal
        isOpen={isMediaOpen}
        onClose={() => setIsMediaOpen(false)}
        title="Pilih Foto Sambutan Pejabat"
        onSelect={(photo) => {
          setFormData((prev) => ({ ...prev, image: photo.url }));
        }}
      />
      </div>
    </div>
  );
}
