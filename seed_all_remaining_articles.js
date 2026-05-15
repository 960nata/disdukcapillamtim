const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const fallbackUser = await prisma.user.findFirst();
    if (!fallbackUser) {
      console.error('No user found to assign as author. Create a user first.');
      return;
    }

    const articles = [
      {
        title: "LAMTIM CERIA: Upaya Disdukcapil Percepat Kepemilikan KIA di Sekolah",
        slug: "lamtim-ceria-upaya-disdukcapil-percepat-kepemilikan-kia-di-sekolah",
        category: "Inovasi",
        tags: "KIA,LAMTIM CERIA,Pelayanan,Anak",
        content: `
<h2>Menjemput Bola ke PAUD dan Sekolah Dasar</h2>
<p>Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kabupaten Lampung Timur terus menggeber kepemilikan Kartu Identitas Anak (KIA) melalui program inovatif **LAMTIM CERIA** (Lampung Timur Cetak dan Rekam Identitas Anak).</p>
<p>Program ini menyasar anak-anak usia 0-17 tahun kurang satu hari, dengan fokus utama pada siswa PAUD, TK, dan Sekolah Dasar. Petugas Disdukcapil mendatangi langsung sekolah-sekolah untuk melakukan perekaman dan pencetakan KIA di tempat.</p>
<p>KIA sangat penting sebagai identitas resmi anak yang berlaku nasional, berguna untuk pendaftaran sekolah, layanan kesehatan, hingga pembuatan paspor. Dengan program ini, orang tua tidak perlu repot mengantre di kantor Disdukcapil, cukup menitipkan berkas ke pihak sekolah.</p>
        `
      },
      {
        title: "SILAMTIM BERJAYA: Layanan Adminduk Online 24 Jam Tanpa Antre",
        slug: "silamtim-berjaya-layanan-adminduk-online-24-jam-tanpa-antre",
        category: "Inovasi",
        tags: "Online,SILAMTIM BERJAYA,Pelayanan",
        content: `
<h2>Urus Dokumen Kependudukan dari Rumah</h2>
<p>Memberikan kemudahan bagi warga yang sibuk atau tinggal jauh dari pusat kabupaten, Disdukcapil Lampung Timur mengandalkan aplikasi **SILAMTIM BERJAYA**.</p>
<p>Melalui platform ini, warga Lampung Timur dapat mengajukan permohonan berbagai dokumen kependudukan seperti Kartu Keluarga, Akta Kelahiran, Akta Kematian, hingga Surat Pindah secara online selama 24 jam sehari.</p>
<p>Warga cukup mengunggah berkas persyaratan dalam bentuk foto atau PDF. Setelah diproses dan ditandatangani secara elektronik (TTE) oleh pejabat, dokumen akan dikirimkan kembali ke email pemohon untuk dicetak secara mandiri menggunakan kertas HVS A4 80 gram.</p>
        `
      },
      {
        title: "Program PALING MANTAB: Lahir Langsung Dapat Akta dan BPJS Kesehatan",
        slug: "program-paling-mantab-lahir-langsung-dapat-akta-dan-bpjs-kesehatan",
        category: "Inovasi",
        tags: "BPJS,Integrasi,PALING MANTAB",
        content: `
<h2>Sinergi Pelayanan untuk Bayi Baru Lahir</h2>
<p>Disdukcapil Lampung Timur menghadirkan kemudahan luar biasa bagi para ibu yang baru melahirkan melalui program **PALING MANTAB** (Pelayanan Administrasi Kependudukan Lampung Timur Mantap Terintegrasi Bersama).</p>
<p>Bekerja sama dengan fasilitas kesehatan dan BPJS Kesehatan, program ini memungkinkan bayi yang baru lahir untuk langsung mendapatkan NIK, Akta Kelahiran, pembaruan Kartu Keluarga, sekaligus terdaftar sebagai peserta BPJS Kesehatan dalam satu kali proses.</p>
<p>Inovasi ini memangkas banyak waktu birokrasi, sehingga orang tua bisa lebih fokus merawat buah hati mereka tanpa harus pusing memikirkan pengurusan dokumen yang berbelit-belit.</p>
        `
      },
      {
        title: "Disdukcapil Lamtim Terapkan Sistem 5 Zona Pelayanan untuk Pecah Antrean",
        slug: "disdukcapil-lamtim-terapkan-sistem-5-zona-pelayanan-untuk-pecah-antrean",
        category: "Pelayanan",
        tags: "Zona,Pelayanan,Kecamatan",
        content: `
<h2>Mendekatkan Layanan di Tingkat Wilayah</h2>
<p>Untuk menghindari penumpukan antrean di Kantor Pusat Sukadana, Disdukcapil Lampung Timur membagi wilayah pelayanan menjadi **5 Zona Pelayanan** yang ditempatkan di kantor kecamatan strategis.</p>
<p>Kelima zona tersebut meliputi Zona 1 di Way Jepara, Zona 2 di Marga Sekampung, Zona 3 di Batanghari, Zona 4 di Mataram Baru, dan Zona 5 di Labuhan Maringgai.</p>
<p>Dengan adanya sistem zona ini, warga tidak perlu lagi menempuh jarak berjam-jam ke ibukota kabupaten. Cukup datangi kantor camat yang menjadi pusat zona wilayahnya untuk mendapatkan pelayanan dokumen kependudukan yang sama cepatnya.</p>
        `
      },
      {
        title: "Raih Nilai 95,08 dari Ombudsman RI, Disdukcapil Lamtim Masuk Zona Hijau",
        slug: "raih-nilai-9508-dari-ombudsman-ri-disdukcapil-lamtim-masuk-zona-hijau",
        category: "Prestasi",
        tags: "Ombudsman,Penghargaan,Pelayanan",
        content: `
<h2>Pengakuan Nasional Atas Kualitas Pelayanan</h2>
<p>Kerja keras jajaran Disdukcapil Kabupaten Lampung Timur dalam memperbaiki kualitas pelayanan publik berbuah manis dengan diraihnya nilai **95,08** dari Ombudsman RI pada tahun 2024.</p>
<p>Nilai tersebut menempatkan Disdukcapil Lampung Timur dalam **Zona Hijau dengan Kualitas Tertinggi**. Penilaian ini didasarkan pada standar kepatuhan pelayanan, sarana prasarana, kompetensi petugas, hingga pengelolaan pengaduan masyarakat.</p>
<p>Prestasi ini menjadi motivasi bagi seluruh aparatur Disdukcapil untuk terus mempertahankan dan meningkatkan kualitas pelayanan demi kepuasan masyarakat Lampung Timur.</p>
        `
      }
    ];

    for (const article of articles) {
      const news = await prisma.news.create({
        data: {
          title: article.title,
          slug: article.slug,
          content: article.content,
          status: "Published",
          authorId: fallbackUser.id,
          seoTitle: article.title,
          seoDesc: `Artikel mengenai ${article.title} oleh Disdukcapil Lampung Timur.`,
          category: article.category,
          tags: article.tags,
          coverImage: "/images/foto_kegiatan/kantor_luar.avif",
          isCarousel: true
        },
      });
      console.log('Seeded successfully:', news.title);
    }

    console.log('=== 5 more articles seeded successfully! ===');
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
