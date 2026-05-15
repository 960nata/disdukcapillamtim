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
      title: 'Berbuah Manis, Disdukcapil Lamtim Sukses Sabet Predikat "Pelayanan Sangat Baik (A-)" Tahun 2024',
      slug: 'berbuah-manis-disdukcapil-lamtim-sukses-sabet-predikat',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>BANDAR LAMPUNG – Kerja keras and dedikasi jajaran Pemerintah Kabupaten Lampung Timur dalam memberikan pelayanan publik yang prima akhirnya berbuah manis. Dinas Kependudukan and Pencatatan Sipil (Disdukcapil) Lampung Timur berhasil menorehkan prestasi gemilang dengan meraih predikat Pelayanan Sangat Baik (A-) dalam ajang Pemantauan and Evaluasi Kinerja Penyelenggaraan Pelayanan Publik (PEKPPP) Pemerintah Daerah Tahun 2024.</p><h2>Prestasi Gemilang Tingkat Provinsi</h2><p>Penghargaan bergengsi tersebut secara resmi diumumkan and diserahkan dalam agenda yang berlangsung di Gedung Pusiban, Kantor Gubernur Provinsi Lampung, pada Kamis, 24 Juli 2025. Predikat A- ini menjadi bukti nyata bahwa inovasi-inovasi yang digulirkan oleh Disdukcapil Lamtim—mulai dari layanan jemput bola, aktivasi IKD, hingga pembagian titik zona pelayanan—diakui efektivitasnya secara nasional maupun di tingkat provinsi.</p><h3>Pecutan Semangat untuk Terus Berinovasi</h3><p>Bupati Lampung Timur, Ela Siti Nuryamah, memberikan apresiasi setinggi-tingginya atas capaian ini. Menurutnya, penghargaan ini adalah hasil dari komitmen bersama untuk berorientasi pada kepuasan masyarakat. Sementara itu, Kepala Disdukcapil Lampung Timur, Indragandi, S.IP., menyatakan bahwa prestasi ini bukan akhir, melainkan pecutan semangat. "Alhamdulillah, predikat ini adalah wujud kerja keras seluruh tim di lapangan. Ke depannya, kami akan terus meningkatkan kualitas layanan agar Lampung Timur makin maju, responsif, and benar-benar melayani setulus hati," tutup Indragandi.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Prestasi',
      seoTitle: 'Disdukcapil Lamtim Raih Predikat Pelayanan Sangat Baik',
      seoDesc: 'Disdukcapil Lampung Timur sukses sabet predikat Pelayanan Sangat Baik (A-) tahun 2024.',
      createdAt: new Date('2025-07-24T00:00:00Z'),
    }
  ]

  for (const data of newsData) {
    const news = await prisma.news.upsert({
      where: { slug: data.slug },
      update: { ...data, createdAt: data.createdAt },
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
