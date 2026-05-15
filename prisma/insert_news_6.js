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
      title: 'Dekatkan Layanan ke Masyarakat, Disdukcapil Lamtim Optimalkan Posko Adminduk Zona 3 Jelang HUT RI Ke-80',
      slug: 'dekatkan-layanan-ke-masyarakat-disdukcapil-lamtim-optimalkan',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>LAMPUNG TIMUR – Mengurai antrean panjang di pusat kabupaten sekaligus menghemat waktu dan biaya transportasi warga menjadi salah satu fokus utama Pemerintah Kabupaten Lampung Timur. Melalui kebijakan desentralisasi pelayanan, Disdukcapil Lamtim terus memaksimalkan fungsi titik pelayanan di Zona 3 sepanjang bulan kemerdekaan, Agustus 2025.</p><h2>Desentralisasi Pelayanan di Zona 3</h2><p>Bupati Lampung Timur, Ela Siti Nuryamah, menyatakan bahwa pelayanan publik harus bisa dirasakan hingga ke tingkat kecamatan. Sistem zonasi ini memungkinkan warga di wilayah cakupan Zona 3 untuk mengurus berbagai keperluan seperti pencetakan Kartu Tanda Penduduk Elektronik (KTP-el), pembuatan Kartu Keluarga (KK), hingga sinkronisasi data tanpa harus menempuh perjalanan jauh ke ibukota kabupaten di Sukadana.</p><h3>Pengumuman Libur Pelayanan</h3><p>Kepala Disdukcapil Lampung Timur, Indragandi, S.IP., yang meninjau langsung kesiapan petugas di lapangan, mengimbau masyarakat untuk memanfaatkan fasilitas ini. "Petugas kami di Zona 3 siap melayani dengan sepenuh hati. Namun, kami juga mengingatkan kembali bahwa khusus pada Senin, 18 Agustus 2025, seluruh pelayanan di Zona 1 hingga Zona 5 akan ditutup sementara mengikuti jadwal cuti bersama nasional, dan buka kembali pada 19 Agustus," terang Indragandi.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Pelayanan',
      seoTitle: 'Optimalkan Posko Adminduk Zona 3 Disdukcapil Lamtim',
      seoDesc: 'Disdukcapil Lampung Timur optimalkan posko Adminduk Zona 3 jelang HUT RI ke-80.',
    },
    {
      title: 'Jangkau Pelosok Daerah, Layanan Zona 4 dan 5 Jadi Ujung Tombak Pemerataan Adminduk di Lampung Timur',
      slug: 'jangkau-pelosok-daerah-layanan-zona-4-dan-5-jadi-ujung-tombak',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>LAMPUNG TIMUR – Wilayah geografis Kabupaten Lampung Timur yang luas kerap menjadi tantangan tersendiri dalam pemerataan layanan administrasi kependudukan (Adminduk). Untuk mengatasi hal tersebut, Disdukcapil Lamtim menjadikan posko pelayanan Zona 4 and Zona 5 sebagai ujung tombak dalam melayani masyarakat yang berada di wilayah terjauh atau perbatasan kabupaten.</p><h2>Ujung Tombak Pemerataan Adminduk</h2><p>Menjelang peringatan Proklamasi Kemerdekaan RI ke-80 pada Agustus 2025, intensitas pelayanan di kedua zona ini justru semakin ditingkatkan. Petugas tidak hanya menunggu di loket, tetapi juga melakukan penyisiran data bagi warga rentan, lansia, and pemilih pemula yang belum memiliki identitas resmi. Langkah strategis ini merupakan tindak lanjut dari arahan Bupati Ela Siti Nuryamah agar tidak ada satu pun warga Lampung Timur yang hak identitasnya terabaikan.</p><h3>Antusiasme Warga di Pelosok</h3><p>"Masyarakat di wilayah Zona 4 and Zona 5 memiliki antusiasme yang luar biasa. Dengan mendekatkan alat perekaman and pencetakan ke wilayah mereka, kami melihat lonjakan kepengurusan dokumen yang signifikan," ungkap Kadis Dukcapil, Indragandi, S.IP. Ia juga kembali mensosialisasikan pengumuman libur pelayanan pada 18 Agustus 2025 agar warga di pelosok tidak terlanjur datang ke lokasi pelayanan pada hari libur tersebut.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Pelayanan',
      seoTitle: 'Layanan Zona 4 & 5 Ujung Tombak Disdukcapil Lamtim',
      seoDesc: 'Layanan Zona 4 and 5 jadi ujung tombak pemerataan Adminduk di pelosok Lampung Timur.',
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
