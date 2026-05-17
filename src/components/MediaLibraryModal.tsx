'use client';

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Photo = {
  id: number;
  url: string;
  title: string | null;
  tags: string | null;
  caption: string | null;
  createdAt: string;
};

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (photo: { id: number; url: string; title: string | null }) => void;
  title?: string;
  allowMultiple?: boolean;
  onSelectMultiple?: (photos: { id: number; url: string; title: string | null }[]) => void;
}

export default function MediaLibraryModal({
  isOpen,
  onClose,
  onSelect,
  title = 'Pilih Media',
  allowMultiple = false,
  onSelectMultiple,
}: MediaLibraryModalProps) {
  const [activeTab, setActiveTab] = useState<'library' | 'upload'>('library');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('Semua');
  const [selectedPhotos, setSelectedPhotos] = useState<Photo[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<{ name: string; progress: number; error?: string }[]>([]);

  // Selected photo for detail sidebar
  const [detailPhoto, setDetailPhoto] = useState<Partial<Photo> | null>(null);
  const [savingDetail, setSavingDetail] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // Available tags
  const tagsList = ['Semua', 'Pelayanan', 'Kegiatan', 'Edukasi', 'Internal', 'Fasilitas', 'Digital'];

  useEffect(() => {
    if (isOpen) {
      fetchPhotos();
      setSelectedPhotos([]);
      setDetailPhoto(null);
    }
  }, [isOpen]);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.gallery) {
        setPhotos(data.gallery);
      }
    } catch (err) {
      console.error('Failed to fetch library:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleUploadFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleUploadFiles(Array.from(e.target.files));
    }
  };

  const handleUploadFiles = async (files: File[]) => {
    const validImageFiles = files.filter(file => file.type.startsWith('image/'));
    if (validImageFiles.length === 0) {
      alert('Hanya file gambar yang diperbolehkan.');
      return;
    }

    setActiveTab('library'); // Switch back to library to show upload results and progress list
    setLoading(true);

    const initialUploadState = validImageFiles.map(f => ({ name: f.name, progress: 10 }));
    setUploadingFiles(initialUploadState);

    for (let i = 0; i < validImageFiles.length; i++) {
      const file = validImageFiles[i];
      const formData = new FormData();
      formData.append('file', file);

      // Update progress
      setUploadingFiles(prev => prev.map((item, idx) => idx === i ? { ...item, progress: 40 } : item));

      try {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) throw new Error('Gagal mengunggah ke server');
        const uploadData = await uploadRes.json();

        if (uploadData.url) {
          setUploadingFiles(prev => prev.map((item, idx) => idx === i ? { ...item, progress: 70 } : item));

          // Create record in gallery table
          // Generate title from filename
          const cleanName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
          const formattedTitle = cleanName
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());

          const galleryRes = await fetch('/api/gallery', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              url: uploadData.url,
              title: formattedTitle,
              tags: 'Kegiatan',
              description: '',
              caption: '',
            }),
          });

          if (galleryRes.ok) {
            const newPhoto = await galleryRes.json();
            // Prepend new photo to list
            setPhotos(prev => [newPhoto, ...prev]);
            
            // Auto select if it is the first/only file, or add to selected
            if (i === 0 && !allowMultiple) {
              setSelectedPhotos([newPhoto]);
              setDetailPhoto(newPhoto);
            } else if (allowMultiple) {
              setSelectedPhotos(prev => [...prev, newPhoto]);
            }

            setUploadingFiles(prev => prev.map((item, idx) => idx === i ? { ...item, progress: 100 } : item));
          } else {
            throw new Error('Gagal mendaftarkan ke database galeri');
          }
        }
      } catch (err: any) {
        console.error(`Upload error for ${file.name}:`, err);
        setUploadingFiles(prev => prev.map((item, idx) => idx === i ? { ...item, progress: 100, error: err.message || 'Error' } : item));
      }
    }

    setLoading(false);
    // Clear uploading files state after 3 seconds
    setTimeout(() => {
      setUploadingFiles([]);
    }, 4000);
  };

  const handleSelectPhoto = (photo: Photo) => {
    if (allowMultiple) {
      const exists = selectedPhotos.find(p => p.id === photo.id);
      if (exists) {
        setSelectedPhotos(prev => prev.filter(p => p.id !== photo.id));
        setDetailPhoto(null);
      } else {
        setSelectedPhotos(prev => [...prev, photo]);
        setDetailPhoto(photo);
      }
    } else {
      setSelectedPhotos([photo]);
      setDetailPhoto(photo);
    }
  };

  const handleSaveDetail = async () => {
    if (!detailPhoto || !detailPhoto.id) return;
    setSavingDetail(true);

    try {
      const res = await fetch(`/api/gallery/${detailPhoto.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(detailPhoto),
      });

      if (res.ok) {
        const updatedPhoto = await res.json();
        // Update state list
        setPhotos(prev => prev.map(p => p.id === updatedPhoto.id ? updatedPhoto : p));
        // Update selected list
        setSelectedPhotos(prev => prev.map(p => p.id === updatedPhoto.id ? updatedPhoto : p));
        alert('Detail media berhasil diperbarui!');
      } else {
        alert('Gagal menyimpan detail media');
      }
    } catch (error) {
      console.error('Failed to save media details:', error);
      alert('Gagal menghubungi server');
    } finally {
      setSavingDetail(false);
    }
  };

  const handleConfirmSelection = () => {
    if (allowMultiple && onSelectMultiple) {
      const result = selectedPhotos.map(p => ({ id: p.id, url: p.url, title: p.title }));
      onSelectMultiple(result);
    } else if (selectedPhotos.length > 0) {
      const selected = selectedPhotos[0];
      onSelect({ id: selected.id, url: selected.url, title: selected.title });
    }
    onClose();
  };

  // Filtered photos
  const filteredPhotos = photos.filter(photo => {
    const matchSearch = (photo.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (photo.tags || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchTag = selectedTag === 'Semua' || photo.tags === selectedTag;
    return matchSearch && matchTag;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-6 select-none">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-7xl h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-100"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-emerald-50 text-[#27ae60] rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                </span>
                <h2 className="text-lg font-bold text-gray-900">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors rounded-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* WordPress Tabs Selector */}
            <div className="flex border-b border-gray-100 px-6 bg-white gap-4 text-sm font-bold text-gray-400">
              <button
                onClick={() => setActiveTab('library')}
                className={`py-3.5 border-b-2 transition-all relative ${
                  activeTab === 'library'
                    ? 'border-[#27ae60] text-[#27ae60]'
                    : 'border-transparent hover:text-gray-600'
                }`}
              >
                Pustaka Media
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`py-3.5 border-b-2 transition-all relative ${
                  activeTab === 'upload'
                    ? 'border-[#27ae60] text-[#27ae60]'
                    : 'border-transparent hover:text-gray-600'
                }`}
              >
                Unggah Berkas
              </button>
            </div>

            {/* Modal Body: Split view */}
            <div className="flex-1 flex overflow-hidden min-h-0 bg-white">
              {/* Left Panel: Upload or Grid */}
              <div className="flex-1 flex flex-col p-6 min-w-0 overflow-y-auto">
                {activeTab === 'upload' ? (
                  /* Drag and Drop Zone */
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`flex-1 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-8 transition-all text-center ${
                      dragActive
                        ? 'border-[#27ae60] bg-green-50/40 scale-[0.99]'
                        : 'border-gray-200 hover:border-gray-300 bg-gray-50/30'
                    }`}
                  >
                    <div className="w-16 h-16 bg-[#27ae60]/10 text-[#27ae60] rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-1">Tarik dan jatuhkan file gambar ke sini</h3>
                    <p className="text-xs text-gray-500 mb-6">atau</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm font-bold text-xs py-3 px-6 rounded-xl transition-all"
                    >
                      Pilih Berkas
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <p className="text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-wider">PNG, JPG, WEBP, AVIF (Maks. 5MB)</p>
                  </div>
                ) : (
                  /* Library Tab: Filters + Grid */
                  <div className="flex-1 flex flex-col space-y-4 min-h-0">
                    {/* Filters Row */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
                      {/* Search */}
                      <div className="relative w-full sm:max-w-xs">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Cari foto..."
                          className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#27ae60] focus:ring-1 focus:ring-[#27ae60]/20 font-medium"
                        />
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </span>
                      </div>

                      {/* Tag Filters */}
                      <div className="flex gap-1 overflow-x-auto w-full sm:w-auto py-1 scrollbar-none">
                        {tagsList.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              selectedTag === tag
                                ? 'bg-gray-900 text-white shadow-sm'
                                : 'bg-white hover:bg-gray-100 text-gray-600 border border-gray-200/60'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bulk Upload Progress Overlay List */}
                    {uploadingFiles.length > 0 && (
                      <div className="bg-gray-50 border border-gray-150 p-3.5 rounded-2xl space-y-2">
                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Status Unggahan</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {uploadingFiles.map((uf, idx) => (
                            <div key={idx} className="bg-white border border-gray-100 p-2.5 rounded-xl flex flex-col gap-1.5 shadow-sm">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-gray-700 truncate w-3/4">{uf.name}</span>
                                <span className="font-black text-[10px] text-[#27ae60]">{uf.progress}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#27ae60] transition-all duration-300"
                                  style={{ width: `${uf.progress}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Photos Grid */}
                    <div className="flex-1 overflow-y-auto pr-1 min-h-[300px]">
                      {loading && photos.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-3">
                          <div className="w-8 h-8 border-3 border-[#27ae60] border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-gray-500 font-bold text-sm">Memuat galeri...</span>
                        </div>
                      ) : filteredPhotos.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                          <svg className="w-12 h-12 mb-3 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <span className="font-bold text-xs">Media tidak ditemukan</span>
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                          {filteredPhotos.map((photo) => {
                            const isSelected = selectedPhotos.some(p => p.id === photo.id);
                            return (
                              <div
                                key={photo.id}
                                onClick={() => handleSelectPhoto(photo)}
                                className={`relative aspect-square bg-gray-50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 border-2 select-none ${
                                  isSelected
                                    ? 'border-blue-500 ring-4 ring-blue-100 scale-[0.98] shadow-md'
                                    : 'border-transparent hover:border-gray-200 hover:scale-[1.01] shadow-sm'
                                }`}
                              >
                                <img
                                  src={photo.url}
                                  alt={photo.title || 'Media'}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />

                                {/* Tag Label */}
                                <div className="absolute bottom-2 left-2 max-w-[80%]">
                                  <span className="bg-black/60 text-white font-extrabold text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-md backdrop-blur-xs truncate block">
                                    {photo.tags || 'Kegiatan'}
                                  </span>
                                </div>

                                {/* WordPress selection checkmark overlay */}
                                {isSelected && (
                                  <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center">
                                    <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 border border-blue-600 text-white rounded-lg flex items-center justify-center scale-105 shadow-sm">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Panel: WordPress-style details sidebar */}
              <div className="w-80 border-l border-gray-100 bg-gray-50/30 flex flex-col min-h-0 hidden md:flex">
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {detailPhoto ? (
                    <>
                      {/* Image Preview & Meta */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Pratinjau Media</span>
                        <div className="aspect-video bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
                          <img src={detailPhoto.url} className="w-full h-full object-cover" />
                        </div>
                        <div className="text-[11px] text-gray-500 font-bold space-y-1">
                          <div className="flex justify-between">
                            <span>ID:</span>
                            <span className="text-gray-800">#{detailPhoto.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Format:</span>
                            <span className="text-gray-800 uppercase">{detailPhoto.url?.split('.').pop() || 'Unknown'}</span>
                          </div>
                          {detailPhoto.createdAt && (
                            <div className="flex justify-between">
                              <span>Tanggal:</span>
                              <span className="text-gray-800">{new Date(detailPhoto.createdAt).toLocaleDateString('id-ID')}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Detail Fields Form */}
                      <div className="space-y-4 border-t border-gray-100 pt-5">
                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Detail Informasi</span>
                        
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Judul Gambar</label>
                          <input
                            type="text"
                            value={detailPhoto.title || ''}
                            onChange={(e) => setDetailPhoto(prev => prev ? ({ ...prev, title: e.target.value }) : null)}
                            className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#27ae60] font-bold text-gray-800"
                            placeholder="Judul media..."
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Tag / Kategori</label>
                          <select
                            value={detailPhoto.tags || 'Kegiatan'}
                            onChange={(e) => setDetailPhoto(prev => prev ? ({ ...prev, tags: e.target.value }) : null)}
                            className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#27ae60] font-bold text-gray-800"
                          >
                            <option value="Pelayanan">Pelayanan</option>
                            <option value="Kegiatan">Kegiatan</option>
                            <option value="Edukasi">Edukasi</option>
                            <option value="Internal">Internal</option>
                            <option value="Fasilitas">Fasilitas</option>
                            <option value="Digital">Digital</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Caption / Keterangan</label>
                          <textarea
                            value={detailPhoto.caption || ''}
                            onChange={(e) => setDetailPhoto(prev => prev ? ({ ...prev, caption: e.target.value }) : null)}
                            rows={3}
                            className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#27ae60] font-medium text-gray-700 resize-none"
                            placeholder="Deskripsi singkat..."
                          />
                        </div>

                        <button
                          type="button"
                          onClick={handleSaveDetail}
                          disabled={savingDetail}
                          className="w-full py-2.5 bg-gray-900 hover:bg-black text-white text-[11px] font-black rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                          {savingDetail ? (
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                          )}
                          Simpan Perubahan
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-10">
                      <svg className="w-8 h-8 mb-2 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-xs font-bold">Pilih foto dari pustaka media untuk melihat dan mengedit detail</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <div className="text-xs text-gray-500 font-bold">
                {selectedPhotos.length > 0
                  ? `${selectedPhotos.length} media dipilih`
                  : 'Pilih media untuk melanjutkan'}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 text-xs bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 font-bold rounded-xl transition-all"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSelection}
                  disabled={selectedPhotos.length === 0}
                  className={`px-6 py-3 text-xs text-white font-black rounded-xl transition-all shadow-md shadow-green-100 flex items-center gap-2 ${
                    selectedPhotos.length === 0
                      ? 'bg-gray-300 shadow-none cursor-not-allowed'
                      : 'bg-[#27ae60] hover:bg-[#1e8449]'
                  }`}
                >
                  Pilih Gambar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
