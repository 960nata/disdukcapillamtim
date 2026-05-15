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
      title: 'Ratusan Pasangan Kini Sah Secara Negara, Disdukcapil Lamtim Sukses Gelar Sidang Itsbat Nikah Terpadu Akhir 2025',
      slug: 'ratusan-pasangan-kini-sah-secara-negara-disdukcapil-lamtim-sukses',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>LAMPUNG TIMUR – Menutup penghujung tahun 2025 dengan catatan manis, Pemerintah Kabupaten Lampung Timur kembali membuktikan komitmennya dalam memberikan kepastian hukum bagi warga. Pada Selasa, 16 Desember 2025, Disdukcapil Lamtim berkolaborasi dengan instansi terkait sukses menyelenggarakan pelayanan Sidang Itsbat Nikah Terpadu Gelombang II Tahap III.</p><p>Kegiatan yang dipusatkan di GOR Islamic Center Sukadana ini diikuti oleh 138 pasangan suami istri yang sebelumnya hanya menikah secara agama (siri) dan belum tercatat di negara. Melalui program ini, mereka kini resmi memiliki buku nikah sekaligus dokumen administrasi kependudukan yang baru, seperti Kartu Keluarga (KK) dan Akta Kelahiran anak dengan status yang sah.</p><p>Kepala Dinas Kependudukan dan Pencatatan Sipil (Kadis Dukcapil) Kabupaten Lampung Timur, Indragandi, S.IP., menjelaskan bahwa program ini sangat krusial. "Status perkawinan yang sah dan tercatat oleh negara adalah hak setiap warga. Kami hadir memfasilitasi hal tersebut agar kedepannya masyarakat tidak kesulitan saat mengurus berbagai keperluan administrasi, mulai dari sekolah anak hingga urusan perbankan," ujarnya.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Pelayanan',
      seoTitle: 'Sidang Itsbat Nikah Terpadu Disdukcapil Lamtim',
      seoDesc: 'Disdukcapil Lampung Timur sukses gelar sidang itsbat nikah terpadu untuk ratusan pasangan.',
    },
    {
      title: 'Sasar Santri dan Pelajar, Kadis Dukcapil Lamtim Gencarkan Layanan "Jemput Bola" ke Sekolah dan Pesantren',
      slug: 'sasar-santri-dan-pelajar-kadis-dukcapil-lamtim-gencarkan-layanan',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>LAMPUNG TIMUR – Upaya percepatan kepemilikan Kartu Tanda Penduduk Elektronik (KTP-el) bagi pemilih pemula terus dikebut oleh Disdukcapil Kabupaten Lampung Timur pada awal tahun 2026. Alih-alih menunggu warga datang ke kantor kecamatan, Disdukcapil proaktif mendatangi institusi pendidikan melalui layanan "Jemput Bola".</p><p>Tercatat pada Selasa, 10 Maret 2026, tim pelayanan Disdukcapil turun langsung ke Pondok Pesantren Darussalamah untuk melayani perekaman dokumen kependudukan santri dan keluarga besar pondok. Tidak hanya itu, tim juga menyasar siswa-siswi di tingkat sekolah menengah, salah satunya menyerahkan langsung KTP-el kepada 20 siswa di SMK Praja Utama.</p><p>Kepala Dinas Disdukcapil Lampung Timur, Indragandi, S.IP., menegaskan bahwa jemput bola ini adalah bentuk pelayanan prima. "Banyak anak-anak kita, baik santri maupun pelajar, yang waktunya habis untuk belajar dari pagi hingga sore. Tentu akan sulit bagi mereka untuk menyempatkan datang ke kantor pelayanan. Oleh karena itu, kamilah yang datang menjemput bola, memastikan mereka yang sudah berusia 17 tahun segera mengantongi identitas resminya," terang Indragandi.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Pelayanan',
      seoTitle: 'Layanan Jemput Bola Disdukcapil Lamtim ke Sekolah',
      seoDesc: 'Kadis Dukcapil Lamtim gencarkan layanan jemput bola KTP-el ke sekolah dan pesantren.',
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
