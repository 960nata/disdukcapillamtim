'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      
      {/* Hero Section Wrapper with Padding */}
      <div className="p-[20px]">
        {/* Hero Section Inner with Border Radius */}
        <div className="relative h-[300px] flex items-center justify-center overflow-hidden rounded-[20px] bg-[#0b2b26]">
          {/* Content */}
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">Kebijakan Privasi</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Komitmen kami dalam melindungi dan menjaga privasi data Anda.
            </p>
          </div>
        </div>
      </div>
      
      <main className="flex-grow pb-20">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="prose prose-green max-w-none">
            <p className="text-gray-600 mb-6">
              Terakhir diperbarui: 15 Mei 2026
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Informasi yang Kami Kumpulkan</h2>
            <p className="text-gray-600 mb-4">
              Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kabupaten Lampung Timur mengumpulkan informasi yang Anda berikan secara langsung saat menggunakan layanan kami, termasuk namun tidak terbatas pada nama, nomor identitas, alamat, dan informasi kontak.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Penggunaan Informasi</h2>
            <p className="text-gray-600 mb-4">
              Kami menggunakan informasi yang dikumpulkan untuk memproses permohonan administrasi kependudukan Anda, memberikan informasi terkait layanan, dan meningkatkan kualitas pelayanan kami. Kami tidak akan menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Keamanan Data</h2>
            <p className="text-gray-600 mb-4">
              Kami menerapkan langkah-langkah keamanan fisik, elektronik, dan manajerial yang ketat untuk melindungi informasi Anda dari akses yang tidak sah, perubahan, pengungkapan, atau penghancuran.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Hak Anda</h2>
            <p className="text-gray-600 mb-4">
              Anda berhak untuk mengakses, memperbarui, atau meminta penghapusan informasi pribadi Anda yang kami simpan, sesuai dengan peraturan perundang-undangan yang berlaku di Republik Indonesia.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Kontak Kami</h2>
            <p className="text-gray-600 mb-4">
              Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami melalui saluran komunikasi yang tersedia di halaman Kontak.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
