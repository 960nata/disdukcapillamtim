const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function generateLongContent(title) {
  const baseParagraphs = [
    `Pelayanan publik yang berkualitas adalah dambaan setiap warga negara. Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kabupaten Lampung Timur terus berkomitmen untuk mewujudkan hal tersebut melalui berbagai inovasi dan kerja keras seluruh jajaran pegawai. Dalam rangka mendukung visi Lampung Timur Makmur Menuju Indonesia Emas, berbagai program strategis telah dicanangkan dan dilaksanakan dengan penuh dedikasi.`,
    `Tantangan geografis Kabupaten Lampung Timur yang sangat luas dengan 264 desa dan 24 kecamatan bukanlah halangan yang berarti bagi dinas ini. Dengan semangat melayani sepenuh hati, petugas Disdukcapil rela turun langsung ke lapangan, menjangkau desa-desa terpencil, bahkan wilayah perbatasan yang sulit diakses oleh kendaraan umum. Semua ini dilakukan demi memastikan bahwa setiap warga negara mendapatkan hak sipilnya berupa dokumen kependudukan yang sah.`,
    `Inovasi digital juga menjadi fokus utama dalam transformasi pelayanan ini. Penerapan Identitas Kependudukan Digital (IKD) terus dikejar targetnya agar warga dapat mengakses identitas mereka hanya melalui genggaman smartphone. Hal ini tidak hanya mempermudah warga, tetapi juga meningkatkan efisiensi birokrasi dan mengurangi penggunaan kertas secara signifikan, sejalan dengan konsep green government.`,
    `Kerja sama lintas sektoral juga terus dibangun oleh Disdukcapil Lampung Timur. Kolaborasi dengan Pengadilan Agama, Kementerian Agama, BPJS Kesehatan, hingga pihak perbankan membuktikan bahwa dinas ini tidak bekerja sendirian dalam menyelesaikan persoalan kependudukan. Sinergi ini melahirkan berbagai program terintegrasi yang sangat memudahkan warga dalam mengurus banyak hal dalam satu pintu pelayanan.`,
    `Evaluasi dan monitoring juga terus dilakukan secara berkala untuk memastikan standar pelayanan tetap terjaga. Nilai tinggi yang diraih dari Ombudsman RI bukanlah akhir dari pencapaian, melainkan titik awal untuk terus berbenah dan memberikan yang terbaik bagi masyarakat. Kepuasan masyarakat adalah indikator utama keberhasilan kinerja Disdukcapil Lampung Timur.`
  ];

  let content = `<h2>${title}</h2><p>${baseParagraphs[0]}</p>`;
  
  // Repeat to reach ~4000 words
  // Each paragraph is about 50-70 words. We need about 60-70 paragraphs to reach 4000 words.
  let wordCount = 0;
  let sectionIndex = 1;
  
  while (wordCount < 4200) {
    content += `<h3>Sub-Bagian Analisis ${sectionIndex}</h3>`;
    for (const p of baseParagraphs) {
      content += `<p>${p}</p>`;
      wordCount += p.split(' ').length;
    }
    content += `<p>Tambahan analisis mendalam mengenai pentingnya program ini dalam skala nasional. Implementasi kebijakan yang terukur dan berbasis data (data-driven policy) menjadi kunci suksesnya kegiatan ini di lapangan. Seluruh stakeholder memberikan dukungan penuh agar kegiatan ini dapat berjalan lancar tanpa kendala yang berarti.</p>`;
    wordCount += 35;
    sectionIndex++;
  }

  content += `<h2>Kesimpulan Akhir</h2><p>Dengan demikian, kegiatan ini membuktikan bahwa Disdukcapil Lampung Timur selalu berada di garda terdepan dalam inovasi pelayanan publik di Provinsi Lampung.</p>`;
  
  return content;
}

async function main() {
  try {
    const fallbackUser = await prisma.user.findFirst();
    if (!fallbackUser) {
      console.error('No user found to assign as author. Create a user first.');
      return;
    }

    const specificTitles = {
      1: "Lampung Timur Raih Penghargaan Nasional Penyusunan PJPK Berkualitas 2025",
      2: "Inovasi 'Si Lamtim Makmur' Capai User Terdaftar 500 Ribu Jiwa",
      3: "Disdukcapil Lamtim Pecahkan Rekor Perekaman IKD Tercepat di Provinsi Lampung",
      4: "Sukses Integrasi Data Kependudukan dengan Sistem Perbankan Daerah",
      5: "Pelayanan 'Jebol' (Jemput Bola) di Wilayah Pesisir Labuhan Maringgai",
      6: "Evaluasi Akhir Tahun: Kepuasan Masyarakat Disdukcapil Lamtim Tembus 95%",
      7: "Penerapan Tanda Tangan Elektronik (TTE) 100% di Seluruh Kecamatan",
      8: "Disdukcapil Lamtim Terima Kunjungan Studi Tiru dari Kabupaten Luar Jawa",
      9: "Fasilitasi Akta Kelahiran Kolektif bagi Anak-anak di Panti Asuhan",
      10: "Peluncuran Program 'Dukcapil Goes to School' Batch 2025",
      50: "Launching Layanan Identitas Kependudukan Digital (IKD) di Desa Tulusrejo",
      51: "Dedikasi Tanpa Batas: Disdukcapil Tetap Layani Warga di Hari Pencoblosan Pilkada",
      52: "Soft Opening Mal Pelayanan Publik (MPP) Lampung Timur di Sukadana",
      100: "Perpanjangan Sertifikasi ISO 9001:2015 untuk Manajemen Pelayanan Disdukcapil"
    };

    const newsData = [];
    const now = new Date();

    for (let i = 1; i <= 100; i++) {
      let title = specificTitles[i];
      if (!title) {
        // Generate titles for the rest
        const categories = ["Pelayanan", "Inovasi", "Prestasi", "Kerjasama", "Edukasi"];
        const cat = categories[i % categories.length];
        const regions = ["Sukadana", "Way Jepara", "Batanghari", "Labuhan Maringgai", "Mataram Baru", "Sekampung"];
        const reg = regions[i % regions.length];
        
        if (i % 3 === 0) {
          title = `Disdukcapil Sukses Gelar Pelayanan Terintegrasi di Kecamatan ${reg} Nomor ${i}`;
        } else if (i % 3 === 1) {
          title = `Apresiasi Warga Terhadap Kemudahan Layanan Online Disdukcapil di ${reg} Seri ${i}`;
        } else {
          title = `Pemberian Penghargaan Pegawai Teladan Pelayanan Kategori ${cat} Ke-${i}`;
        }
      }

      const slug = `berita-otomatis-${i}-${Date.now()}`;
      
      // Distribute dates over 2023-2026
      const date = new Date(now);
      date.setDate(now.getDate() - (100 - i) * 10); // Spread dates backwards

      newsData.push({
        title: title,
        slug: slug,
        content: generateLongContent(title),
        status: "Published",
        authorId: fallbackUser.id,
        category: i % 2 === 0 ? "Pelayanan" : "Prestasi",
        tags: "Otomatis,Pelayanan,Prestasi",
        coverImage: "/images/foto_kegiatan/kantor_luar.avif",
        isCarousel: i % 10 === 0,
        createdAt: date,
        updatedAt: date
      });
    }

    console.log(`Preparing to insert ${newsData.length} articles...`);
    
    // Use createMany for speed
    const result = await prisma.news.createMany({
      data: newsData,
      skipDuplicates: true
    });

    console.log(`=== Sukses Mengisi ${result.count} Berita Baru! ===`);
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
