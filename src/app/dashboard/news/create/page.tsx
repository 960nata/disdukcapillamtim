'use client';

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Import CustomQuillEditor dynamically to avoid SSR issues
const CustomQuillEditor = dynamic(() => import('@/components/CustomQuillEditor'), { ssr: false });

type Block = {
  type: string;
  content?: string | string[] | any;
  layout?: string;
  items?: any[];
};

export default function CreateNewsPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [blocks, setBlocks] = useState<Block[]>([
    { type: 'text', content: '<p>Mulai menulis artikel yang memukau di sini...</p>' },
  ]);
  
  // SEO States
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');
  
  // Cover Image State
  const [coverImage, setCoverImage] = useState('/images/foto_kegiatan/kantor_luar.avif');
  const [showCoverDeleteModal, setShowCoverDeleteModal] = useState(false);
  
  // Category & Tags State
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>(['Pelayanan', 'Kegiatan', 'Edukasi', 'Penting']);
  const [newTagInput, setNewTagInput] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const convertToEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return url;
  };

  const compressImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_WIDTH = 1920;
          const MAX_HEIGHT = 1080;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) resolve(blob);
              else reject(new Error('Canvas toBlob failed'));
            },
            'image/jpeg',
            0.8
          );
        };
        img.onerror = () => reject(new Error('Image load failed'));
      };
      reader.onerror = () => reject(new Error('File read failed'));
    });
  };

  const uploadFile = async (file: File) => {
    let fileToUpload: File | Blob = file;

    // Kompres jika file gambar dan ukurannya lebih dari 2MB
    if (file.type.startsWith('image/') && file.size > 2 * 1024 * 1024) {
      try {
        fileToUpload = await compressImage(file);
      } catch (e) {
        console.error('Gagal kompres gambar:', e);
      }
    }

    const formData = new FormData();
    formData.append('file', fileToUpload, file.name);
    
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!res.ok) throw new Error('Upload failed');
    
    const data = await res.json();
    return data.url;
  };

  const handleSave = async (status: string) => {
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          content: JSON.stringify(blocks),
          status,
          seoTitle,
          seoDesc,
          seoKeywords,
          coverImage,
          category: selectedTags.length > 0 ? selectedTags[0] : 'Berita',
          tags: selectedTags.join(','),
        }),
      });

      if (!res.ok) throw new Error('Gagal menyimpan berita');

      alert(`Berita berhasil disimpan sebagai ${status}!`);
      window.location.href = '/dashboard/news';
    } catch (error) {
      console.error('Error saving news:', error);
      alert('Gagal menyimpan berita!');
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const url = await uploadFile(file);
      setCoverImage(url);
    } catch (error) {
      console.error('Failed to upload cover:', error);
    }
  };

  const handleBlockImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const url = await uploadFile(file);
      updateBlock(index, url);
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  const handleAddImageToBlock = async (blockIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const url = await uploadFile(file);
      const newBlocks = [...blocks];
      const block = newBlocks[blockIndex];
      if (Array.isArray(block.content)) {
        newBlocks[blockIndex].content = [...block.content, url];
        setBlocks(newBlocks);
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  // Helper to generate slug
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    // Auto generate slug if it hasn't been manually edited or is empty
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(val));
    }
  };

  const generateAIContent = async () => {
    if (!title) {
      alert('Masukkan judul artikel terlebih dahulu agar AI memiliki konteks!');
      return;
    }
    
    setIsGeneratingAI(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      if (data.content) {
        // Find the first empty text block or add a new one
        const newBlocks = [...blocks];
        const textBlockIndex = newBlocks.findIndex(b => b.type === 'text' && (b.content === '<p>Mulai menulis artikel yang memukau di sini...</p>' || !b.content));
        
        if (textBlockIndex !== -1) {
          newBlocks[textBlockIndex].content = data.content;
          setBlocks(newBlocks);
        } else {
          setBlocks([...blocks, { type: 'text', content: data.content }]);
        }
      }
    } catch (error) {
      console.error('AI Generation failed:', error);
      alert('Gagal menghasilkan konten AI. Silakan coba lagi.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const addBlock = (type: string) => {
    if (type === 'text') {
      setBlocks([...blocks, { type: 'text', content: '<p>Tulis paragraf baru di sini...</p>' }]);
    } else if (type === 'image') {
      setBlocks([...blocks, { type: 'image', content: '' }]);
    } else if (type === 'video') {
      setBlocks([...blocks, { type: 'video', content: '' }]);
    } else if (type === 'gallery') {
      setBlocks([...blocks, { type: 'gallery', content: [] }]);
    } else if (type === 'carousel') {
      setBlocks([...blocks, { type: 'carousel', content: [], layout: '1x1' }]);
    } else if (type === 'grid') {
      setBlocks([...blocks, { type: 'grid', layout: '1x2', items: [] }]);
    } else if (type === 'html') {
      setBlocks([...blocks, { type: 'html', content: '' }]);
    }
  };

  const removeBlock = (index: number) => {
    const newBlocks = [...blocks];
    newBlocks.splice(index, 1);
    setBlocks(newBlocks);
  };

  const updateBlock = (index: number, content: any) => {
    const newBlocks = [...blocks];
    newBlocks[index].content = content;
    setBlocks(newBlocks);
  };

  // Function to add image to gallery or carousel
  const addImageToBlock = (blockIndex: number) => {
    const newBlocks = [...blocks];
    const block = newBlocks[blockIndex];
    if (Array.isArray(block.content)) {
      const newImage = block.content.length % 2 === 0 
        ? '/images/foto_kegiatan/pelayanan_ktp.avif' 
        : '/images/foto_kegiatan/kantor_luar.avif';
      
      newBlocks[blockIndex].content = [...block.content, newImage];
      setBlocks(newBlocks);
    }
  };

  // Function to remove image from gallery or carousel
  const removeImageFromBlock = (blockIndex: number, imageIndex: number) => {
    const newBlocks = [...blocks];
    const block = newBlocks[blockIndex];
    if (Array.isArray(block.content)) {
      const newContent = [...block.content];
      newContent.splice(imageIndex, 1);
      newBlocks[blockIndex].content = newContent;
      setBlocks(newBlocks);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex flex-col font-sans">
      
      {/* Premium Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/news" className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </Link>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Buat Artikel Premium</h1>
            <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
              <span className="w-2 h-2 bg-[#27ae60] rounded-full inline-block"></span>
              Auto Save Aktif
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleSave('Draft')}
            className="px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl border border-gray-200 transition-all shadow-sm"
          >
            Simpan ke Draft
          </button>
          <button 
            onClick={() => handleSave('Published')}
            className="bg-gradient-to-r from-[#27ae60] to-[#2ecc71] hover:from-[#1e8449] hover:to-[#27ae60] text-white transition-all duration-300 rounded-xl px-6 py-2.5 text-sm font-bold shadow-md shadow-green-100 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            Terbitkan Artikel
          </button>
        </div>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row">
        
        {/* Main Editor Area (Notion Style) */}
        <main className="flex-grow p-6 flex justify-center overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl w-full bg-white p-12 rounded-3xl border border-gray-100/80 shadow-sm space-y-8 min-h-[800px]"
          >
            
            {/* Cover Image Area */}
            <div className="relative group h-64 -mx-12 -mt-12 mb-8 bg-gray-100 overflow-hidden">
              <img src={coverImage} alt="Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <span className="bg-black/50 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">Cover Artikel</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowCoverDeleteModal(true)}
                    className="bg-red-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-600 transition-all shadow-lg flex items-center gap-2 border border-red-500"
                  >
                    Hapus Cover
                  </button>
                  <label htmlFor="cover-upload" className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-xl text-xs font-bold hover:bg-white transition-all shadow-lg flex items-center gap-2 border border-white cursor-pointer">
                    Ganti Cover
                  </label>
                </div>
                <input id="cover-upload" type="file" className="hidden" accept="image/*" onChange={handleCoverUpload} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <input 
                type="text" 
                placeholder="Tulis Judul Artikel yang Menarik di Sini..." 
                value={title}
                onChange={handleTitleChange}
                className="flex-1 text-4xl font-extrabold text-gray-900 placeholder-gray-200 focus:outline-none border-b-2 border-transparent focus:border-gray-50 pb-4 tracking-tight"
              />
              <button 
                onClick={generateAIContent}
                disabled={isGeneratingAI}
                className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all shadow-lg ${
                  isGeneratingAI 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-purple-100'
                }`}
              >
                {isGeneratingAI ? (
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                )}
                {isGeneratingAI ? 'AI Menulis...' : 'Tuliskan Artikel (AI)'}
              </button>
            </div>

            {/* Dynamic Blocks */}
            <div className="space-y-6">
              {blocks.map((block, index) => (
                <div key={index} className="relative group border border-transparent hover:border-gray-100 rounded-xl p-3 transition-all hover:bg-gray-50/50">
                  
                  {/* Block Actions */}
                  <div className="absolute -right-2 -top-2 hidden group-hover:flex gap-1 bg-white border border-gray-200 rounded-lg shadow-sm p-1 z-10">
                    <button onClick={() => removeBlock(index)} className="p-1 text-red-500 hover:bg-red-50 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>

                  {/* Text Block (Custom Quill Editor) */}
                  {block.type === 'text' && (
                    <div className="quill-wrapper provers-glow">
                      <CustomQuillEditor 
                        value={block.content as string}
                        onChange={(val) => updateBlock(index, val)}
                        placeholder="Tulis paragraf baru..."
                      />
                    </div>
                  )}

                  {/* Image Block */}
                  {block.type === 'image' && (
                    <div className="relative rounded-xl overflow-hidden border border-gray-100 shadow-sm min-h-40 bg-gray-50 flex items-center justify-center">
                      {block.content ? (
                        <>
                          <img src={block.content as string} alt="Block" className="w-full h-72 object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                            <label htmlFor={`image-upload-${index}`} className="bg-white text-gray-900 px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all shadow-lg cursor-pointer">
                              Ganti Gambar
                            </label>
                            <input id={`image-upload-${index}`} type="file" className="hidden" accept="image/*" onChange={(e) => handleBlockImageUpload(index, e)} />
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-6">
                          <p className="text-sm text-gray-400 mb-2">Belum ada gambar</p>
                          <label htmlFor={`image-upload-${index}`} className="bg-[#27ae60] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#1e8449] transition-all shadow-lg cursor-pointer inline-block">
                            Upload Gambar
                          </label>
                          <input id={`image-upload-${index}`} type="file" className="hidden" accept="image/*" onChange={(e) => handleBlockImageUpload(index, e)} />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Video Block */}
                  {block.type === 'video' && (
                    <div className="space-y-3">
                      <div className="relative rounded-xl overflow-hidden border border-gray-100 bg-black aspect-video shadow-sm">
                        {block.content ? (
                          <iframe 
                            src={block.content as string} 
                            className="w-full h-full" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            Preview Video (Masukkan URL di bawah)
                          </div>
                        )}
                      </div>
                      <input 
                        type="text"
                        value={block.content as string}
                        onChange={(e) => updateBlock(index, convertToEmbedUrl(e.target.value))}
                        placeholder="Masukkan URL YouTube (otomatis di-convert ke embed)"
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#27ae60]/20 focus:border-[#27ae60] transition-all"
                      />
                    </div>
                  )}

                  {/* Gallery Block */}
                  {block.type === 'gallery' && Array.isArray(block.content) && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">Galeri Foto</span>
                        <label htmlFor={`gallery-upload-${index}`} className="text-xs font-bold text-[#27ae60] hover:text-[#1e8449] flex items-center gap-1 cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                          Tambah Foto
                        </label>
                        <input id={`gallery-upload-${index}`} type="file" className="hidden" accept="image/*" onChange={(e) => handleAddImageToBlock(index, e)} />
                      </div>
                      {block.content.length > 0 ? (
                        <div className="grid grid-cols-3 gap-4">
                          {block.content.map((imgUrl: string, imgIdx: number) => (
                            <div key={imgIdx} className="relative rounded-xl overflow-hidden border border-gray-100 aspect-square shadow-sm group/img">
                              <img src={imgUrl} alt={`Gallery ${imgIdx}`} className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                <button 
                                  onClick={() => removeImageFromBlock(index, imgIdx)}
                                  className="p-1.5 bg-white/90 rounded-lg text-red-500 hover:bg-white hover:text-red-700 transition-colors shadow-lg"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="h-32 bg-gray-50 rounded-xl flex items-center justify-center text-sm text-gray-400 border border-dashed border-gray-200">
                          Belum ada foto. Klik "Tambah Foto"
                        </div>
                      )}
                    </div>
                  )}

                  {/* Carousel Block */}
                  {block.type === 'carousel' && Array.isArray(block.content) && (
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">Carousel Slider</span>
                          <select 
                            value={block.layout || '1x1'} 
                            onChange={(e) => {
                              const newBlocks = [...blocks];
                              newBlocks[index].layout = e.target.value;
                              setBlocks(newBlocks);
                            }}
                            className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-[#27ae60]"
                          >
                            <option value="1x1">1x1 (Full Width)</option>
                            <option value="1x2">1x2 (2 Kolom)</option>
                            <option value="1x3">1x3 (3 Kolom)</option>
                          </select>
                        </div>
                        <label htmlFor={`carousel-upload-${index}`} className="text-xs font-bold text-[#27ae60] hover:text-[#1e8449] flex items-center gap-1 cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                          Tambah Slide
                        </label>
                        <input id={`carousel-upload-${index}`} type="file" className="hidden" accept="image/*" onChange={(e) => handleAddImageToBlock(index, e)} />
                      </div>
                      {block.content.length > 0 ? (
                        <div className="grid grid-cols-3 gap-4">
                          {block.content.map((imgUrl: string, imgIdx: number) => (
                            <div key={imgIdx} className="relative rounded-xl overflow-hidden border border-gray-100 aspect-video shadow-sm group/img">
                              <img src={imgUrl} alt={`Slider ${imgIdx}`} className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                <button 
                                  onClick={() => removeImageFromBlock(index, imgIdx)}
                                  className="p-1.5 bg-white/90 rounded-lg text-red-500 hover:bg-white hover:text-red-700 transition-colors shadow-lg"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="h-32 bg-gray-50 rounded-xl flex items-center justify-center text-sm text-gray-400 border border-dashed border-gray-200">
                          Belum ada slide. Klik "Tambah Slide"
                        </div>
                      )}
                    </div>
                  )}

                  {/* Grid Block */}
                  {block.type === 'grid' && (
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">Grid System</span>
                          <select 
                            value={block.layout || '1x2'} 
                            onChange={(e) => {
                              const newBlocks = [...blocks];
                              newBlocks[index].layout = e.target.value;
                              setBlocks(newBlocks);
                            }}
                            className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-[#27ae60]"
                          >
                            <option value="1x2">1x2 (2 Kolom)</option>
                            <option value="2x2">2x2 (Grid 4)</option>
                            <option value="1x3">1x3 (3 Kolom)</option>
                            <option value="1x4">1x4 (4 Kolom)</option>
                          </select>
                        </div>
                        <button 
                          onClick={() => {
                            const newBlocks = [...blocks];
                            const currentItems = newBlocks[index].items || [];
                            newBlocks[index].items = [...currentItems, { image: '', text: '' }];
                            setBlocks(newBlocks);
                          }}
                          className="text-xs font-bold text-[#27ae60] hover:text-[#1e8449] flex items-center gap-1 cursor-pointer"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                          Tambah Item
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(block.items || []).map((item: any, i: number) => (
                          <div key={i} className="border border-gray-200 p-3 rounded-xl space-y-3 relative group/item bg-white shadow-sm">
                            <button 
                              onClick={() => {
                                const newBlocks = [...blocks];
                                if (newBlocks[index].items) {
                                  newBlocks[index].items.splice(i, 1);
                                }
                                setBlocks(newBlocks);
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full text-xs shadow opacity-0 group-hover/item:opacity-100 transition-opacity z-10"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                            
                            <div className="h-28 bg-gray-50 rounded-lg flex flex-col items-center justify-center border border-dashed border-gray-300 relative overflow-hidden">
                              {item.image ? (
                                <>
                                  <img src={item.image} className="w-full h-full object-cover" />
                                  <label className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center text-white text-xs font-bold cursor-pointer transition-opacity">
                                    Ganti Gambar
                                    <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const url = await uploadFile(file);
                                        const newBlocks = [...blocks];
                                        if (newBlocks[index].items) {
                                          newBlocks[index].items[i].image = url;
                                        }
                                        setBlocks(newBlocks);
                                      }
                                    }} />
                                  </label>
                                </>
                              ) : (
                                <label className="text-xs text-[#27ae60] font-bold cursor-pointer hover:underline">
                                  + Upload Gambar (Opsional)
                                  <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const url = await uploadFile(file);
                                      const newBlocks = [...blocks];
                                      if (newBlocks[index].items) {
                                        newBlocks[index].items[i].image = url;
                                      }
                                      setBlocks(newBlocks);
                                    }
                                  }} />
                                </label>
                              )}
                            </div>
                            
                            <textarea 
                              value={item.text}
                              onChange={(e) => {
                                const newBlocks = [...blocks];
                                if (newBlocks[index].items) {
                                  newBlocks[index].items[i].text = e.target.value;
                                }
                                setBlocks(newBlocks);
                              }}
                              placeholder="Ketik teks atau HTML ringan di sini (Opsional)..."
                              className="w-full p-2.5 border border-gray-200 rounded-lg text-xs h-20 focus:outline-none focus:border-[#27ae60] focus:ring-1 focus:ring-[#27ae60] resize-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* HTML Block */}
                  {block.type === 'html' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-400 tracking-wider uppercase flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                          Widget HTML Kustom
                        </span>
                      </div>
                      <textarea
                        value={block.content as string}
                        onChange={(e) => updateBlock(index, e.target.value)}
                        placeholder="<div style='color: red;'>Ketik HTML & CSS Kustom Anda di sini...</div>"
                        className="w-full h-40 p-4 font-mono text-sm bg-gray-900 text-green-400 rounded-xl focus:outline-none shadow-inner"
                      />
                    </div>
                  )}

                </div>
              ))}
            </div>

            {/* Premium Block Inserter */}
            <div className="flex justify-center pt-6 border-t border-gray-50">
              <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 flex gap-1.5 flex-wrap justify-center max-w-lg">
                {[
                  { type: 'text', label: 'Teks', icon: 'M4 6h16M4 12h16M4 18h7' },
                  { type: 'image', label: 'Gambar', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
                  { type: 'video', label: 'Video', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
                  { type: 'gallery', label: 'Galeri', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z M9 9m-1 0a1 1 0 102 0a1 1 0 10-2 0 M15 15m-1 0a1 1 0 102 0a1 1 0 10-2 0' },
                  { type: 'carousel', label: 'Slider', icon: 'M8 7h8M8 12h8M8 17h8 M3 3v18 M21 3v18' },
                  { type: 'grid', label: 'Grid', icon: 'M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z' },
                  { type: 'html', label: 'HTML', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
                ].map((item) => (
                  <button 
                    key={item.type}
                    onClick={() => addBlock(item.type)} 
                    className="flex flex-col items-center gap-1 px-4 py-3 text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all w-20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-gray-600"><path d={item.icon}></path></svg>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        </main>

        {/* Premium Sidebar (Floating Style) */}
        <aside className="w-full lg:w-96 bg-white border-l border-gray-100 p-8 space-y-8 overflow-y-auto">
          
          {/* SEO Live Preview */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-gray-900 tracking-tight">Preview Google (SEO)</h3>
            <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm space-y-1">
              <span className="text-[11px] text-gray-500">https://disdukcapil.lamtim.go.id › berita</span>
              <h4 className="text-lg font-bold text-[#1a0dab] hover:underline cursor-pointer">
                {seoTitle || title || "Judul Berita Menarik..."}
              </h4>
              <p className="text-sm text-[#4d5156] leading-relaxed">
                {seoDesc || "Silakan isi deskripsi meta di bawah untuk melihat preview hasil pencarian Google di sini..."}
              </p>
            </div>
          </div>

          <div className="h-px bg-gray-50"></div>

          {/* SEO Inputs */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-gray-900 tracking-tight">Kustomisasi SEO</h3>
            
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Slug URL</label>
              <input 
                type="text" 
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all font-mono"
                placeholder="url-artikel-ini"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Meta Title</label>
              <input 
                type="text" 
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all"
                placeholder="Maksimal 60 karakter"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Meta Description</label>
              <textarea 
                value={seoDesc}
                onChange={(e) => setSeoDesc(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#27ae60] h-28 resize-none focus:bg-white transition-all"
                placeholder="Maksimal 160 karakter agar optimal di Google"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Keywords</label>
              <input 
                type="text" 
                value={seoKeywords}
                onChange={(e) => setSeoKeywords(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all"
                placeholder="Pisahkan dengan koma (contoh: ktp, online)"
              />
            </div>
          </div>

          <div className="h-px bg-gray-50"></div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-gray-900 tracking-tight">Kategori & Tag</h3>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((cat) => (
                <label key={cat} className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-100 px-3 py-2 rounded-xl cursor-pointer transition-all">
                  <input 
                    type="checkbox" 
                    checked={selectedTags.includes(cat)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedTags([...selectedTags, cat]);
                      else setSelectedTags(selectedTags.filter(t => t !== cat));
                    }}
                    className="h-4 w-4 text-[#27ae60] focus:ring-[#27ae60] border-gray-300 rounded" 
                  />
                  <span className="text-xs font-bold text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input 
                type="text" 
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (newTagInput.trim() && !availableTags.includes(newTagInput.trim())) {
                      setAvailableTags([...availableTags, newTagInput.trim()]);
                      setSelectedTags([...selectedTags, newTagInput.trim()]);
                      setNewTagInput('');
                    }
                  }
                }}
                className="flex-grow px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#27ae60] focus:bg-white transition-all"
                placeholder="Tambah Tag Baru..."
              />
              <button 
                onClick={() => {
                  if (newTagInput.trim() && !availableTags.includes(newTagInput.trim())) {
                    setAvailableTags([...availableTags, newTagInput.trim()]);
                    setSelectedTags([...selectedTags, newTagInput.trim()]);
                    setNewTagInput('');
                  }
                }}
                className="px-3 py-2 text-xs font-bold text-white bg-[#27ae60] hover:bg-[#1e8449] rounded-xl transition-colors"
              >
                +
              </button>
            </div>
          </div>

        </aside>

      </div>
      
      {showCoverDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Hapus Cover?</h3>
            <p className="text-sm text-gray-500 mb-6">Apakah Anda yakin ingin menghapus foto cover ini? Foto akan dikembalikan ke default.</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowCoverDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={() => {
                  setCoverImage('/images/foto_kegiatan/kantor_luar.avif');
                  setShowCoverDeleteModal(false);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
