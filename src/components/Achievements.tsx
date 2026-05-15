'use client';

import * as React from 'react';

const kemenpanData = [
  { year: '2019', score: '4.02', pred: 'A-', note: 'Mulai konsisten di papan atas Lampung.' },
  { year: '2021', score: '4.25', pred: 'A-', note: 'Penilaian sempat tertunda karena pandemi.' },
  { year: '2022', score: '4.51', pred: 'A', note: 'Lonjakan signifikan di aspek digitalisasi.' },
  { year: '2023', score: '4.68', pred: 'A', note: 'Masuk jajaran Top Nasional unit kerja.' },
  { year: '2024', score: '4.75+', pred: 'A', note: 'Fokus pada integrasi IKD (Identitas Digital).' },
];

const ombudsmanData = [
  { year: '2021', score: '83.15', zone: 'Zona Hijau', desc: 'Kepatuhan Tinggi' },
  { year: '2022', score: '89.20', zone: 'Zona Hijau', desc: 'Kualitas Tertinggi' },
  { year: '2023', score: '93.28', zone: 'Zona Hijau', desc: 'Peringkat 2 se-Provinsi Lampung' },
  { year: '2024', score: '94.00+', zone: 'Zona Hijau', desc: 'Konsisten di 3 besar Kabupaten' },
];

export default function Achievements() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#27ae60] text-sm font-bold uppercase tracking-wider">Prestasi & Capaian</span>
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mt-2 mb-4">Bukti Komitmen Pelayanan Prima</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Disdukcapil Lampung Timur terus melakukan lompatan besar dalam peningkatan kualitas pelayanan publik dan kepatuhan standar nasional.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Highlight 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#27ae60]/10 rounded-xl flex items-center justify-center text-[#27ae60]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 15 2 2 4-4"></path><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><path d="M3 9h18"></path></svg>
              </div>
              <div>
                <div className="text-sm text-gray-500 font-medium">Evaluasi Kemenpan-RB</div>
                <div className="text-2xl font-bold text-gray-900">Skor 4.75 (A)</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3">Masuk jajaran Top Nasional unit kerja dengan predikat Pelayanan Prima.</p>
          </div>

          {/* Highlight 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#27ae60]/10 rounded-xl flex items-center justify-center text-[#27ae60]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <div>
                <div className="text-sm text-gray-500 font-medium">Kepatuhan Ombudsman</div>
                <div className="text-2xl font-bold text-gray-900">Skor 93.28</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3">Peringkat 2 se-Provinsi Lampung untuk kategori Kabupaten (Zona Hijau).</p>
          </div>

          {/* Highlight 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#27ae60]/10 rounded-xl flex items-center justify-center text-[#27ae60]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <div>
                <div className="text-sm text-gray-500 font-medium">Leveling Kemendagri</div>
                <div className="text-2xl font-bold text-gray-900">Level 4</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3">Kasta tertinggi yang menandakan pemenuhan 10 indikator nasional secara konsisten.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Kemenpan-RB & Ombudsman Timelines */}
          <div className="space-y-8">
            
            {/* Kemenpan Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#27ae60] rounded-full"></span>
                Evaluasi Kinerja Kemenpan-RB
              </h3>
              <div className="space-y-4">
                {kemenpanData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-700">{item.year}</span>
                      <span className="text-sm text-gray-500">{item.note}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#27ae60]">{item.score}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.pred.includes('A-') ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>{item.pred}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">* Instrumen PEKPPP (Skala 1-5). Poin: Kebijakan, SDM, Sarpras, Sistem Informasi, Konsultasi, Pengaduan.</p>
            </div>

            {/* Ombudsman Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#27ae60] rounded-full"></span>
                Kepatuhan Ombudsman RI
              </h3>
              <div className="space-y-4">
                {ombudsmanData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-700">{item.year}</span>
                      <span className="text-sm text-gray-500">{item.desc}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#27ae60]">{item.score}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-600">{item.zone}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">* Skala 0-100. Di atas 88 masuk Zona Hijau (Kualitas Tertinggi).</p>
            </div>
          </div>

          {/* Other Achievements & Conclusion (Bento Style) */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-grow">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#27ae60] rounded-full"></span>
                Prestasi & Inovasi Lainnya
              </h3>
              
              <div className="space-y-6">
                
                {/* Achievement 1 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#27ae60]/10 rounded-full flex-shrink-0 flex items-center justify-center text-[#27ae60]">
                    <span className="font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Peringkat 1 Inovasi Daerah</h4>
                    <p className="text-sm text-gray-600 mt-1">Sering memenangkan ajang Lampung Innovation Festival berkat aplikasi layanan mandiri yang memudahkan warga.</p>
                  </div>
                </div>

                {/* Achievement 2 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#27ae60]/10 rounded-full flex-shrink-0 flex items-center justify-center text-[#27ae60]">
                    <span className="font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Dukcapil Prima Award</h4>
                    <p className="text-sm text-gray-600 mt-1">Penghargaan khusus dari Mendagri untuk kategori Kabupaten dengan populasi besar namun mampu menjaga SLA penyelesaian dokumen di bawah 24 jam.</p>
                  </div>
                </div>

                {/* Achievement 3 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#27ae60]/10 rounded-full flex-shrink-0 flex items-center justify-center text-[#27ae60]">
                    <span className="font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Penerapan ISO 9001:2015</h4>
                    <p className="text-sm text-gray-600 mt-1">Sudah menerapkan standar manajemen mutu internasional dalam proses pengolahan data kependudukan.</p>
                  </div>
                </div>

                {/* Achievement 4 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#27ae60]/10 rounded-full flex-shrink-0 flex items-center justify-center text-[#27ae60]">
                    <span className="font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Tercepat Aktivasi IKD</h4>
                    <p className="text-sm text-gray-600 mt-1">Termasuk yang tercepat dalam aktivasi Identitas Kependudukan Digital di tingkat regional, di atas rata-rata target nasional.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Conclusion/Summary Box placed here to fill the gap */}
            <div className="bg-[#27ae60]/5 border border-[#27ae60]/20 rounded-2xl p-6 h-fit">
              <p className="text-sm text-[#2b7a4c] font-medium leading-relaxed">
                <strong className="text-[#1e5c35]">Kesimpulan:</strong> Lompatan paling signifikan terjadi pada tahun 2022 ke 2023, di mana Disdukcapil berhasil tembus dari predikat "Sangat Baik" (A-) ke level "Prima" (A) untuk Kemenpan-RB, serta meraih skor Ombudsman 93.28 yang menempatkannya sebagai salah satu yang terbaik di Provinsi Lampung.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
