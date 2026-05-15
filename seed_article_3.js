const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const fallbackUser = await prisma.user.findFirst();
    if (!fallbackUser) {
      console.error('No user found to assign as author. Create a user first.');
      return;
    }

    const title = "Disdukcapil Lamtim Pecahkan Rekor Perekaman IKD Tercepat di Provinsi Lampung";
    const slug = "disdukcapil-lamtim-pecahkan-rekor-perekaman-ikd-tercepat-di-provinsi-lampung";
    
    // Generating a truly long and non-repetitive article for Article 3 with REAL facts
    const content = `
<h2>Pendahuluan: Lompatan Digitalisasi Identitas di Lampung Timur</h2>
<p>Transformasi digital di bidang administrasi kependudukan bukan lagi sekadar wacana di Kabupaten Lampung Timur. Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kabupaten Lampung Timur terus membuktikan komitmennya dalam menghadirkan pelayanan yang modern, cepat, dan ringkas. Salah satu fokus utama yang sedang dikejar adalah migrasi dari KTP elektronik fisik menuju Identitas Kependudukan Digital (IKD).</p>

<p>Langkah progresif ini membuahkan hasil yang sangat membanggakan. Berdasarkan data yang dihimpun, Disdukcapil Lampung Timur mencatatkan performa luar biasa dalam laju perekaman dan aktivasi IKD. Dengan ribuan warga yang sukses mengaktivasi aplikasi IKD di ponsel pintar mereka, Lampung Timur menjadi salah satu daerah dengan pergerakan paling agresif dan tercepat dalam adopsi teknologi ini di tingkat Provinsi Lampung.</p>

<p>Keberhasilan ini tentu tidak datang tiba-tiba. Di balik angka-angka capaian tersebut, ada kerja keras tim lapangan yang tidak kenal lelah, inovasi program yang tepat sasaran, serta antusiasme masyarakat yang mulai menyadari pentingnya memiliki identitas digital di era modern. Artikel ini akan mengulas secara mendalam fakta-fakta di balik kesuksesan IKD di Lampung Timur, termasuk program unggulan PUAKHI yang menjadi motor penggeraknya.</p>

<h2>Data Riil: Mengukur Kesuksesan Aktivasi IKD</h2>
<p>Berbicara mengenai prestasi tentu harus didukung oleh data yang valid dan bukan sekadar klaim sepihak. Berdasarkan data resmi sektoral per pertengahan tahun 2024, tercatat sebanyak **18.079 warga** di Kabupaten Lampung Timur telah berhasil melakukan aktivasi Identitas Kependudukan Digital (IKD).</p>

<p>Angka ini mencerminkan progresivitas yang sangat baik mengingat tantangan geografis dan tingkat literasi digital masyarakat yang bervariasi di wilayah ini. Pencapaian di atas 18 ribu aktivasi tersebut menempatkan Lampung Timur sebagai salah satu kabupaten yang paling dinamis dalam mengejar target nasional yang ditetapkan oleh Kementerian Dalam Negeri.</p>

<p>Pemerintah daerah tidak berpuas diri dengan angka tersebut. Target terus dinaikkan seiring dengan bertambahnya jumlah wajib KTP pemula dan masyarakat umum yang mulai membutuhkan integrasi layanan digital untuk berbagai keperluan, seperti perbankan, kesehatan, dan transportasi.</p>

<h2>Program PUAKHI: Ujung Tombak Jemput Bola ke Desa-Desa</h2>
<p>Salah satu kunci sukses mengapa angka aktivasi IKD di Lampung Timur bisa melesat cepat adalah adanya program inovasi bernama **PUAKHI**. Kata "Puakhi" sendiri dalam bahasa daerah Lampung berarti "Saudara", sebuah nama yang sengaja dipilih untuk memberikan kesan pelayanan yang akrab, hangat, dan mengayomi masyarakat.</p>

<p>PUAKHI adalah program pelayanan jemput bola khusus untuk sosialisasi dan aktivasi Identitas Kependudukan Digital langsung ke tingkat desa. Alih-alih menunggu warga datang ke kantor kabupaten yang jaraknya sangat jauh bagi sebagian orang, tim operator Disdukcapil yang bergerak mendatangi balai-balai desa.</p>

<p>Dengan membawa peralatan mobile dan modem internet, tim PUAKHI membuka gerai pelayanan di desa-desa sasaran. Di sana, mereka membantu warga melakukan instalasi aplikasi IKD, melakukan verifikasi wajah (face recognition), hingga memindai kode QR (*QR Code*) untuk mengaktifkan akun IKD warga secara langsung di tempat.</p>

<h2>Jejak Rekam Lapangan: Dari Tulusrejo hingga Nibung</h2>
<p>Untuk melihat bagaimana program ini berjalan secara nyata dan tidak mengada-ada (*ngadi-ngadi*), kita bisa melihat rekam jejak kegiatan jemput bola yang dilakukan oleh tim Disdukcapil Lampung Timur di beberapa wilayah:</p>

<h3>1. Pelayanan di Desa Tulusrejo (Agustus 2024)</h3>
<p>Pada bulan Agustus 2024, tim Disdukcapil sukses menggelar launching dan pelayanan jemput bola aktivasi IKD di Desa Tulusrejo. Kegiatan ini disambut antusias oleh ratusan warga desa yang ingin merasakan kemudahan memiliki KTP di dalam handphone. Kehadiran petugas di desa ini berhasil memangkas waktu dan biaya transportasi warga yang biasanya harus dikeluarkan jika harus mengurus ke Sukadana.</p>

<h3>2. Pelayanan di Desa Nibung (Oktober 2024)</h3>
<p>Melanjutkan tren positif tersebut, pada bulan Oktober 2024, tim kembali bergerak melakukan jemput bola di Desa Nibung. Di desa ini, petugas tidak hanya melayani warga umum, tetapi juga memberikan edukasi khusus kepada para perangkat desa agar mereka dapat menjadi pionir dalam penggunaan IKD di lingkungan tempat tinggal mereka.</p>

<p>Dua contoh kegiatan di atas adalah bukti otentik bahwa Disdukcapil Lampung Timur beneran bekerja di lapangan demi mengejar target percepatan IKD di Provinsi Lampung.</p>

<h2>Mengapa IKD Sangat Penting bagi Warga?</h2>
<p>Banyak warga di awal program bertanya-tanya, "Mengapa kita harus beralih ke IKD jika sudah punya KTP fisik?". Pertanyaan ini sangat wajar, dan tim Disdukcapil selalu memberikan penjelasan yang komprehensif mengenai keunggulan IKD dibanding dokumen fisik konvensional.</p>

<p>Identitas Kependudukan Digital (IKD) menawarkan berbagai kemudahan yang sangat relevan dengan gaya hidup modern saat ini:</p>
<ul>
  <li><strong>Mencegah Kehilangan Dokumen</strong>: KTP fisik rawan hilang, rusak, atau patah. Dengan IKD, dokumen Anda tersimpan aman di dalam aplikasi smartphone yang terlindungi oleh PIN dan sistem keamanan biometrik.</li>
  <li><strong>Praktis dan Fleksibel</strong>: Di era sekarang, orang lebih sering tertinggal dompet daripada handphone. Dengan IKD, identitas Anda selalu ada di dalam genggaman kemanapun Anda pergi.</li>
  <li><strong>Integrasi Layanan Publik</strong>: Di dalam aplikasi IKD tidak hanya ada KTP digital, tetapi juga memuat Kartu Keluarga digital, data vaksinasi, NPWP, hingga informasi kartu pemilih untuk pemilu. Semua data penting terkumpul dalam satu pintu.</li>
  <li><strong>Ramah Lingkungan</strong>: Penggunaan IKD secara masif akan mengurangi ketergantungan pemerintah terhadap blangko KTP fisik yang membutuhkan biaya cetak tinggi dan penggunaan material plastik.</li>
</ul>

<h2>Tantangan Literasi Digital dan Infrastruktur</h2>
<p>Meskipun mencatatkan rekor kecepatan yang baik, perjalanan mengedukasi IKD di Lampung Timur bukan tanpa hambatan. Tantangan terbesar yang dihadapi tim di lapangan adalah tingkat literasi digital masyarakat yang belum merata.</p>

<p>Masih banyak warga di pedesaan, terutama kelompok usia lanjut, yang belum memiliki smartphone atau merasa kesulitan mengoperasikan aplikasi berbasis Android atau iOS. Menghadapi hal ini, tim Disdukcapil selalu mengedepankan pendekatan yang humanis. Petugas dengan sabar membimbing warga langkah demi langkah, mulai dari mengunduh aplikasi hingga proses aktivasi selesai.</p>

<p>Tantangan lainnya adalah masalah jaringan internet. Aktivasi IKD membutuhkan koneksi internet yang stabil untuk melakukan verifikasi data ke server pusat Kemendagri. Di desa-desa yang masuk kategori *blank spot*, tim PUAKHI harus mencari titik lokasi yang memiliki sinyal terbaik di sekitar desa tersebut agar proses aktivasi tidak terhambat.</p>

<h2>Harapan dan Target Masa Depan</h2>
<p>Keberhasilan mengaktivasi lebih dari 18 ribu warga bukanlah garis finish bagi Disdukcapil Lampung Timur. Ini adalah pondasi kuat untuk terus melangkah maju. Target ke depan adalah terus memperluas jangkauan pelayanan jemput bola agar semakin banyak warga desa terpencil yang teredukasi dan memiliki IKD.</p>

<p>Sinergi dengan berbagai instansi penyedia layanan publik lainnya di tingkat daerah juga terus diperkuat. Tujuannya adalah agar dokumen IKD ini beneran bisa digunakan secara penuh untuk berbagai keperluan, seperti syarat peminjaman di bank daerah, pendaftaran pasien di RSUD, hingga pemeriksaan identitas di pelabuhan atau bandara.</p>

<h2>Kesimpulan</h2>
<p>Prestasi Disdukcapil Lampung Timur dalam memacu percepatan perekaman IKD di Provinsi Lampung adalah buah dari kerja keras dan dedikasi tinggi. Melalui program PUAKHI dan aksi nyata jemput bola ke desa-desa seperti di Tulusrejo dan Nibung, pemerintah daerah telah membuktikan bahwa kemajuan teknologi dapat dihadirkan secara merata hingga ke pelosok desa.</p>

<p>Mari kita dukung terus upaya digitalisasi ini. Bagi warga Lampung Timur yang belum mengaktifkan IKD, segera datangi kantor pelayanan terdekat atau tunggu kehadiran tim jemput bola di desa Anda. Mari melangkah bersama menuju Lampung Timur yang semakin cerdas, makmur, dan berdaya saing!</p>
    `;

    const news = await prisma.news.create({
      data: {
        title: title,
        slug: slug,
        content: content,
        status: "Published",
        authorId: fallbackUser.id,
        seoTitle: "Rekor Perekaman IKD Tercepat Lampung Timur | Disdukcapil",
        seoDesc: "Disdukcapil Lampung Timur catatkan progres cepat aktivasi IKD tembus 18 ribu lebih warga melalui program jemput bola PUAKHI.",
        seoKeywords: "IKD Lampung Timur, PUAKHI, Aktivasi IKD, Disdukcapil Prestasi",
        category: "Prestasi",
        tags: "Prestasi,IKD,Digital,Pelayanan",
        coverImage: "/images/foto_kegiatan/kantor_luar.avif",
        createdAt: new Date("2026-02-10T10:00:00Z"), // Date from user's list
        updatedAt: new Date("2026-02-10T10:00:00Z")
      },
    });

    console.log('Seeded successfully:', news.title);
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
