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
      title: 'Kado Kemerdekaan Spesial: Disdukcapil Lamtim Terbitkan Akta Perkawinan Gratis di Mataram Baru',
      slug: 'kado-kemerdekaan-spesial-disdukcapil-lamtim-terbitkan-akta',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>MATARAM BARU, LAMPUNG TIMUR – Dalam rangka menyemarakkan HUT Republik Indonesia ke-80, Dinas Kependudukan and Pencatatan Sipil (Disdukcapil) Kabupaten Lampung Timur memberikan kejutan manis bagi masyarakat non-muslim. Pada Jumat, 15 Agustus 2025, bertempat di Vihara Brahma Vira, Desa Mataram Baru, tim Disdukcapil menyerahkan langsung dokumen Akta Perkawinan sebagai "Kado Kemerdekaan" bagi pasangan yang baru saja meresmikan pernikahan mereka secara religi.</p><h2>Instruksi Khusus Bupati untuk Hak Sipil</h2><p>Program pemberian Akta Perkawinan secara langsung ini merupakan instruksi khusus dari Bupati Lampung Timur, Ela Siti Nuryamah. Menurut beliau, kemerdekaan sejati adalah ketika masyarakat mendapatkan kemudahan akses terhadap hak-hak sipilnya, termasuk pengakuan legal atas ikatan pernikahan. Dengan adanya Akta Perkawinan yang sah, hak-hak keluarga and anak-anak di masa depan akan lebih terjamin oleh negara.</p><h3>Menghapus Stigma Birokrasi Sulit</h3><p>Kepala Dinas Dukcapil Lampung Timur, Indragandi, S.IP., menjelaskan bahwa layanan ini bertujuan untuk menghapus stigma birokrasi yang sulit. "Kami ingin masyarakat merasa bahwa mengurus dokumen itu cepat and membahagiakan. Di hari kemerdekaan ini, kami berikan kado berupa kepastian hukum bagi pasangan pengantin. Harapannya, kualitas pelayanan publik di Lampung Timur semakin meningkat and menjadi contoh bagi daerah lain," tegas Indragandi di sela-sela penyerahan dokumen.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Pelayanan',
      seoTitle: 'Akta Perkawinan Gratis Disdukcapil Lamtim',
      seoDesc: 'Disdukcapil Lampung Timur terbitkan Akta Perkawinan gratis di Mataram Baru.',
      createdAt: new Date('2025-08-15T00:00:00Z'),
    },
    {
      title: 'Sentuhan Kasih Program "RAMAH": Disdukcapil Lamtim Sisir Pelayanan ODGJ dan Lansia Door-to-Door',
      slug: 'sentuhan-kasih-program-ramah-disdukcapil-lamtim-sisir',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>SEKAMPUNG, LAMPUNG TIMUR – Komitmen Pemerintah Kabupaten Lampung Timur dalam mewujudkan pelayanan publik yang inklusif kembali dibuktikan melalui program RAMAH (Rekaman Bagi Masyarakat Berkebutuhan Khusus). Sepanjang bulan Agustus 2025, tim teknis Disdukcapil melakukan aksi kemanusiaan dengan mendatangi rumah-rumah warga (door-to-door) di Desa Sumbersari, Kecamatan Sekampung, untuk melakukan perekaman KTP-el bagi kelompok rentan.</p><h2>Sasaran Utama: ODGJ dan Lansia</h2><p>Sasaran utama program ini adalah Orang Dengan Gangguan Jiwa (ODGJ), penyandang disabilitas fisik, serta lansia yang sudah tidak mampu lagi melakukan mobilisasi ke kantor kecamatan atau Mall Pelayanan Publik. Bupati Ela Siti Nuryamah selalu menekankan bahwa negara tidak boleh absen dalam melayani warga yang paling membutuhkan bantuan. Identitas kependudukan bagi kelompok rentan sangatlah vital agar mereka tetap bisa mendapatkan akses bantuan sosial and layanan kesehatan dari pemerintah.</p><h3>Melayani dengan Hati</h3><p>Kadis Dukcapil Lamtim, Indragandi, S.IP., menyampaikan bahwa petugas di lapangan seringkali menghadapi tantangan psikologis saat berhadapan dengan ODGJ, namun hal itu tidak menyurutkan semangat mereka. "Melayani dengan hati adalah kunci. Kami tidak menunggu mereka datang, tapi kamilah yang mendatangi mereka. Ini adalah bentuk nyata pelayanan prima yang dicanangkan Pemerintah Kabupaten Lampung Timur. Setiap sidik jari and retina mata yang berhasil direkam adalah langkah besar untuk melindungi hak sipil mereka sebagai warga negara Indonesia," tuturnya penuh haru.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Pelayanan',
      seoTitle: 'Program RAMAH Disdukcapil Lamtim ODGJ & Lansia',
      seoDesc: 'Disdukcapil Lampung Timur sisir pelayanan ODGJ and lansia door-to-door lewat program RAMAH.',
      createdAt: new Date('2025-08-10T00:00:00Z'),
    },
    {
      title: 'Percepatan KTP-el Pemula: Disdukcapil Lamtim "Sikat" 5 Sekolah di Bandar Sribhawono dalam Sehari',
      slug: 'percepatan-ktp-el-pemula-disdukcapil-lamtim-sikat-5-sekolah',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>BANDAR SRIBHAWONO, LAMPUNG TIMUR – Disdukcapil Kabupaten Lampung Timur terus menunjukkan performa luar biasa dalam mengejar target perekaman KTP-el bagi pemilih pemula. Pada Kamis, 24 Juli 2025, tim "Jemput Bola" melakukan aksi maraton dengan mendatangi lima sekolah menengah sekaligus di wilayah Kecamatan Bandar Sribhawono guna menyerahkan KTP-el yang sudah selesai dicetak.</p><h2>Daftar Sekolah yang Dilayani</h2><p>Adapun kelima sekolah yang mendapatkan layanan istimewa tersebut adalah:</p><ul><li>SMAN 1 Bandar Sribhawono (46 siswa)</li><li>SMK Praja Utama (56 siswa)</li><li>SMK Angkasa (12 siswa)</li><li>MA Sadar Sriwijaya (14 siswa)</li><li>SMK Merah Putih (4 siswa)</li></ul><h3>Apresiasi dari Bupati</h3><p>Bupati Lampung Timur, Ela Siti Nuryamah, sangat mengapresiasi kecepatan tim Disdukcapil dalam melayani generasi muda. Beliau berpesan agar para siswa yang sudah memiliki KTP bisa menggunakan identitasnya secara bijak and bertanggung jawab. Sementara itu, Kadis Dukcapil Indragandi, S.IP., menegaskan bahwa layanan ke sekolah-sekolah akan terus dilakukan secara berkala. "Anak muda adalah masa depan Lampung Timur. Dengan memiliki KTP sejak dini, mereka sudah siap untuk berpartisipasi dalam berbagai aspek kehidupan bernegara. Kami targetkan seluruh siswa yang sudah berusia 17 tahun di Lampung Timur sudah mengantongi KTP-el tanpa harus antre di kantor dinas," jelas Indragandi.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Pelayanan',
      seoTitle: 'Jemput Bola KTP-el 5 Sekolah Disdukcapil Lamtim',
      seoDesc: 'Disdukcapil Lampung Timur layani perekaman KTP-el di 5 sekolah Bandar Sribhawono dalam sehari.',
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
