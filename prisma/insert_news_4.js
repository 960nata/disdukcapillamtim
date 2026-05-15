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
      title: 'Semarak HUT Desa, Disdukcapil Lamtim Hadirkan Pelayanan Adminduk Keliling di Desa Mulyo Asri',
      slug: 'semarak-hut-desa-disdukcapil-lamtim-hadirkan-pelayanan-adminduk',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>LAMPUNG TIMUR – Semangat melayani hingga ke pelosok desa terus dibuktikan oleh jajaran Disdukcapil Kabupaten Lampung Timur. Memanfaatkan momentum perayaan Hari Ulang Tahun (HUT) Desa Mulyo Asri, Kecamatan Bumi Agung, pada Kamis, 11 Desember 2025, tim pelayanan keliling Disdukcapil hadir di tengah-tengah kemeriahan warga untuk memberikan kemudahan pengurusan dokumen kependudukan.</p><h2>Layanan Keliling Instruksi Bupati</h2><p>Layanan keliling ini merupakan instruksi langsung dari Bupati Lampung Timur, Ela Siti Nuryamah, yang menginginkan agar setiap perayaan di tingkat desa juga menjadi sarana bagi pemerintah untuk hadir memberikan solusi administratif bagi masyarakat. Dengan adanya stan pelayanan ini, warga desa tidak perlu jauh-jauh ke ibu kota kabupaten untuk mengurus Akta Kelahiran, Kartu Keluarga, maupun aktivasi Identitas Kependudukan Digital (IKD).</p><h3>Komitmen Pelayanan Prima</h3><p>Kepala Dinas Dukcapil Lampung Timur, Indragandi, S.IP., yang memantau langsung jalannya kegiatan, mengapresiasi antusiasme warga. "Kami ingin memastikan bahwa kebahagiaan warga merayakan HUT desanya semakin lengkap dengan kepastian kepemilikan dokumen kependudukan yang sah. Pelayanan keliling ini akan terus kami jadwalkan di berbagai desa lainnya sesuai arahan Ibu Bupati," ungkap Indragandi.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Pelayanan',
      seoTitle: 'Pelayanan Adminduk Keliling Disdukcapil Lamtim',
      seoDesc: 'Disdukcapil Lampung Timur hadirkan pelayanan keliling di HUT Desa Mulyo Asri.',
    },
    {
      title: 'Respon Cepat, Tim "Jemput Bola" Disdukcapil Lamtim Lakukan Perekaman KTP-el hingga ke Rumah Sakit',
      slug: 'respon-cepat-tim-jemput-bola-disdukcapil-lamtim-lakukan-perekaman',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>METRO – Dedikasi tanpa batas ditunjukkan oleh tim pelayanan administrasi kependudukan Lampung Timur. Tidak hanya berkeliling ke balai desa dan sekolah, Disdukcapil Lamtim juga memberikan respon cepat bagi warga yang sedang sakit. Hal ini terlihat pada Senin, 8 Desember 2025, saat petugas melakukan perekaman KTP-el langsung di Rumah Sakit Mardi Waluyo, Kota Metro.</p><h2>Perekaman KTP-el di Rumah Sakit</h2><p>Perekaman ini dilakukan bagi salah satu warga asal Pekalongan, Lampung Timur, yang membutuhkan dokumen kependudukan sebagai syarat administrasi perawatan medis. Mengingat kondisi pasien yang tidak memungkinkan untuk dibawa ke kantor dinas, tim "Jemput Bola" segera bergerak membawa peralatan rekam ke ruang perawatan pasien.</p><h3>Perlindungan Hak Identitas Warga</h3><p>Kepala Dinas Dukcapil Lampung Timur, Indragandi, S.IP., menegaskan bahwa pelayanan ini adalah bagian dari komitmen Pemerintah Kabupaten Lampung Timur di bawah kepemimpinan Bupati Ela Siti Nuryamah untuk memberikan perlindungan hak identitas bagi seluruh warga tanpa terkecuali, termasuk bagi mereka yang sedang berjuang melawan penyakit. "Tidak ada halangan bagi kami untuk melayani. Selama masyarakat membutuhkan identitas untuk keperluan darurat seperti kesehatan, tim kami siap bergerak kapan saja," tegasnya.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Pelayanan',
      seoTitle: 'Jemput Bola KTP-el di Rumah Sakit Disdukcapil Lamtim',
      seoDesc: 'Disdukcapil Lampung Timur lakukan perekaman KTP-el langsung di rumah sakit untuk warga sakit.',
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
