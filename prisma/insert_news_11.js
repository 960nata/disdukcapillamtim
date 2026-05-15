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
      title: 'Wujud Transparansi Pelayanan Publik, Disdukcapil Lamtim Rilis Hasil Survei Kepuasan Masyarakat (SKM) Semester 1 2025',
      slug: 'wujud-transparansi-pelayanan-publik-disdukcapil-lamtim-rilis',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>LAMPUNG TIMUR – Dalam upaya mewujudkan tata kelola pemerintahan yang baik (Good Governance) and transparan, Dinas Kependudukan and Pencatatan Sipil (Disdukcapil) Kabupaten Lampung Timur secara resmi merilis hasil Survei Kepuasan Masyarakat (SKM) untuk periode Semester 1 Tahun 2025. Laporan ini dipublikasikan secara terbuka agar seluruh lapisan masyarakat dapat melihat langsung indikator kualitas pelayanan yang telah diberikan.</p><h2>Evaluasi Kinerja Berbasis Suara Rakyat</h2><p>Pelaksanaan SKM ini merupakan amanat undang-undang sekaligus komitmen nyata dari Bupati Lampung Timur, Ela Siti Nuryamah, yang senantiasa menekankan pentingnya evaluasi kinerja berbasis suara rakyat. Melalui survei ini, instansi dapat mengukur seberapa efektif program-program unggulan seperti layanan jemput bola, aktivasi Identitas Kependudukan Digital (IKD), and sistem zonasi pelayanan dalam mempermudah urusan administrasi warga.</p><h3>Cerminan dan Bahan Evaluasi Krusial</h3><p>Kepala Disdukcapil Lampung Timur, Indragandi, S.IP., menyampaikan rasa terima kasihnya kepada masyarakat yang telah berpartisipasi memberikan penilaian and masukan yang objektif. "Hasil SKM Semester 1 tahun 2025 ini menjadi cerminan sekaligus bahan evaluasi krusial bagi kami. Angka kepuasan yang tinggi akan terus kami pertahankan and tingkatkan, sementara kritik atau saran dari warga akan langsung kami tindak lanjuti demi menciptakan pelayanan Adminduk yang makin cepat, tepat, and membahagiakan," tegas Indragandi.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Pelayanan',
      seoTitle: 'Rilis Hasil SKM Semester 1 2025 Disdukcapil Lamtim',
      seoDesc: 'Disdukcapil Lampung Timur rilis hasil Survei Kepuasan Masyarakat (SKM) Semester 1 2025.',
      createdAt: new Date('2025-07-01T00:00:00Z'),
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
