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
      title: 'Waspada Modus Penipuan Aktivasi IKD, Disdukcapil Lamtim Tegaskan Layanan Hanya Ada di Kantor Resmi',
      slug: 'waspada-modus-penipuan-aktivasi-ikd-disdukcapil-lamtim',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>LAMPUNG TIMUR – Seiring dengan gencarnya digitalisasi layanan administrasi kependudukan, muncul pihak-pihak tidak bertanggung jawab yang memanfaatkan ketidaktahuan masyarakat. Baru-baru ini, marak beredar pesan berantai di aplikasi WhatsApp yang mengatasnamakan petugas Dinas Kependudukan and Pencatatan Sipil (Disdukcapil) menawarkan bantuan aktivasi Identitas Kependudukan Digital (IKD) secara online melalui sebuah tautan (link) mencurigakan.</p><h2>Imbauan Keras Bupati Hindari Phishing</h2><p>Menanggapi hal tersebut, Pemerintah Kabupaten Lampung Timur bergerak cepat memberikan imbauan keras. Bupati Lampung Timur, Ela Siti Nuryamah, meminta seluruh jajarannya untuk segera menyosialisasikan tata cara aktivasi IKD yang benar and aman kepada warga agar terhindar dari pencurian data pribadi (phishing).</p><h3>Klarifikasi Resmi Kadis Dukcapil</h3><p>Kepala Disdukcapil Lampung Timur, Indragandi, S.IP., memberikan klarifikasi resmi bahwa aktivasi IKD tidak pernah dilakukan melalui tautan yang dikirim via WhatsApp. "Kami tegaskan bahwa pembuatan and aktivasi IKD hanya bisa dilakukan secara tatap muka di Kantor Disdukcapil atau Kantor Kecamatan se-Kabupaten Lampung Timur. Proses ini memerlukan pemindaian QR Code khusus oleh Admin IKD resmi kami serta verifikasi pengenalan wajah (face recognition). Jangan pernah memberikan PIN atau data pribadi kepada siapapun di media sosial," imbau Indragandi.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Edukasi',
      seoTitle: 'Waspada Penipuan Aktivasi IKD Disdukcapil Lamtim',
      seoDesc: 'Disdukcapil Lampung Timur imbau warga waspada penipuan aktivasi IKD via WhatsApp.',
      createdAt: new Date('2026-05-15T00:00:00Z'),
    },
    {
      title: 'Dukung Partisipasi Pemilih Pemula, Disdukcapil Lamtim Gencarkan Rekam Cetak KTP-el Keliling ke Sekolah-Sekolah',
      slug: 'dukung-partisipasi-pemilih-pemula-disdukcapil-lamtim-gencarkan',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>LAMPUNG TIMUR – Dalam rangka menyongsong pesta demokrasi and pemenuhan hak identitas generasi muda, Disdukcapil Kabupaten Lampung Timur meluncurkan operasi besar-besaran bertajuk "Jemput Bola Pemilih Pemula". Sepanjang akhir tahun 2024 hingga awal 2025, tim pelayanan keliling Disdukcapil tercatat telah menyapu bersih perekaman and pembagian KTP Elektronik (KTP-el) di puluhan Sekolah Menengah Atas (SMA) and Kejuruan (SMK) di berbagai kecamatan.</p><h2>Sasaran Sekolah Program Prioritas</h2><p>Beberapa sekolah yang menjadi sasaran program prioritas ini antara lain SMAN 1 Way Bungur, SMA N 1 Way Jepara, SMK N 1 Raman Utara, SMAN 1 Waway Karya, hingga SMA Muhammadiyah 1 Gunung Pelindung. Para siswa yang telah genap berusia 17 tahun atau menjelang 17 tahun langsung dilakukan perekaman biometrik di ruang kelas tanpa perlu membolos sekolah.</p><h3>Inovasi Gham Cakak Perwatin</h3><p>Bupati Lampung Timur, Ela Siti Nuryamah, sangat mengapresiasi inovasi jemput bola ini karena sangat membantu para pelajar menghemat waktu belajar mereka. Senada dengan hal tersebut, Kadis Dukcapil Indragandi, S.IP., menyebutkan bahwa langkah ini adalah investasi jangka panjang. "Melalui program Gham Cakak Perwatin (Gerak & Usaha Meningkatkan Cakupan Angka Perekaman Melalui Perekaman Siswa Secara Rutin), kami memastikan tidak ada pemilih pemula di Lampung Timur yang kehilangan hak suaranya atau kesulitan mengakses beasiswa kuliah hanya karena belum punya KTP," tegasnya.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Pelayanan',
      seoTitle: 'Jemput Bola KTP-el Pemilih Pemula Disdukcapil Lamtim',
      seoDesc: 'Disdukcapil Lampung Timur gencarkan rekam cetak KTP-el keliling ke sekolah untuk pemilih pemula.',
      createdAt: new Date('2025-01-15T00:00:00Z'),
    },
    {
      title: 'Sinergi Membangun Desa, Disdukcapil Lamtim Gelar Pelayanan Adminduk di Lokasi TMMD Way Jepara',
      slug: 'sinergi-membangun-desa-disdukcapil-lamtim-gelar-pelayanan',
      content: JSON.stringify([
        {
          type: 'text',
          content: '<p>WAY JEPARA, LAMPUNG TIMUR – Pembangunan desa tidak hanya berfokus pada infrastruktur fisik seperti jalan and jembatan, tetapi juga pada tertib administrasi kependudukan masyarakatnya. Semangat inilah yang dibawa oleh Disdukcapil Kabupaten Lampung Timur saat terjun langsung ke lokasi program TNI Manunggal Membangun Desa (TMMD) di Desa Sumber Marga, Kecamatan Way Jepara.</p><h2>Kolaborasi Pemerintah Daerah dan TNI</h2><p>Kegiatan kolaborasi yang melibatkan unsur Pemerintah Daerah and prajurit TNI Angkatan Darat (Kodim 0429/Lampung Timur) ini mendapat sambutan luar biasa dari warga setempat. Sembari para prajurit bergotong-royong membangun fasilitas desa, tim pelayanan Disdukcapil Lamtim membuka posko khusus untuk melayani rekam cetak KTP-el, pembuatan Kartu Keluarga (KK), and penerbitan Akta Kelahiran secara gratis and langsung jadi di tempat.</p><h3>Kehadiran Negara Secara Utuh</h3><p>Sinergitas ini selaras dengan arahan Bupati Ela Siti Nuryamah yang mendorong keterlibatan seluruh instansi dalam menyukseskan program-program pemberdayaan masyarakat. Kepala Disdukcapil, Indragandi, S.IP., yang turut mengawal kegiatan tersebut, menyampaikan rasa bangganya. "Ini adalah bentuk kehadiran negara secara utuh di tengah rakyat. Lewat TMMD, desa menjadi maju secara fisik, and lewat layanan jemput bola kami, warga desa menjadi maju and tertib secara hukum administrasi," tutup Indragandi.</p>'
        }
      ]),
      status: 'Published',
      authorId: user.id,
      category: 'Pelayanan',
      seoTitle: 'Pelayanan Adminduk Disdukcapil Lamtim di Lokasi TMMD',
      seoDesc: 'Disdukcapil Lampung Timur gelar pelayanan Adminduk di lokasi TMMD Way Jepara.',
      createdAt: new Date('2025-02-10T00:00:00Z'),
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
