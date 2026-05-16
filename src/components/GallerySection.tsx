'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

type Photo = {
  id: number;
  url: string;
  title: string | null;
  tags: string | null;
};

export default function GallerySection() {
  const [row1, setRow1] = useState<Photo[]>([]);
  const [row2, setRow2] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (data.gallery && data.featuredIds) {
          // Filter only featured photos
          const featuredPhotos = data.gallery.filter((p: any) => 
            data.featuredIds.includes(p.id)
          );
          
          if (featuredPhotos.length > 0) {
            // Split into two rows for the marquee
            const mid = Math.ceil(featuredPhotos.length / 2);
            setRow1(featuredPhotos.slice(0, mid));
            setRow2(featuredPhotos.slice(mid));
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch gallery:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (row1.length === 0 && row2.length === 0) return null;

  // Duplicate items for seamless loop
  const fullRow1 = [...row1, ...row1, ...row1, ...row1];
  const fullRow2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 mt-2 mb-4">Dokumentasi Kegiatan Disdukcapil</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Momen-momen pelayanan, kegiatan lapangan, dan koordinasi yang kami lakukan untuk memberikan pelayanan terbaik bagi masyarakat Lampung Timur.
        </p>
      </div>

      {/* Wrapper with gap-12 to make it more spacious */}
      <div className="flex flex-col gap-12">
        
        {/* Carousel Row 1 (Moves Left) */}
        {row1.length > 0 && (
          <div className="relative flex overflow-x-hidden">
            <div className="animate-marquee flex gap-6 whitespace-nowrap">
              {fullRow1.map((item, index) => (
                <div key={`${item.id}-${index}`} className="inline-block w-[300px] flex-shrink-0 group">
                  <div className="relative h-[200px] rounded-2xl overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <Image
                      src={item.url}
                      alt={item.title || 'Foto Kegiatan'}
                      fill
                      sizes="300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <span className="text-xs font-bold text-[#27ae60] bg-white/90 px-2 py-0.5 rounded-full w-fit mb-1">
                        {item.tags || 'Kegiatan'}
                      </span>
                      <h3 className="text-white font-bold text-sm whitespace-normal">
                        {item.title || 'Dokumentasi'}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Carousel Row 2 (Moves Right) */}
        {row2.length > 0 && (
          <div className="relative flex overflow-x-hidden">
            <div className="animate-marquee-reverse flex gap-6 whitespace-nowrap">
              {fullRow2.map((item, index) => (
                <div key={`${item.id}-${index}`} className="inline-block w-[300px] flex-shrink-0 group">
                  <div className="relative h-[200px] rounded-2xl overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <Image
                      src={item.url}
                      alt={item.title || 'Foto Kegiatan'}
                      fill
                      sizes="300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <span className="text-xs font-bold text-[#27ae60] bg-white/90 px-2 py-0.5 rounded-full w-fit mb-1">
                        {item.tags || 'Kegiatan'}
                      </span>
                      <h3 className="text-white font-bold text-sm whitespace-normal">
                        {item.title || 'Dokumentasi'}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>
    </section>
  );
}
