const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const fallbackUser = await prisma.user.findFirst();
    if (!fallbackUser) {
      console.error('No user found to assign as author. Create a user first.');
      return;
    }

    const articles = [
      {
        title: "PUAKHI: Inovasi Jemput Bola Disdukcapil Lampung Timur untuk Aktivasi IKD",
        slug: "puakhi-inovasi-jemput-bola-disdukcapil-lampung-timur-untuk-aktivasi-ikd",
        category: "Inovasi",
        tags: "IKD,PUAKHI,Pelayanan,Digital",
        content: `
<h2>Pendahuluan</h2>
<p>Di era digitalisasi yang semakin pesat, Pemerintah Kabupaten Lampung Timur melalui Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) terus berupaya menghadirkan inovasi pelayanan yang memudahkan masyarakat. Salah satu program unggulan yang kini tengah gencar dilaksanakan adalah <strong>PUAKHI</strong> (Pelayanan Unjuk Aksi Kependudukan dengan Hadirkan Identitas Digital). Program ini merupakan langkah proaktif Disdukcapil untuk mempercepat cakupan kepemilikan Identitas Kependudukan Digital (IKD) di kalangan masyarakat Lampung Timur.</p>

<p>Kabupaten Lampung Timur dengan luas wilayah mencapai 5.325,03 km² memiliki tantangan tersendiri dalam menyebarluaskan teknologi baru. Jarak antar desa yang jauh dan keterbatasan akses informasi seringkali membuat warga di pedesaan tertinggal dalam memanfaatkan inovasi pemerintah. Oleh karena itu, program PUAKHI hadir dengan konsep "jemput bola" — mendatangi langsung warga di tempat tinggal mereka, alih-alih menunggu warga datang ke kantor dinas.</p>

<h2>Mengenal Lebih Dekat IKD</h2>
<p>Sebelum membahas lebih jauh tentang program PUAKHI, penting untuk memahami apa itu Identitas Kependudukan Digital (IKD). IKD adalah informasi elektronik yang digunakan untuk merepresentasikan Dokumen Kependudukan dan data balikan dalam aplikasi digital melalui gawai yang menampilkan Data Pribadi sebagai identitas yang bersangkutan. Sederhananya, IKD adalah e-KTP yang dipindahkan ke dalam smartphone dalam bentuk aplikasi digital.</p>

<p>IKD memiliki banyak kelebihan dibandingkan KTP fisik. Selain tidak perlu khawatir hilang atau rusak, IKD juga terintegrasi dengan berbagai layanan publik lainnya, seperti BPJS Kesehatan, NPWP, daftar pemilih tetap (DPT), hingga kartu ASN bagi pegawai negeri. Di masa depan, IKD akan menjadi kunci utama dalam mengakses seluruh layanan digital pemerintah.</p>

<p>Namun, untuk mengaktivasi IKD, warga tidak bisa melakukannya sembarangan secara mandiri di rumah dari awal sampai akhir. Proses aktivasi memerlukan verifikasi data, pemindaian wajah (face recognition), dan yang paling krusial adalah pemindaian QR Code yang hanya bisa dilakukan di hadapan petugas resmi Dukcapil. Hal ini dilakukan demi menjaga keamanan data pribadi warga agar tidak disalahgunakan oleh pihak lain.</p>

<h2>Latar Belakang Lahirnya PUAKHI</h2>
<p>Lahirnya program PUAKHI dilatarbelakangi oleh masih rendahnya kesadaran dan pemahaman masyarakat mengenai pentingnya IKD. Banyak warga yang menganggap e-KTP fisik saja sudah cukup. Selain itu, kendala teknis seperti ketidaktahuan cara mengunduh aplikasi di Playstore atau AppStore serta keharusan datang ke kantor Dukcapil untuk scan QR code menjadi hambatan utama.</p>

<p>Melihat kondisi tersebut, Disdukcapil Lampung Timur yang saat itu dipimpin oleh Bapak Amriadi, S.H. dan dilanjutkan oleh Plt. Kepala Dinas Indra Gandi, S.IP., mengambil inisiatif untuk "menjemput bola". Petugas Disdukcapil tidak lagi hanya duduk manis di kantor Sukadana, melainkan turun langsung ke lapangan membawa peralatan dan jaringan internet portabel.</p>

<h2>Mekanisme Pelaksanaan PUAKHI</h2>
<p>Bagaimana program PUAKHI ini dijalankan di lapangan? Pelaksanaannya dilakukan secara terjadwal dan berkolaborasi dengan berbagai pihak. Berikut adalah alur umum pelaksanaan kegiatan PUAKHI:</p>
<ol>
  <li><strong>Pemetaan Target</strong>: Disdukcapil memetakan wilayah atau komunitas yang akan didatangi. Target utama adalah desa-desa yang jauh dari pusat kota, sekolah-sekolah (SMA/SMK), kampus, komunitas adat, dan perkumpulan keagamaan.</li>
  <li><strong>Sosialisasi Pra-Kegiatan</strong>: Melalui aparat desa atau pengurus komunitas, warga diinformasikan mengenai jadwal kedatangan tim PUAKHI dan syarat-syarat yang harus dibawa (smartphone dengan nomor aktif dan email aktif).</li>
  <li><strong>Pelaksanaan di Lokasi</strong>: Tim operator Disdukcapil mendirikan gerai pelayanan darurat di balai desa, aula sekolah, atau tempat yang disepakati.</li>
  <li><strong>Pendampingan Aktivasi</strong>: Warga dibimbing mulai dari mengunduh aplikasi IKD, mengisi data NIK dan email, melakukan swafoto untuk verifikasi wajah, hingga tahap akhir pemindaian QR code oleh petugas.</li>
</ol>

<p>Dalam satu kali kegiatan PUAKHI di sebuah desa, ratusan warga bisa terlayani dalam hitungan jam. Hal ini sangat memotong rantai birokrasi dan menghemat waktu serta biaya warga secara signifikan.</p>

<h2>PUAKHI Goes to School: Menyasar Pemilih Pemula</h2>
<p>Salah satu sasaran paling strategis dari program PUAKHI adalah kalangan pelajar SMA/SMK sederajat. Kelompok ini adalah "digital native" yang sangat melek teknologi dan hampir semuanya memiliki smartphone canggih. Selain itu, banyak dari mereka adalah pemilih pemula yang baru saja berusia 17 tahun atau akan menginjak usia 17 tahun menjelang pemilihan umum.</p>

<p>Melalui sub-program "PUAKHI Goes to School", tim Disdukcapil mendatangi sekolah-sekolah atas izin pihak sekolah. Kegiatan ini biasanya digabungkan dengan perekaman KTP-el pemula bagi siswa yang baru berusia 17 tahun. Setelah data KTP-el terekam dan KTP fisik dicetak, siswa tersebut langsung diarahkan untuk mengunduh aplikasi IKD dan diaktivasi di tempat.</p>

<p>Respon dari kalangan pelajar sangat luar biasa. Mereka sangat antusias memiliki "KTP Digital" di HP mereka. Bagi sekolah, kegiatan ini juga sangat membantu karena siswa tidak perlu meminta izin bolos sekolah hanya untuk mengurus KTP ke kantor kecamatan atau kabupaten.</p>

<h2>Tantangan dalam Pelaksanaan PUAKHI</h2>
<p>Meskipun dinilai sangat sukses dan efektif, program PUAKHI bukan tanpa kendala. Di lapangan, tim seringkali menghadapi berbagai tantangan teknis dan non-teknis, di antaranya:</p>
<ul>
  <li><strong>Sinyal Internet yang Tidak Stabil</strong>: Beberapa desa di pelosok Lampung Timur masih memiliki kualitas sinyal internet yang buruk. Karena aplikasi IKD memerlukan koneksi internet untuk mengirim data dan verifikasi wajah, hal ini seringkali menghambat kelancaran proses.</li>
  <li><strong>Spesifikasi HP Warga</strong>: Syarat minimal untuk menginstal aplikasi IKD adalah Android versi 8 atau iOS versi 11. Tim sering menemukan warga lansia yang masih menggunakan handphone jadul atau smartphone dengan memori penuh sehingga tidak bisa mengunduh aplikasi.</li>
  <li><strong>Ketakutan akan Keamanan Data</strong>: Sebagian warga masih merasa ragu dan takut jika data pribadi mereka dalam HP disalahgunakan. Tim PUAKHI harus bekerja ekstra memberikan edukasi bahwa aplikasi IKD ini dibuat oleh Kemendagri dengan standar keamanan tinggi dan terenkripsi.</li>
</ul>

<h2>Capaian dan Target Masa Depan</h2>
<p>Hingga tahun 2024 dan memasuki tahun 2025, program PUAKHI telah berhasil mengaktivasi ribuan akun IKD warga Lampung Timur. Meskipun angka pastinya terus bergerak naik, dalam Rencana Kerja (Renja) 2026 yang disusun oleh Plt. Kepala Dinas Indra Gandi, S.IP., target aktivasi IKD dicanangkan harus menembus di atas 30% dari total jumlah penduduk yang wajib KTP.</p>

<p>Untuk mencapai target tersebut, Disdukcapil berencana memperluas jangkauan kerja sama tidak hanya dengan desa dan sekolah, tetapi juga dengan perusahaan swasta, pabrik-pabrik yang memiliki banyak karyawan di Lampung Timur, serta instansi perbankan.</p>

<h2>Kesimpulan</h2>
<p>Program PUAKHI adalah bukti nyata bahwa keterbatasan jarak dan birokrasi dapat dipangkas dengan kemauan kuat untuk melayani dan inovasi teknologi. Melalui program jemput bola ini, Disdukcapil Lampung Timur tidak hanya sekadar menjalankan kewajiban administratif, tetapi juga melakukan edukasi digital massal kepada masyarakatnya.</p>

<p>Diharapkan di masa depan, seluruh warga Lampung Timur yang telah memiliki KTP-el juga memiliki IKD di genggaman tangan mereka, sehingga akses ke berbagai layanan publik menjadi lebih mudah, cepat, dan aman demi terwujudnya visi Lampung Timur Makmur Menuju Indonesia Emas.</p>
        `
      },
      {
        title: "PLESIR DJAUH: Solusi Dokumen Kependudukan untuk Warga Desa Terpencil",
        slug: "plesir-djauh-solusi-dokumen-kependudukan-untuk-warga-desa-terpencil",
        category: "Inovasi",
        tags: "Pelayanan,Desa Terpencil,PLESIR DJAUH",
        content: `
<h2>Mendekatkan Layanan ke Pelosok</h2>
<p>Disdukcapil Lampung Timur menghadirkan program <strong>PLESIR DJAUH</strong> (Pelayanan Langsung Sambil Ikut Rombongan Djauh) untuk menjawab keluhan masyarakat yang tinggal di wilayah terpencil dan perbatasan.</p>

<p>Bagi warga yang tinggal jauh dari ibukota kabupaten Sukadana, mengurus dokumen seperti Kartu Keluarga, Akta Kelahiran, atau KTP-el adalah perjuangan tersendiri. Mereka harus meluangkan waktu satu hari penuh, mengeluarkan ongkos transportasi yang tidak sedikit, dan meninggalkan pekerjaan mereka sebagai petani atau pekebun.</p>

<p>Melihat kondisi tersebut, tim PLESIR DJAUH bentukan Disdukcapil secara berkala mengemasi peralatan rekam dan cetak dokumen mereka ke dalam mobil khusus, lalu meluncur ke desa-desa yang telah dijadwalkan. Mereka membuka kantor darurat di balai desa setempat.</p>

<p>Keunggulan utama dari program ini adalah **seluruh dokumen dicetak langsung di tempat**. Warga yang datang membawa berkas persyaratan lengkap tidak perlu pulang dengan tangan hampa. Dalam hitungan jam, Kartu Keluarga baru atau KTP-el yang sudah jadi bisa langsung dibawa pulang.</p>

<p>Program ini terbukti efektif menaikkan angka kepemilikan dokumen kependudukan di Lampung Timur dan mendapat apresiasi tinggi dari masyarakat yang merasa sangat terbantu dengan kehadiran negara di tengah-tengah mereka.</p>
        `
      },
      {
        title: "Isbat Nikah Terpadu: Disdukcapil Lamtim Berikan Legalitas Hukum Bagi Ratusan Pasangan",
        slug: "isbat-nikah-terpadu-disdukcapil-lamtim-berikan-legalitas-hukum-bagi-ratusan-pasangan",
        category: "Inovasi",
        tags: "Isbat Nikah,Pelayanan,Legalitas",
        content: `
<h2>Satu Hari Jadi: Sidang Isbat, Buku Nikah, dan Dokumen Kependudukan</h2>
<p>Banyaknya pasangan di pedesaan yang pernikahannya belum tercatat secara negara (nikah siri) menjadi perhatian serius Pemerintah Kabupaten Lampung Timur. Tanpa adanya buku nikah resmi, anak-anak yang lahir dari pernikahan tersebut akan kesulitan mendapatkan akta kelahiran standar yang mencantumkan nama ayah dan ibunya.</p>

<p>Menjawab persoalan tersebut, Disdukcapil Lampung Timur berkolaborasi dengan Pengadilan Agama Sukadana dan Kantor Kementerian Agama Lampung Timur menggelar program **Isbat Nikah Terpadu**.</p>

<p>Program ini mengusung konsep "one day service" atau pelayanan satu hari jadi. Di lokasi acara, pasangan yang telah lolos verifikasi akan menjalani sidang isbat oleh hakim Pengadilan Agama untuk mengesahkan pernikahan mereka secara hukum negara. Setelah diputus sah, Kemenag langsung menerbitkan Buku Nikah di tempat.</p>

<p>Di meja berikutnya, petugas Disdukcapil langsung memproses perubahan status di Kartu Keluarga (KK) dan mencetak KTP-el baru bagi pasangan tersebut dengan status "Kawin Tercatat". Semua layanan ini diberikan secara gratis tanpa dipungut biaya sepeser pun.</p>

<p>Salah satu pelaksanaannya yang sukses digelar di Balai Desa Sribhawono berhasil melayani 193 pasangan suami istri. Program ini memberikan senyum bahagia dan kepastian hukum bagi masa depan keluarga di Lampung Timur.</p>
        `
      }
    ];

    for (const article of articles) {
      const news = await prisma.news.create({
        data: {
          title: article.title,
          slug: article.slug,
          content: article.content,
          status: "Published",
          authorId: fallbackUser.id,
          seoTitle: article.title,
          seoDesc: `Artikel mengenai ${article.title} oleh Disdukcapil Lampung Timur.`,
          category: article.category,
          tags: article.tags,
          coverImage: "/images/foto_kegiatan/kantor_luar.avif",
          isCarousel: true
        },
      });
      console.log('Seeded successfully:', news.title);
    }

    console.log('=== All requested articles seeded successfully! ===');
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
