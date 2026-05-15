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
      title: 'Era Baru Pelayanan Publik: Disdukcapil Lamtim Resmi Pindah ke Mall Pelayanan Publik (MPP) Sukadana',
      slug: 'era-baru-pelayanan-publik-disdukcapil-lamtim-resmi-pindah',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>SUKADANA – Sebuah langkah besar diambil oleh Pemerintah Kabupaten Lampung Timur dalam meningkatkan kualitas pelayanan kepada masyarakat. Mulai Senin, 6 Oktober 2025, seluruh pusat pelayanan Administrasi Kependudukan (Adminduk) and Pencatatan Sipil yang sebelumnya berada di kantor lama, resmi dialihkan ke Gedung Mall Pelayanan Publik (MPP) yang berlokasi di area Islamic Center Sukadana.</p><h2>Transformasi Pelayanan Terpadu Satu Pintu</h2><p>Transformasi ini merupakan bagian dari visi Bupati Lampung Timur, Ela Siti Nuryamah, untuk menghadirkan layanan yang lebih nyaman, modern, and terpadu dalam satu pintu. Dengan bergabungnya Disdukcapil ke dalam MPP, masyarakat kini bisa mengurus dokumen kependudukan sekaligus mengakses layanan dari instansi pemerintah lainnya di satu lokasi yang sama.</p><h3>Pelayanan Prima di Rumah Baru</h3><p>Kepala Dinas Dukcapil Lampung Timur, Indragandi, S.IP., saat meninjau hari pertama operasional di MPP, menyatakan antusiasmenya. "Kami mengundang seluruh warga Lampung Timur untuk memanfaatkan fasilitas baru ini. Gedungnya lebih representatif, adem, and pastinya petugas kami siap memberikan pelayanan prima dengan semangat baru di rumah baru ini," ungkap Indragandi.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Pelayanan',
      seoTitle: 'Disdukcapil Lamtim Pindah ke MPP Sukadana',
      seoDesc: 'Disdukcapil Lampung Timur resmi pindah ke Mall Pelayanan Publik (MPP) Sukadana.',
      createdAt: new Date('2025-10-06T00:00:00Z'),
    },
    {
      title: 'Wujudkan Kepastian Hukum, 192 Pasangan di Bandar Sribhawono Ikuti Sidang Isbat Nikah Terpadu',
      slug: 'wujudkan-kepastian-hukum-192-pasangan-di-bandar-sribhawono',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>BANDAR SRIBHAWONO – Kabar bahagia datang dari wilayah timur Lampung Timur. Sebanyak 192 pasangan suami istri di Kecamatan Bandar Sribhawono kini resmi memiliki status perkawinan yang diakui secara hukum negara setelah mengikuti Sidang Isbat Nikah Terpadu yang digelar pada Senin, 21 Juli 2025.</p><h2>Kolaborasi untuk Hak Sipil Warga</h2><p>Kegiatan yang berlangsung di Balai Desa Sribhawono ini merupakan hasil kolaborasi apik antara Disdukcapil Lamtim, Pengadilan Agama, and Kementerian Agama. Program ini menjadi jawaban bagi warga yang selama ini sudah menikah secara agama namun belum tercatat secara administrasi, sehingga seringkali kesulitan saat mengurus akta kelahiran anak maupun dokumen lainnya.</p><h3>Perlindungan Negara terhadap Hak Sipil</h3><p>Bupati Lampung Timur, Ela Siti Nuryamah, menegaskan bahwa program ini adalah bentuk perlindungan negara terhadap hak-hak sipil warga, terutama bagi kaum perempuan and anak. Sementara itu, Kadis Dukcapil Indragandi, S.IP., menambahkan bahwa setelah sidang selesai, pasangan tersebut langsung mendapatkan dokumen kependudukan terbaru. "Target kami adalah semua warga Lamtim memiliki dokumen yang valid. Setelah itsbat, kami langsung terbitkan KK and KTP dengan status kawin tercatat," jelasnya.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Pelayanan',
      seoTitle: 'Sidang Isbat Nikah 192 Pasangan di Bandar Sribhawono',
      seoDesc: '192 pasangan di Bandar Sribhawono ikuti sidang isbat nikah terpadu Disdukcapil Lamtim.',
      createdAt: new Date('2025-07-21T00:00:00Z'),
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
