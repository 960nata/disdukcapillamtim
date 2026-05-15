const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const updates = [
    { slug: 'disdukcapil-lamtim-gencarkan-layanan-jemput-bola-ktp-el', date: '2026-05-01T00:00:00Z' },
    { slug: 'komitmen-pelayanan-maksimal-disdukcapil-lamtim-tetap-buka-di-hari-libur', date: '2026-05-13T00:00:00Z' },
    { slug: 'kolaborasi-sosial-disdukcapil-lamtim-gelar-perekaman-ktp-el', date: '2026-04-28T00:00:00Z' },
    { slug: 'tingkatkan-keterbukaan-informasi-publik-disdukcapil-lamtim-gelar-live', date: '2026-05-10T00:00:00Z' },
    { slug: 'momentum-hardiknas-2026-bupati-ela-siti-nuryamah-dan-disdukcapil-lamtim', date: '2026-05-02T00:00:00Z' },
    { slug: 'ratusan-pasangan-kini-sah-secara-negara-disdukcapil-lamtim-sukses', date: '2025-12-16T00:00:00Z' },
    { slug: 'sasar-santri-dan-pelajar-kadis-dukcapil-lamtim-gencarkan-layanan', date: '2026-03-10T00:00:00Z' },
    { slug: 'semarak-hut-desa-disdukcapil-lamtim-hadirkan-pelayanan-adminduk', date: '2025-12-11T00:00:00Z' },
    { slug: 'respon-cepat-tim-jemput-bola-disdukcapil-lamtim-lakukan-perekaman', date: '2025-12-08T00:00:00Z' },
    { slug: 'peringati-hut-ri-ke-80-layanan-adminduk-zona-1-dan-mpp-lamtim', date: '2025-08-15T00:00:00Z' },
    { slug: 'semarak-kemerdekaan-di-wilayah-zona-2-disdukcapil-lamtim-antar-kado', date: '2025-08-17T00:00:00Z' },
    { slug: 'dekatkan-layanan-ke-masyarakat-disdukcapil-lamtim-optimalkan', date: '2025-08-10T00:00:00Z' },
    { slug: 'jangkau-pelosok-daerah-layanan-zona-4-dan-5-jadi-ujung-tombak', date: '2025-08-05T00:00:00Z' }
  ]

  for (const update of updates) {
    const news = await prisma.news.updateMany({
      where: { slug: update.slug },
      data: { createdAt: new Date(update.date) }
    })
    console.log(`Updated ${news.count} article(s) with slug: ${update.slug}`)
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
