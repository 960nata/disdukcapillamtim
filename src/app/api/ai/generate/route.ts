import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { title, prompt, context } = await request.json();

    // In a real application, you would call Gemini/OpenAI here.
    // Example with a high-quality mocked response for Disdukcapil:
    
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
    } else {
      generatedContent = `<p>Silakan masukkan judul artikel terlebih dahulu agar AI dapat menghasilkan konten yang relevan.</p>`;
    }

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json({ content: generatedContent });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghasilkan konten AI' }, { status: 500 });
  }
}
