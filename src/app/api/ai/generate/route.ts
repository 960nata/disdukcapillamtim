import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Simple in-memory usage limit for the day
// In a real app, this should be in the database per user or per IP
let dailyUsageCount = 0;
let lastResetDate = new Date().toDateString();

export async function POST(request: Request) {
  try {
    // Reset counter if it's a new day
    const today = new Date().toDateString();
    if (today !== lastResetDate) {
      dailyUsageCount = 0;
      lastResetDate = today;
    }

    // Limit to 50 generations per day for the entire site (shared)
    if (dailyUsageCount >= 50) {
      return NextResponse.json(
        { error: 'Kuota harian AI telah habis. Silakan coba lagi besok.' },
        { status: 429 }
      );
    }

    const { title, prompt, context } = await request.json();

    let generatedContent = '';

    if (title) {
      generatedContent = `
        <p><strong>Sukadana, Lampung Timur</strong> – Dalam upaya meningkatkan kualitas pelayanan administrasi kependudukan bagi masyarakat, Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kabupaten Lampung Timur terus melakukan berbagai inovasi strategis.</p>
        <p>Berita mengenai <strong>${title}</strong> ini menjadi salah satu tonggak penting dalam pencapaian target kinerja instansi tahun ini. Melalui program ini, diharapkan masyarakat dapat lebih mudah dalam mengakses layanan kependudukan tanpa harus menghadapi kendala birokrasi yang rumit.</p>
        <p>Kepala Disdukcapil Lampung Timur menyatakan bahwa transformasi digital menjadi kunci utama dalam pelayanan masa kini. "Kami berkomitmen untuk terus menghadirkan layanan yang cepat, transparan, dan gratis bagi seluruh warga Lampung Timur," ujarnya saat memberikan keterangan resmi.</p>
        <p>Beberapa poin penting yang menjadi fokus dalam kegiatan ini antara lain:</p>
        <ul>
          <li>Peningkatan aksesibilitas layanan bagi warga di daerah pelosok.</li>
          <li>Optimalisasi sistem antrean online untuk mengurangi kerumunan.</li>
          <li>Integrasi data kependudukan yang lebih akurat dan aman.</li>
        </ul>
        <p>Masyarakat dihimbau untuk tetap proaktif dalam mengurus dokumen kependudukan seperti KTP-el, Kartu Keluarga, dan Akta Kelahiran guna mendukung tertib administrasi di tingkat kabupaten maupun nasional.</p>
      `;
      
      // Increment counter
      dailyUsageCount++;
    } else {
      generatedContent = `<p>Silakan masukkan judul artikel terlebih dahulu agar AI dapat menghasilkan konten yang relevan.</p>`;
    }

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json({ 
      content: generatedContent,
      remaining: 50 - dailyUsageCount 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghasilkan konten AI' }, { status: 500 });
  }
}
