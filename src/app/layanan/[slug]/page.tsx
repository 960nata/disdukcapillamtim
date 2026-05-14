'use client';

import * as React from 'react';
import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import Image from "next/image";
import Link from "next/link";
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function LayananDetailPage() {
  const params = useParams();
  const slug = params.slug;

  // Tabs state
  const [activeTab, setActiveTab] = useState('baru');

  // Content data based on slug (simulate database/config)
  const serviceData: { [key: string]: any } = {
    'ktp-elektronik': {
      title: 'KTP Elektronik (e-KTP)',
      description: 'Kartu Tanda Penduduk Elektronik sebagai identitas resmi penduduk.',
      image: '/images/foto_kegiatan/pelayanan_ktp.avif',
      tabs: [
        { id: 'baru', label: 'Buat Baru' },
        { id: 'cetak-ulang', label: 'Cetak Ulang' },
        { id: 'perubahan', label: 'Perubahan Data' },
        { id: 'hilang-rusak', label: 'Hilang / Rusak' },
      ],
      content: {
        baru: {
          title: 'Perekaman KTP-el Baru',
          requirements: [
            'Berusia minimal 17 tahun atau sudah menikah.',
            'Fotokopi Kartu Keluarga (KK).',
            'Surat Pengantar dari RT/RW (beberapa wilayah tidak memerlukan ini lagi).',
            'Datang langsung untuk rekam sidik jari dan iris mata.'
          ],
          process: 'Pemohon datang ke kecamatan atau dinas untuk melakukan perekaman data biometrik. Setelah itu, KTP akan dicetak dalam waktu 1-3 hari kerja.'
        },
        'cetak-ulang': {
          title: 'Cetak Ulang KTP-el',
          requirements: [
            'KTP-el lama yang sudah rusak (jika rusak).',
            'Fotokopi Kartu Keluarga (KK).',
            'Tidak perlu rekam ulang jika data biometrik sudah ada.'
          ],
          process: 'Ajukan permohonan cetak ulang di loket pelayanan dengan membawa KTP lama yang rusak.'
        },
        perubahan: {
          title: 'Perubahan Data KTP-el',
          requirements: [
            'KTP-el asli.',
            'Fotokopi Kartu Keluarga (KK) yang sudah diperbarui datanya.',
            'Surat keterangan pendukung perubahan (misal: Akta Nikah untuk status kawin).'
          ],
          process: 'Ubah data KK terlebih dahulu di dinas, setelah KK baru terbit, baru ajukan perubahan data KTP.'
        },
        'hilang-rusak': {
          title: 'KTP-el Hilang atau Rusak',
          requirements: [
            'Surat Keterangan Kehilangan dari Kepolisian (untuk KTP hilang).',
            'Fotokopi Kartu Keluarga (KK).',
            'Fisik KTP yang rusak (untuk KTP rusak).'
          ],
          process: 'Bawa surat kehilangan kepolisian ke loket pelayanan untuk langsung dicetakkan KTP baru.'
        }
      }
    },
    'kartu-keluarga': {
      title: 'Kartu Keluarga (KK)',
      description: 'Kartu identitas keluarga yang memuat data susunan, hubungan, dan jumlah anggota keluarga.',
      image: '/images/foto_kegiatan/kantor_luar.avif',
      tabs: [
        { id: 'baru', label: 'Buat Baru' },
        { id: 'tambah', label: 'Tambah Anggota' },
        { id: 'pecah', label: 'Pecah KK' },
      ],
      content: {
        baru: {
          title: 'Pembuatan Kartu Keluarga Baru',
          requirements: [
            'Buku Nikah / Kutipan Akta Perkawinan.',
            'Surat Keterangan Pindah (bagi penduduk pendatang).',
            'KK lama (jika ada).'
          ],
          process: 'Proses pembuatan KK baru memakan waktu sekitar 1-3 hari kerja.'
        },
        tambah: {
          title: 'Tambah Anggota Keluarga',
          requirements: [
            'KK asli.',
            'Surat Keterangan Kelahiran (untuk bayi baru lahir).',
            'Surat Keterangan Pindah (untuk anggota yang pindah).'
          ],
          process: 'Serahkan berkas ke loket, petugas akan memperbarui data keluarga Anda.'
        },
        pecah: {
          title: 'Pecah Kartu Keluarga',
          requirements: [
            'KK asli orang tua.',
            'Buku Nikah / Akta Perkawinan bagi yang baru menikah.',
            'Surat pengantar RT/RW.'
          ],
          process: 'Digunakan untuk pasangan yang baru menikah and ingin memiliki KK sendiri terpisah dari orang tua.'
        }
      }
    }
  };

  const otherServices = [
    { name: 'KTP Elektronik', slug: 'ktp-elektronik' },
    { name: 'Kartu Keluarga', slug: 'kartu-keluarga' },
    { name: 'Kartu Identitas Anak', slug: 'kartu-identitas-anak' },
    { name: 'Akta Kelahiran', slug: 'akta-kelahiran' },
    { name: 'IKD / KTP Digital', slug: 'ikd-ktp-digital' },
    { name: 'Akta Perkawinan', slug: 'akta-perkawinan' },
    { name: 'Pindah / Datang', slug: 'pindah-datang' },
    { name: 'Akta Kematian', slug: 'akta-kematian' },
  ];

  // Fallback to KTP if slug not found in dummy
  const currentService = serviceData[slug as string] || serviceData['ktp-elektronik'];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      
      {/* Hero Section - Full Width with Padding */}
      <div className="p-[20px] w-full">
        <div className="relative h-[300px] md:h-[350px] overflow-hidden rounded-[20px] shadow-sm">
          <Image 
            src={currentService.image} 
            alt={currentService.title} 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
          
          {/* Title */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <div className="max-w-7xl mx-auto w-full text-white px-[20px]">
              <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-[#2ecc71] mb-2">
                <Link href="/layanan" className="hover:underline">Layanan</Link>
                <span>/</span>
                <span>Detail</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-2 leading-tight">
                {currentService.title}
              </h1>
              <p className="text-sm md:text-lg text-white/80 max-w-2xl">
                {currentService.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Tabs (Full Width Layout, No Sidebar) */}
      <main className="flex-grow pt-4 pb-16 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-[20px] relative z-10">
          
          {/* Full Width Card */}
          <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            
            {/* Tabs Navigation */}
            <div className="flex gap-2 border-b border-gray-100 pb-2 overflow-x-auto">
              {currentService.tabs.map((tab: any) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#27ae60] text-white shadow-md shadow-green-100'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content with Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4"
              >
                {/* Left Side: Requirements and Process (2/3 width) */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-xl font-extrabold text-gray-900 mb-2">
                      {currentService.content[activeTab].title}
                    </h2>
                    <div className="h-1 w-10 bg-[#27ae60] rounded-full"></div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-[#27ae60] rounded-full inline-block"></span>
                      Persyaratan Berkas
                    </h3>
                    <ul className="space-y-2">
                      {currentService.content[activeTab].requirements.map((req: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-[#27ae60] font-bold">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Process */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-[#27ae60] rounded-full inline-block"></span>
                      Prosedur Pelayanan
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {currentService.content[activeTab].process}
                    </p>
                  </div>
                </div>

                {/* Right Side: Other Services List (1/3 width) - Replaced Help Box */}
                <div className="md:col-span-1 space-y-6">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                    <h3 className="text-sm font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-[#27ae60] rounded-full inline-block"></span>
                      Informasi Umum
                    </h3>
                    <div className="space-y-3 text-xs">
                      <div>
                        <p className="text-gray-400 font-medium">Waktu Penyelesaian</p>
                        <p className="text-gray-900 font-bold">1 - 3 Hari Kerja</p>
                      </div>
                      <div className="h-px bg-gray-100"></div>
                      <div>
                        <p className="text-gray-400 font-medium">Biaya / Retribusi</p>
                        <p className="text-[#27ae60] font-extrabold">GRATIS (Rp 0)</p>
                      </div>
                      <div className="h-px bg-gray-100"></div>
                      <div>
                        <p className="text-gray-400 font-medium">Tempat Pelayanan</p>
                        <p className="text-gray-900 font-bold">Kantor Dinas / Kecamatan</p>
                      </div>
                    </div>
                  </div>

                  {/* Other Services List (Replacing the help box) */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                    <h3 className="text-sm font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-[#3498db] rounded-full inline-block"></span>
                      Layanan Lainnya
                    </h3>
                    <div className="space-y-2">
                      {otherServices.map((item, i) => (
                        <Link 
                          href={`/layanan/${item.slug}`} 
                          key={i}
                          className="flex items-center justify-between text-xs font-bold text-gray-600 hover:text-[#27ae60] transition-colors group"
                        >
                          <span>{item.name}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>
      </main>

      {/* Contact Section */}
      <div className="bg-[#f8fafc]">
        <ContactSection />
      </div>
      
      <Footer />
    </div>
  );
}
