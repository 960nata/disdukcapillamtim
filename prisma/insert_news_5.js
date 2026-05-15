const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findFirst()
  if (!user) {
    console.error('No user found in database. Please run seed first.')
    return
  }

  const newsData = [
    {
      title: 'Peringati HUT RI ke-80, Layanan Adminduk Zona 1 dan MPP Lamtim Libur Sehari pada 18 Agustus 2025',
      slug: 'peringati-hut-ri-ke-80-layanan-adminduk-zona-1-dan-mpp-lamtim',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>LAMPUNG TIMUR – Sehubungan dengan perayaan Hari Ulang Tahun (HUT) Kemerdekaan Republik Indonesia ke-80, Pemerintah Kabupaten Lampung Timur mengeluarkan penyesuaian jadwal pelayanan publik. Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) mengumumkan bahwa seluruh layanan administrasi kependudukan (Adminduk) di Mall Pelayanan Publik (MPP) serta titik layanan kewilayahan, khususnya Zona 1, akan ditutup sementara pada Senin, 18 Agustus 2025.</p><h2>Penutupan Layanan Merujuk Cuti Bersama</h2><p>Penutupan layanan ini merujuk pada ketetapan Cuti Bersama nasional. Kepala Disdukcapil Lampung Timur, Indragandi, S.IP., mengimbau agar masyarakat yang berada di wilayah cakupan Zona 1 dapat menyesuaikan jadwal kepengurusan dokumennya.</p><h3>Sistem Pembagian Wilayah 5 Zona</h3><p>"Kami informasikan bahwa pelayanan akan kembali beroperasi normal pada Selasa, 19 Agustus 2025. Bagi warga di Zona 1 yang memiliki keperluan mendesak, diharapkan dapat mengurus dokumennya sebelum atau sesudah cuti bersama tersebut," jelasnya. Sistem pembagian wilayah menjadi 5 zona ini sendiri sejalan dengan arahan Bupati Ela Siti Nuryamah untuk mengurai antrean di pusat dan mendekatkan layanan ke masyarakat di tiap kecamatan.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Pelayanan',
      seoTitle: 'Libur Layanan Adminduk Zona 1 Disdukcapil Lamtim',
      seoDesc: 'Layanan Adminduk Zona 1 and MPP Lamtim libur sehari pada 18 Agustus 2025.',
    },
    {
      title: 'Semarak Kemerdekaan di Wilayah Zona 2, Disdukcapil Lamtim Antar "Kado" Dokumen Adminduk Langsung ke Warga',
      slug: 'semarak-kemerdekaan-di-wilayah-zona-2-disdukcapil-lamtim-antar-kado',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>LAMPUNG TIMUR – Sistem pelayanan berbasis zonasi yang diterapkan oleh Disdukcapil Kabupaten Lampung Timur terbukti efektif dalam menjangkau masyarakat dengan lebih cepat. Memasuki momen peringatan HUT RI ke-80 pada 17 Agustus 2025, tim pelayanan yang bertugas di wilayah Zona 2 melakukan aksi simpatik dengan membagikan "Kado Kemerdekaan" spesial bagi warganya.</p><h2>Kado Kemerdekaan untuk Bayi Lahir 17 Agustus</h2><p>Kado tersebut bukanlah barang biasa, melainkan kelengkapan dokumen administrasi kependudukan (Adminduk) gratis, meliputi Kartu Keluarga (KK), Akta Kelahiran, and Kartu Identitas Anak (KIA). Dokumen ini diberikan khusus kepada 5 keluarga beruntung yang bayinya lahir tepat pada momentum Hari Kemerdekaan. Dokumen-dokumen ini diserahkan langsung beserta piagam penghargaan dari Bupati Lampung Timur, Ela Siti Nuryamah.</p><h3>Kehadiran Pemerintah di Momen Bersejarah</h3><p>Kepala Disdukcapil, Indragandi, S.IP., menyampaikan bahwa pelayanan di Zona 2 ini merupakan representasi kehadiran pemerintah daerah di momen yang bersejarah. "Melalui pembagian titik layanan dari Zona 1 hingga Zona 5, kami bisa bergerak lebih reponsif. Petugas di Zona 2 langsung mendata and mencetak dokumen sebagai kejutan kado bagi warga yang melahirkan di hari kemerdekaan ini," tuturnya.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Pelayanan',
      seoTitle: 'Kado Kemerdekaan Adminduk Disdukcapil Lamtim',
      seoDesc: 'Disdukcapil Lampung Timur antar kado dokumen Adminduk langsung ke warga di Zona 2.',
    }
  ]

  for (const data of newsData) {
    const news = await prisma.news.upsert({
      where: { slug: data.slug },
      update: data,
      create: data,
    })
    console.log('Inserted/Updated news:', news.title)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
