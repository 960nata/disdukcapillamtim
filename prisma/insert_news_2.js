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
      title: 'Tingkatkan Keterbukaan Informasi Publik, Disdukcapil Lamtim Gelar "Live" Sapa Netizen dan Sebar Survei Kepuasan',
      slug: 'tingkatkan-keterbukaan-informasi-publik-disdukcapil-lamtim-gelar-live',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>LAMPUNG TIMUR – Sejalan dengan visi Bupati Lampung Timur, Ela Siti Nuryamah, untuk menciptakan tata kelola pemerintahan yang responsif dan dekat dengan masyarakat, Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) melakukan terobosan baru. Mengingat era digital yang semakin pesat, Disdukcapil Lamtim kini hadir menyapa warganya secara langsung melalui fitur Live di platform Instagram.</p><p>Kegiatan bincang santai ini bertujuan untuk memberikan ruang bagi masyarakat agar dapat menggali informasi, bertanya langsung, dan memahami berbagai layanan administrasi kependudukan (Adminduk) dari sumbernya. Diharapkan, interaksi langsung ini bisa memecah kebingungan warga terkait persyaratan dan alur birokrasi kepengurusan dokumen.</p><p>Selain membuka ruang komunikasi dua arah, Disdukcapil Lamtim juga gencar menyebarkan Survei Kepuasan Masyarakat. Pemerintah Daerah menegaskan bahwa suara dan kritik dari masyarakat sangat berarti sebagai bahan evaluasi. Langkah ini menjadi bukti konkret komitmen Pemkab Lampung Timur di bawah arahan Bupati Ela Siti Nuryamah untuk terus membenahi diri dan memberikan kualitas pelayanan publik yang paripurna bagi seluruh warga.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Kegiatan',
      seoTitle: 'Live Instagram dan Survei Kepuasan Disdukcapil Lamtim',
      seoDesc: 'Disdukcapil Lampung Timur gelar live Instagram sapa netizen dan sebar survei kepuasan masyarakat.',
    },
    {
      title: 'Momentum Hardiknas 2026: Bupati Ela Siti Nuryamah dan Disdukcapil Lamtim Tegaskan Pentingnya Identitas Pelajar',
      slug: 'momentum-hardiknas-2026-bupati-ela-siti-nuryamah-dan-disdukcapil-lamtim',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>LAMPUNG TIMUR – Memperingati Hari Pendidikan Nasional (Hardiknas) tahun 2026, Pemerintah Kabupaten Lampung Timur terus mendorong upaya mencerdaskan kehidupan bangsa dan membangun generasi yang berdaya saing global. Selaras dengan visi tersebut, Disdukcapil Kabupaten Lampung Timur menyoroti pentingnya kelengkapan administrasi kependudukan sebagai hak dasar bagi para pelajar.</p><p>Bupati Lampung Timur, Ela Siti Nuryamah, dalam berbagai kesempatan selalu menekankan bahwa pendidikan adalah hak segala bangsa. Namun, untuk mengakses berbagai fasilitas dan bantuan pendidikan dari negara, pelajar diwajibkan memiliki dokumen kependudukan yang sah, seperti Kartu Identitas Anak (KIA) atau Kartu Tanda Penduduk Elektronik (KTP-el) bagi yang telah menginjak usia 17 tahun.</p><p>Melalui semangat Hardiknas, Disdukcapil Lamtim mengajak seluruh orang tua and institusi pendidikan untuk memastikan kelengkapan dokumen siswa. Dengan data kependudukan yang valid dan terintegrasi, pemerintah daerah dapat lebih mudah merumuskan kebijakan pendidikan yang tepat sasaran demi mewujudkan masa depan generasi muda Lampung Timur yang gemilang.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Edukasi',
      seoTitle: 'Momentum Hardiknas 2026 Disdukcapil Lamtim',
      seoDesc: 'Bupati Ela Siti Nuryamah dan Disdukcapil Lamtim tegaskan pentingnya identitas pelajar di Hardiknas 2026.',
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
