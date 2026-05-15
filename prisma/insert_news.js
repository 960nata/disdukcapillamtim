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
      title: 'Disdukcapil Lampung Timur Gencarkan Layanan "Jemput Bola" KTP-el untuk Warga Berkebutuhan Khusus',
      slug: 'disdukcapil-lamtim-gencarkan-layanan-jemput-bola-ktp-el',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>LAMPUNG TIMUR – Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kabupaten Lampung Timur terus menunjukkan komitmennya dalam memberikan pelayanan publik yang inklusif. Melalui program layanan "Jemput Bola", petugas Disdukcapil turun langsung ke lapangan untuk melakukan perekaman sekaligus pencetakan Kartu Tanda Penduduk Elektronik (KTP-el) bagi warga berkebutuhan khusus.</p><p>Program ini menyasar warga yang memiliki keterbatasan fisik, penyandang disabilitas, lanjut usia (lansia), maupun mereka yang memiliki kondisi kesehatan tertentu sehingga tidak memungkinkan untuk datang langsung ke kantor layanan. Langkah ini diambil guna memastikan bahwa proses administrasi kependudukan tetap dapat diakses oleh seluruh lapisan masyarakat tanpa kendala.</p><p>Pihak Disdukcapil Lamtim menegaskan bahwa kegiatan ini bertujuan untuk menjamin terpenuhinya hak identitas bagi setiap warga negara. Identitas yang valid sangat krusial sebagai syarat utama untuk mengakses berbagai layanan publik esensial lainnya, seperti layanan kesehatan, penerimaan bantuan sosial dari pemerintah, hingga keperluan administrasi lainnya.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Pelayanan',
      seoTitle: 'Layanan Jemput Bola KTP-el Disdukcapil Lamtim',
      seoDesc: 'Disdukcapil Lampung Timur gencarkan layanan jemput bola KTP-el untuk warga berkebutuhan khusus.',
    },
    {
      title: 'Komitmen Pelayanan Maksimal: Disdukcapil Lamtim Tetap Buka di Hari Libur Nasional Mei 2026',
      slug: 'komitmen-pelayanan-maksimal-disdukcapil-lamtim-tetap-buka-di-hari-libur',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>LAMPUNG TIMUR – Kabar gembira bagi masyarakat Lampung Timur yang memiliki kesibukan padat di hari kerja. Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kabupaten Lampung Timur memastikan bahwa pelayanan administrasi kependudukan tetap beroperasi meskipun pada hari Libur Nasional dan Cuti Bersama yang jatuh pada tanggal 14 dan 15 Mei 2026.</p><p>Kebijakan ini merujuk pada Surat Edaran Direktorat Jenderal Kependudukan dan Pencatatan Sipil (Dirjen Dukcapil) yang menginstruksikan agar pelayanan kepada masyarakat tidak terputus. Adapun jenis layanan administrasi yang tetap dilayani pada hari libur tersebut meliputi:</p><ul><li>Perekaman dan pencetakan KTP-el.</li><li>Pelayanan pembuatan atau perubahan Kartu Keluarga (KK).</li><li>Penerbitan Akta Kelahiran.</li><li>Penerbitan Akta Kematian.</li><li>Layanan administrasi kependudukan lainnya.</li></ul><p>Melalui akun Instagram resminya, Disdukcapil Lamtim menyampaikan bahwa petugas siap memberikan pelayanan secara ramah dan maksimal. Bagi masyarakat yang ingin mengurus dokumen, loket pelayanan mulai dibuka pada pukul 10.00 WIB hingga selesai.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Pelayanan',
      seoTitle: 'Disdukcapil Lamtim Tetap Buka di Hari Libur Mei 2026',
      seoDesc: 'Disdukcapil Lampung Timur tetap buka melayani masyarakat di hari libur nasional 14-15 Mei 2026.',
    },
    {
      title: 'Kolaborasi Sosial, Disdukcapil Lamtim Gelar Perekaman KTP-el di Puncak Harlah Fatayat NU dan RSUD',
      slug: 'kolaborasi-sosial-disdukcapil-lamtim-gelar-perekaman-ktp-el',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>LAMPUNG TIMUR – Dalam upaya mempercepat cakupan kepemilikan dokumen kependudukan, Disdukcapil Kabupaten Lampung Timur secara aktif menggandeng berbagai instansi and organisasi masyarakat. Pada tanggal 28 April 2026, Disdukcapil Lamtim hadir memberikan layanan pencetakan KTP-el secara langsung di Gedung PCNU Lampung Timur. Kegiatan ini bertepatan dengan acara Hari Lahir (Harlah) Fatayat NU, sebagai bentuk kolaborasi nyata antara pemerintah dan organisasi keagamaan dalam mendekatkan layanan ke masyarakat.</p><p>Tak hanya berhenti pada acara organisasi masyarakat, inovasi pelayanan ini juga merambah ke fasilitas kesehatan. Disdukcapil Lamtim dijadwalkan melakukan perekaman KTP-el bagi kelompok masyarakat rentan, khususnya pasien yang sedang dirawat di RSUD KH. Ahmad Hanafiah Sukadana pada Kamis, 30 Mei 2026.</p><p>Fokus perekaman ini ditujukan agar para pasien, terutama yang sudah memasuki usia wajib KTP (17 tahun ke atas), dapat segera memiliki identitas resmi. KTP-el tersebut nantinya akan sangat dibutuhkan oleh pihak keluarga maupun pasien sebagai syarat administrasi dasar untuk membuka akses layanan publik, termasuk klaim jaminan kesehatan selama masa perawatan medis.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Kegiatan',
      seoTitle: 'Kolaborasi Disdukcapil Lamtim di Harlah Fatayat NU dan RSUD',
      seoDesc: 'Disdukcapil Lampung Timur gelar perekaman KTP-el di acara Fatayat NU dan RSUD Sukadana.',
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
