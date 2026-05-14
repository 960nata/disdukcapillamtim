'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      
      {/* Hero Section Wrapper with Padding */}
      <div className="p-[20px]">
        {/* Hero Section Inner with Border Radius */}
        <div className="relative h-[300px] flex items-center justify-center overflow-hidden rounded-[20px] bg-[#0b2b26]">
          {/* Content */}
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">Syarat & Ketentuan</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Aturan dan ketentuan penggunaan layanan Disdukcapil Lampung Timur.
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
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Penerimaan Ketentuan</h2>
            <p className="text-gray-600 mb-4">
              Dengan mengakses dan menggunakan situs web serta layanan Disdukcapil Kabupaten Lampung Timur, Anda dianggap telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat dan Ketentuan ini serta semua hukum dan peraturan yang berlaku.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Penggunaan Layanan</h2>
            <p className="text-gray-600 mb-4">
              Anda setuju untuk menggunakan layanan kami hanya untuk tujuan yang sah dan sesuai dengan peraturan perundang-undangan yang berlaku. Anda dilarang untuk menggunakan situs ini dengan cara yang dapat merusak, melumpuhkan, membebani, atau mengganggu server atau jaringan kami.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Akurasi Informasi</h2>
            <p className="text-gray-600 mb-4">
              Anda bertanggung jawab atas keakuratan dan kebenaran data yang Anda berikan kepada kami. Memberikan informasi palsu dapat mengakibatkan pembatalan layanan dan/atau konsekuensi hukum sesuai dengan peraturan yang berlaku.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Hak Kekayaan Intelektual</h2>
            <p className="text-gray-600 mb-4">
              Semua konten yang terdapat di situs web ini, termasuk namun tidak terbatas pada teks, grafis, logo, dan gambar, adalah milik Disdukcapil Kabupaten Lampung Timur atau pemegang lisensinya dan dilindungi oleh undang-undang hak cipta.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Perubahan Ketentuan</h2>
            <p className="text-gray-600 mb-4">
              Kami berhak untuk mengubah Syarat dan Ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya. Penggunaan berkelanjutan Anda atas situs ini setelah perubahan tersebut akan dianggap sebagai penerimaan Anda terhadap ketentuan yang baru.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
