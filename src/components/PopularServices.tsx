import * as React from 'react';
import Link from 'next/link';

const services = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="7" y1="8" x2="17" y2="8"></line><line x1="7" y1="12" x2="17" y2="12"></line><line x1="7" y1="16" x2="13" y2="16"></line></svg>
    ),
    title: 'KTP Elektronik',
    description: 'Buat baru, cetak ulang, perubahan status, rusak & hilang.',
    href: '/layanan/ktp-elektronik',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
    ),
    title: 'Kartu Keluarga',
    description: 'Buat baru, tambah jiwa, pisah KK, perubahan data & hilang.',
    href: '/layanan/kartu-keluarga',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
    ),
    title: 'Kartu Identitas Anak',
    description: 'Buat baru, cetak ulang, perubahan & hilang. Program LAMTIM CERIA.',
    href: '/layanan/kartu-identitas-anak',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
    ),
    title: 'Akta Kelahiran',
    description: 'Penerbitan, kutipan, dan perbaikan data. Integrasi BPJS Kesehatan.',
    href: '/layanan/akta-kelahiran',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
    ),
    title: 'IKD / KTP Digital',
    description: 'Aktivasi Identitas Kependudukan Digital via smartphone. Tersedia jemput bola.',
    href: '/layanan/ikd-ktp-digital',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l9.54-9.541.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
    ),
    title: 'Akta Perkawinan',
    description: 'Penerbitan dan pencatatan. Termasuk program Isbath Nikah Terpadu.',
    href: '/layanan/akta-perkawinan',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
    ),
    title: 'Pindah / Datang',
    description: 'Surat keterangan pindah dan datang antar kecamatan maupun provinsi.',
    href: '/layanan/pindah-datang',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
    ),
    title: 'Akta Kematian',
    description: 'Penerbitan akta dan surat keterangan kematian untuk keperluan hukum.',
    href: '/layanan/akta-kematian',
  },
];

export default function PopularServices() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-xl md:text-3xl font-extrabold text-gray-900 mt-1 mb-2 tracking-tight">Layanan Kependudukan</h2>
            <p className="text-gray-600 max-w-2xl text-sm font-medium">
              Akses cepat ke dokumen yang paling sering dibutuhkan masyarakat Lampung Timur.
            </p>
          </div>
          <Link href="/layanan" className="text-[#27ae60] font-bold hover:text-[#1e8449] transition-colors mt-4 md:mt-0 flex items-center gap-1 text-sm">
            Semua layanan <span>→</span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <div key={index} className="group bg-white border border-gray-100 hover:border-[#27ae60] rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full relative">
              {/* Icon */}
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#27ae60] mb-5 group-hover:bg-[#27ae60]/10 transition-colors">
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-sm sm:text-base font-extrabold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-xs text-gray-500 mb-4 flex-grow font-medium leading-relaxed">{service.description}</p>

              {/* Link */}
              <Link href={service.href} className="text-xs font-bold text-[#27ae60] hover:text-[#1e8449] transition-colors flex items-center gap-1 mt-auto">
                Lihat persyaratan <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
