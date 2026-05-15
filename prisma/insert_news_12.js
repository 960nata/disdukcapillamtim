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
      title: 'Inovasi "RAMAH" Disdukcapil Lamtim: Jemput Bola KTP-el untuk Lansia dan Disabilitas di Desa Sumbersari',
      slug: 'inovasi-ramah-disdukcapil-lamtim-jemput-bola-ktp-el',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>SEKAMPUNG, LAMPUNG TIMUR – Dinas Kependudukan and Pencatatan Sipil (Disdukcapil) Kabupaten Lampung Timur tak henti-hentinya melahirkan inovasi untuk mempermudah masyarakat. Pada bulan Agustus 2025, Disdukcapil Lamtim secara masif menjalankan program unggulan bernama RAMAH (Rekaman Bagi Masyarakat Berkebutuhan Khusus). Kali ini, pelaksanaannya difokuskan di Desa Sumbersari, Kecamatan Sekampung.</p><h2>Fokus Kelompok Rentan di Desa Sumbersari</h2><p>Fokus utama dari layanan RAMAH di Desa Sumbersari ini adalah untuk memastikan kelompok rentan, seperti Lanjut Usia (Lansia) and penyandang disabilitas, tetap mendapatkan hak akses identitas kependudukan. Mengingat keterbatasan fisik yang mereka miliki, tim petugas dari Disdukcapil tidak menunggu di kantor kecamatan, melainkan turun langsung ke pelosok desa.</p><h3>Bentuk Nyata Kehadiran Negara</h3><p>Kepala Disdukcapil Lampung Timur, Indragandi, S.IP., menyampaikan bahwa program ini adalah bentuk nyata kehadiran negara. "Banyak lansia and saudara kita yang disabilitas kesulitan jika harus datang ke kantor pelayanan. Lewat program RAMAH, kami membawa alat perekaman secara mobile and langsung mencetakkan KTP-el mereka agar segera bisa digunakan," jelas Indragandi.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Pelayanan',
      seoTitle: 'Inovasi RAMAH Disdukcapil Lamtim di Sumbersari',
      seoDesc: 'Disdukcapil Lampung Timur jalankan program RAMAH jemput bola KTP-el di Desa Sumbersari.',
      createdAt: new Date('2025-08-12T00:00:00Z'),
    },
    {
      title: 'Pelayanan Sepenuh Hati, Tim Disdukcapil Lamtim Rela "Door-to-Door" Rekam KTP Warga Sakit',
      slug: 'pelayanan-sepenuh-hati-tim-disdukcapil-lamtim-rela-door-to-door',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>LAMPUNG TIMUR – Memiliki identitas resmi seperti Kartu Tanda Penduduk Elektronik (KTP-el) adalah syarat mutlak untuk mengakses layanan kesehatan, terutama bagi warga yang sedang sakit and membutuhkan perawatan intensif atau rujukan BPJS. Menyadari urgensi tersebut, Disdukcapil Kabupaten Lampung Timur menggelar aksi door-to-door mendatangi rumah warga yang tengah terbaring sakit di Kecamatan Sekampung pada Agustus 2025.</p><h2>Aksi Door-to-Door untuk Kemanusiaan</h2><p>Bupati Lampung Timur, Ela Siti Nuryamah, menginstruksikan agar birokrasi tidak boleh kaku, terlebih jika menyangkut urusan kemanusiaan darurat. Menindaklanjuti arahan tersebut, petugas Disdukcapil Lamtim rela masuk ke gang-gang kecil di Desa Sumbersari demi melakukan perekaman sidik jari and iris mata bagi warga yang tidak mampu lagi beranjak dari tempat tidurnya.</p><h3>Melayani dengan Empati</h3><p>"Kami sering menemui kasus di mana warga sakit sangat butuh KTP untuk klaim asuransi kesehatan atau bantuan sosial. Aksi door-to-door ini adalah komitmen kami di Disdukcapil untuk melayani dengan empati, bukan sekadar menggugurkan kewajiban. Alhamdulillah, KTP-el mereka langsung tercetak and diserahkan ke pihak keluarga," tutur salah satu petugas lapangan Disdukcapil Lampung Timur.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Pelayanan',
      seoTitle: 'Layanan Door-to-Door Disdukcapil Lamtim Warga Sakit',
      seoDesc: 'Tim Disdukcapil Lampung Timur rela door-to-door rekam KTP-el untuk warga sakit.',
      createdAt: new Date('2025-08-11T00:00:00Z'),
    },
    {
      title: 'Semarak Agustus 2025, Pemkab Lamtim Pastikan Hak Sipil Kelompok Rentan Terpenuhi Lewat Layanan RAMAH',
      slug: 'semarak-agustus-2025-pemkab-lamtim-pastikan-hak-sipil',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>SEKAMPUNG, LAMPUNG TIMUR – Bulan Agustus identik dengan semangat kemerdekaan and pemerataan keadilan bagi seluruh rakyat Indonesia. Di Kabupaten Lampung Timur, semangat ini diterjemahkan lewat pemenuhan hak-hak sipil dasar masyarakatnya. Sepanjang bulan Agustus 2025, program pelayanan jemput bola bertajuk RAMAH (Rekaman Bagi Masyarakat Berkebutuhan Khusus) sukses direalisasikan di wilayah Kecamatan Sekampung.</p><h2>Pemetaan Akurat Kelompok Rentan</h2><p>Sinergi yang kuat antara Pemerintah Daerah and aparatur desa di Sumbersari membuat pemetaan data kelompok rentan berjalan sangat akurat. Hal ini memudahkan tim Disdukcapil Lampung Timur untuk langsung menyasar rumah-rumah yang dihuni oleh warga lanjut usia, penyandang disabilitas, hingga mereka yang mengidap penyakit kronis.</p><h3>Keadilan Sosial untuk Semua</h3><p>Bupati Ela Siti Nuryamah selalu menekankan bahwa keadilan sosial harus bisa dirasakan oleh mereka yang paling tak bersuara. Dengan diterbitkannya KTP-el bagi kelompok rentan di Desa Sumbersari ini, mereka kini memiliki "kunci" yang sah di mata negara untuk membuka berbagai pintu bantuan pemerintah yang berhak mereka terima.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Pelayanan',
      seoTitle: 'Hak Sipil Kelompok Rentan Disdukcapil Lamtim',
      seoDesc: 'Pemkab Lampung Timur pastikan hak sipil kelompok rentan terpenuhi lewat layanan RAMAH.',
      createdAt: new Date('2025-08-13T00:00:00Z'),
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
