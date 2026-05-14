'use client';

import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";

const defaultStructure = [
  { name: "Indra Gandi, S. IP", role: "Plt. Kepala Dinas / Sekretaris", nip: "19771010 199603 1 001", order: 1 },
  { name: "WIDI TAMA SAPUTRA", title: "S.E., M.M", role: "Kabid Pendaftaran Penduduk", nip: "19830512 200212 1 003", order: 2 },
  { name: "Denny Kurniawan R", title: "S.IP., M.H", role: "Kabid Pencatatan Sipil", nip: "19800405 200903 1 001", order: 3 },
  { name: "Drs. I Wayan Wartama", role: "Kabid PIAK", nip: "19691001 199803 1 001", order: 4 },
  { name: "Dian Trisnowati. H", role: "Kabid Inovasi Pelayanan", nip: "19680220 199803 2002", order: 5 },
];

export default function ProfilPage() {
  const [structure, setStructure] = useState<any[]>(defaultStructure);

  useEffect(() => {
    async function fetchStructure() {
      try {
        const res = await fetch('/api/structure');
        const data = await res.json();
        if (data && data.length > 0) {
          setStructure(data);
        }
      } catch (error) {
        console.error('Failed to fetch structure:', error);
      }
    }
    fetchStructure();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      
      {/* Hero Section Wrapper with Padding */}
      <div className="p-[20px]">
        {/* Hero Section Inner with Border Radius */}
        <div className="relative h-[450px] flex items-center justify-center overflow-hidden rounded-[20px]">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/foto_kegiatan/kantor_luar.avif" 
              alt="Kantor Disdukcapil" 
              fill 
              className="object-cover"
              priority
            />
            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center text-white px-4 mt-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Profil Dinas Kependudukan</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Kenali lebih dekat visi, misi, dan struktur organisasi Dinas Kependudukan dan Pencatatan Sipil Kabupaten Lampung Timur.
            </p>
          </div>
        </div>
      </div>
      
      <main className="flex-grow pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* 2. VISI & MISI */}
          <motion.section 
            className="pt-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Visi - Dark Green Block (Matching Home page banner style) */}
              <div className="flex-1 bg-[#0b2b26] p-10 md:p-14 rounded-[2rem] flex flex-col justify-between text-white shadow-xl">
                <div>
                  <span className="text-[#27ae60] text-sm font-bold uppercase tracking-widest mb-4 block">Arah Kebijakan</span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-8">Visi</h2>
                </div>
                <p className="text-2xl md:text-3xl font-medium leading-snug text-white/90">
                  "Terwujudnya Tertib Administrasi Kependudukan Menuju Masyarakat Lampung Timur yang Sejahtera dan Berkeadilan"
                </p>
              </div>

              {/* Misi - Light Blocks with Soft Shadows */}
              <div className="flex-1 flex flex-col gap-6">
                <div className="bg-white border border-gray-100 p-8 rounded-[2rem] flex-1 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Misi Utama</h3>
                  <div className="space-y-4">
                    {[
                      "Meningkatkan kualitas pelayanan administrasi kependudukan",
                      "Mewujudkan database kependudukan yang akurat dan terkini"
                    ].map((misi, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-6 h-6 bg-[#27ae60]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <div className="w-2 h-2 bg-[#27ae60] rounded-full"></div>
                        </div>
                        <p className="text-gray-700 font-medium">{misi}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white border border-gray-100 p-8 rounded-[2rem] flex-1 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Misi Pendukung</h3>
                  <div className="space-y-4">
                    {[
                      "Mendorong kesadaran masyarakat akan pentingnya dokumen kependudukan",
                      "Mengembangkan SDM yang profesional dan berintegritas"
                    ].map((misi, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-6 h-6 bg-[#27ae60]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <div className="w-2 h-2 bg-[#27ae60] rounded-full"></div>
                        </div>
                        <p className="text-gray-700 font-medium">{misi}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 3. KEDUDUKAN, TUGAS, FUNGSI */}
          <motion.section 
            className="pt-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Dasar Hukum</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Kedudukan */}
              <div className="bg-white border border-gray-100 p-10 rounded-[2rem] flex flex-col shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-[#27ae60] font-bold text-xl mb-6">
                  01
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Kedudukan</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Dinas Kependudukan dan Pencatatan Sipil merupakan unsur pelaksana Pemerintah Daerah yang dipimpin oleh Kepala Dinas dan berkedudukan di bawah serta bertanggungjawab kepada Bupati melalui Sekretaris Daerah.
                </p>
              </div>

              {/* Tugas Pokok */}
              <div className="bg-[#0b2b26] p-10 rounded-[2rem] flex flex-col text-white shadow-xl transform md:-translate-y-4 transition-transform">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-[#27ae60] font-bold text-xl mb-6">
                  02
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Tugas Pokok</h3>
                <p className="text-white/80 font-medium leading-relaxed">
                  Melaksanakan urusan rumah tangga Pemerintah Daerah dan tugas pembantuan di bidang Kependudukan dan Pencatatan Sipil secara komprehensif.
                </p>
              </div>

              {/* Fungsi Summary */}
              <div className="bg-white border border-gray-100 p-10 rounded-[2rem] flex flex-col shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-[#27ae60] font-bold text-xl mb-6">
                  03
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Fungsi</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Perumusan, pelaksanaan, evaluasi, dan pelaporan kebijakan bidang pendaftaran penduduk dan pencatatan sipil.
                </p>
              </div>
            </div>

            {/* Fungsi Detail - Full width block */}
            <div className="mt-6 bg-white border border-gray-100 p-10 md:p-12 rounded-[2rem] shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Rincian Fungsi Dinas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {[
                  "Perumusan kebijakan bidang pendaftaran penduduk, pencatatan sipil, dan pengelolaan sistem informasi",
                  "Pelaksanaan kebijakan bidang pendaftaran penduduk, pencatatan sipil, dan pengelolaan sistem informasi",
                  "Pelaksanaan evaluasi dan pelaporan administrasi kependudukan",
                  "Pelaksanaan administrasi dinas sesuai dengan lingkup tugasnya",
                  "Pelaksanaan fungsi lain yang diberikan oleh Bupati"
                ].map((fungsi, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#27ae60]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-3 h-3 bg-[#27ae60] rounded-full"></div>
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed pt-1">{fungsi}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* 4. RENCANA STRATEGIS */}
          <motion.section 
            className="pt-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Rencana Strategis</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tujuan & Sasaran */}
              <div className="bg-[#0b2b26] p-10 rounded-[2rem] text-white shadow-xl">
                <h3 className="text-3xl font-bold text-white mb-8">Tujuan & Sasaran</h3>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-[#27ae60] font-bold mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#27ae60] rounded-full"></div>
                      Tujuan
                    </h4>
                    <p className="text-white/80 font-medium leading-relaxed">
                      Meningkatkan kesadaran hukum masyarakat, memberi pelayanan prima, mewujudkan database akurat, dan meningkatkan tertib administrasi.
                    </p>
                  </div>
                  <div className="h-px w-full bg-white/10"></div>
                  <div>
                    <h4 className="text-[#27ae60] font-bold mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#27ae60] rounded-full"></div>
                      Sasaran
                    </h4>
                    <p className="text-white/80 font-medium leading-relaxed">
                      Terlayaninya masyarakat dengan prima, terwujudnya sumber informasi publik akurat, dan terpenuhinya sarana/prasarana dinas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Kebijakan & Program */}
              <div className="flex flex-col gap-6">
                <div className="bg-white border border-gray-100 p-10 rounded-[2rem] flex-1 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Kebijakan</h3>
                  <ul className="space-y-3">
                    {['Penyuluhan kesadaran hukum', 'Peningkatan Kinerja Personil', 'Pelaksanaan pelayanan Prima', 'Pemenuhan prasarana'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-[#27ae60] font-bold">→</span>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white border border-gray-100 p-10 rounded-[2rem] flex-1 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Program</h3>
                  <ul className="space-y-3">
                    {['Penataan Administrasi Kependudukan', 'Pelayanan Administrasi Perkantoran', 'Pengadaan Sarana Ruang Arsip'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-[#27ae60] font-bold">→</span>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 5. STRUKTUR ORGANISASI */}
          <motion.section 
            className="pt-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Manajemen</h2>
              <span className="bg-gray-100 px-4 py-2 rounded-full font-bold text-sm text-gray-700">
                Struktur Organisasi
              </span>
            </div>
            
            {/* Kepala Dinas */}
            {structure.filter(p => p.order === 1 || p.role.includes("Kepala")).map((person, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-[2rem] p-8 mb-6 flex flex-col md:flex-row items-center gap-8 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-32 h-32 bg-[#27ae60]/10 rounded-full flex items-center justify-center border-2 border-[#27ae60]/20 flex-shrink-0">
                  {person.photoUrl ? (
                    <Image src={person.photoUrl} alt={person.name} width={128} height={128} className="rounded-full object-cover" />
                  ) : (
                    <span className="text-5xl font-bold text-[#27ae60]">{person.name.charAt(0)}</span>
                  )}
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{person.name}</h3>
                  <p className="text-xl font-medium text-[#27ae60] mb-4">{person.role}</p>
                  {person.nip && (
                    <span className="inline-block bg-gray-100 text-gray-700 font-mono font-bold px-4 py-2 rounded-full text-sm">
                      NIP. {person.nip}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Kabid Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {structure.filter(p => !(p.order === 1 || p.role.includes("Kepala"))).map((person, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-700 font-bold text-xl mb-6 shadow-sm border border-gray-100">
                    {person.photoUrl ? (
                      <Image src={person.photoUrl} alt={person.name} width={64} height={64} className="rounded-full object-cover" />
                    ) : (
                      person.name.charAt(0)
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">{person.name}</h3>
                  {person.title && <p className="text-sm font-bold text-gray-400 mb-2">{person.title}</p>}
                  {!person.title && <div className="h-4 mb-2"></div>}
                  <p className="text-[#27ae60] font-medium text-sm mb-4">{person.role.includes("Kabid") ? person.role : `Kabid ${person.role}`}</p>
                  {person.nip && <p className="text-gray-400 text-xs font-mono mt-auto">NIP. {person.nip}</p>}
                  
                  {/* Hover accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#27ae60] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </div>
              ))}
            </div>
          </motion.section>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
