'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';

// Import CustomQuillEditor dynamically to avoid SSR issues
const CustomQuillEditor = dynamic(() => import('@/components/CustomQuillEditor'), { ssr: false });

type Block = {
  type: string;
  content: string | string[];
};

export default function EditNewsPage() {
  const params = useParams();
  const id = params.id;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [blocks, setBlocks] = useState<Block[]>([
    { type: 'text', content: '<p>Memuat konten...</p>' },
  ]);
  
  // SEO States
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');
  
  // Cover Image State
  const [coverImage, setCoverImage] = useState('/images/foto_kegiatan/kantor_luar.avif');
  const [showCoverDeleteModal, setShowCoverDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Category & Tags State
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news');
        const data = await res.json();
        const item = data.find((n: any) => n.id === Number(id));
        
        if (item) {
          setTitle(item.title);
          setSlug(item.slug);
          try {
            setBlocks(JSON.parse(item.content));
          } catch (e) {
            setBlocks([{ type: 'text', content: item.content }]);
          }
          setSeoTitle(item.seoTitle || '');
          setSeoDesc(item.seoDesc || '');
          setSeoKeywords(item.seoKeywords || '');
          setCoverImage(item.coverImage || '/images/foto_kegiatan/kantor_luar.avif');
          if (item.tags) {
            setSelectedTags(item.tags.split(','));
          } else if (item.category) {
            setSelectedTags([item.category]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch news for edit:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

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
      const res = await fetch(`/api/news/${id}`, {
        method: 'PUT',
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

      alert(`Berita berhasil diperbarui sebagai ${status}!`);
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

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(val));
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
      setBlocks([...blocks, { type: 'carousel', content: [] }]);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f6f8] text-gray-500 font-bold">
        Memuat data artikel...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex flex-col font-sans">
      
      {/* Premium Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-3 md:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/news" className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </Link>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Edit Artikel</h1>
            <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
              <span className="w-2 h-2 bg-[#27ae60] rounded-full inline-block"></span>
              ID: {id}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
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
            Perbarui Artikel
          </button>
        </div>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row">
        
        {/* Main Editor Area */}
        <main className="flex-grow p-6 flex justify-center overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl w-full bg-white p-6 md:p-12 rounded-2xl md:rounded-3xl border border-gray-100/80 shadow-sm space-y-6 md:space-y-8 min-h-[800px]"
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

            {/* Title Block */}
            <input 
              type="text" 
              placeholder="Tulis Judul Artikel yang Menarik di Sini..." 
              value={title}
              onChange={handleTitleChange}
              className="w-full text-2xl md:text-4xl font-extrabold text-gray-900 placeholder-gray-200 focus:outline-none border-b-2 border-transparent focus:border-gray-50 pb-2 md:pb-4 tracking-tight"
            />

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

                  {/* Text Block */}
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
                        placeholder="Masukkan URL YouTube"
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Gallery Block */}
                  {block.type === 'gallery' && Array.isArray(block.content) && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">Galeri Foto</span>
                        <label htmlFor={`gallery-upload-${index}`} className="text-xs font-bold text-[#27ae60] hover:text-[#1e8449] flex items-center gap-1 cursor-pointer">
                          Tambah Foto
                        </label>
                        <input id={`gallery-upload-${index}`} type="file" className="hidden" accept="image/*" onChange={(e) => handleAddImageToBlock(index, e)} />
                      </div>
                      {block.content.length > 0 ? (
                        <div className="grid grid-cols-3 gap-4">
                          {block.content.map((imgUrl: string, imgIdx: number) => (
                            <div key={imgIdx} className="relative rounded-xl overflow-hidden border border-gray-100 aspect-square shadow-sm group/img">
                              <img src={imgUrl} alt={`Gallery ${imgIdx}`} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                <button 
                                  onClick={() => removeImageFromBlock(index, imgIdx)}
                                  className="p-1.5 bg-white/90 rounded-lg text-red-500 hover:bg-white hover:text-red-700 transition-colors shadow-lg"
                                >
                                  Hapus
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="h-32 bg-gray-50 rounded-xl flex items-center justify-center text-sm text-gray-400 border border-dashed border-gray-200">
                          Belum ada foto.
                        </div>
                      )}
                    </div>
                  )}

                  {/* Carousel Block */}
                  {block.type === 'carousel' && Array.isArray(block.content) && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">Carousel Slider</span>
                        <label htmlFor={`carousel-upload-${index}`} className="text-xs font-bold text-[#27ae60] hover:text-[#1e8449] flex items-center gap-1 cursor-pointer">
                          Tambah Slide
                        </label>
                        <input id={`carousel-upload-${index}`} type="file" className="hidden" accept="image/*" onChange={(e) => handleAddImageToBlock(index, e)} />
                      </div>
                      {block.content.length > 0 ? (
                        <div className="grid grid-cols-3 gap-4">
                          {block.content.map((imgUrl: string, imgIdx: number) => (
                            <div key={imgIdx} className="relative rounded-xl overflow-hidden border border-gray-100 aspect-video shadow-sm group/img">
                              <img src={imgUrl} alt={`Slider ${imgIdx}`} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                <button 
                                  onClick={() => removeImageFromBlock(index, imgIdx)}
                                  className="p-1.5 bg-white/90 rounded-lg text-red-500 hover:bg-white hover:text-red-700 transition-colors shadow-lg"
                                >
                                  Hapus
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="h-32 bg-gray-50 rounded-xl flex items-center justify-center text-sm text-gray-400 border border-dashed border-gray-200">
                          Belum ada slide.
                        </div>
                      )}
                    </div>
                  )}

                </div>
              ))}
            </div>

            {/* Block Inserter */}
            <div className="flex justify-center pt-6 border-t border-gray-50">
              <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 flex gap-1.5 flex-wrap justify-center max-w-lg">
                {[
                  { type: 'text', label: 'Teks' },
                  { type: 'image', label: 'Gambar' },
                  { type: 'video', label: 'Video' },
                  { type: 'gallery', label: 'Galeri' },
                  { type: 'carousel', label: 'Slider' },
                ].map((item) => (
                  <button 
                    key={item.type}
                    onClick={() => addBlock(item.type)} 
                    className="flex flex-col items-center gap-1 px-4 py-3 text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all w-20"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        </main>

        {/* Sidebar */}
        <aside className="w-full lg:w-96 bg-white border-l border-gray-100 p-4 md:p-8 space-y-6 md:space-y-8 overflow-y-auto">
          
          {/* SEO Preview */}
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
                placeholder="Pisahkan dengan koma"
              />
            </div>
          </div>

          <div className="h-px bg-gray-50"></div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-gray-900 tracking-tight">Kategori & Tag</h3>
            <div className="flex flex-wrap gap-2">
              {['Pelayanan', 'Kegiatan', 'Edukasi', 'Penting'].map((cat) => (
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
