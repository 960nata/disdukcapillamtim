const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const fallbackUser = await prisma.user.findFirst();
    if (!fallbackUser) {
      console.error('No user found to assign as author. Create a user first.');
      return;
    }

    const title = "Transformasi Pelayanan Adminduk Disdukcapil Lampung Timur 2023-2026: Inovasi Tanpa Batas untuk Warga";
    const slug = "transformasi-pelayanan-adminduk-disdukcapil-lampung-timur-2023-2026";
    
    const content = `
<h2>Pendahuluan</h2>
<p>Di tengah luasnya wilayah Kabupaten Lampung Timur yang mencakup 5.325,03 km² dengan lebih dari 1,13 juta jiwa penduduk yang tersebar di 264 desa dan 24 kecamatan, tantangan memberikan pelayanan administrasi kependudukan yang merata dan berkualitas bukanlah perkara mudah. Geografi yang luas dengan jarak antar desa yang berjauhan seringkali menjadi kendala utama bagi masyarakat untuk mendapatkan hak-hak sipil mereka. Namun, dalam kurun waktu 2023 hingga 2026, Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kabupaten Lampung Timur telah membuktikan bahwa keterbatasan geografis bukan hambatan, melainkan motivasi untuk terus berinovasi demi kesejahteraan masyarakat.</p>

<p>Dengan komitmen kuat "Melayani Sepenuh Hati," Disdukcapil Lampung Timur telah merancang dan melaksanakan serangkaian program inovatif yang tidak hanya diakui di tingkat daerah, tetapi juga mendapat pengakuan nasional. Salah satu puncaknya adalah raihan nilai 95,08 (Zona Hijau – Kualitas Tertinggi) dari Ombudsman RI pada tahun 2024. Artikel ini akan merangkum secara mendalam perjalanan transformasi pelayanan Disdukcapil Lampung Timur selama periode tersebut, mencakup inovasi program, capaian kinerja, penghargaan, serta dampak nyata yang dirasakan oleh masyarakat.</p>

<h2>1. Konteks dan Tantangan Wilayah Lampung Timur</h2>
<p>Kabupaten Lampung Timur adalah salah satu kabupaten terluas di Provinsi Lampung. Dengan total penduduk mencapai 1.132.341 jiwa per Semester II 2025 — terdiri dari 575.383 jiwa laki-laki dan 556.958 jiwa perempuan dalam 556.958 Kartu Keluarga — skala pelayanan yang harus dikelola oleh dinas ini sangatlah besar dan kompleks. Setiap hari, ribuan data bergerak, mulai dari kelahiran baru, perpindahan penduduk, hingga peristiwa kematian yang semuanya memerlukan pencatatan yang akurat dan cepat.</p>

<p>Beberapa tantangan utama yang dihadapi oleh Disdukcapil Lampung Timur antara lain:</p>
<ul>
  <li><strong>Tingginya mobilitas penduduk</strong>: Meliputi peristiwa pindah-datang, lahir, mati, kawin, dan cerai yang terjadi setiap hari dan harus dicatat secara real-time agar data kependudukan tetap valid.</li>
  <li><strong>Ketimpangan geografis</strong>: Di mana sejumlah desa berada sangat jauh dari ibukota kabupaten Sukadana. Warga dari pelosok harus menempuh perjalanan berjam-jam hanya untuk mengurus selembar dokumen, yang tentu saja memakan biaya dan waktu tidak sedikit.</li>
  <li><strong>Rendahnya kepemilikan dokumen kependudukan</strong> di kelompok rentan: Termasuk masyarakat miskin, penyandang disabilitas, lansia, dan warga di wilayah perbatasan yang seringkali kesulitan mengakses kantor pelayanan.</li>
  <li><strong>Perkawinan tidak tercatat</strong>: Angka perkawinan siri atau tidak tercatat negara masih cukup tinggi di beberapa wilayah, menyebabkan istri dan anak-anak tidak memperoleh perlindungan hukum penuh dan kesulitan mendapatkan akta kelahiran standar.</li>
  <li><strong>Kesenjangan literasi digital</strong>: Meskipun teknologi berkembang pesat, masih banyak warga di pedesaan yang belum melek teknologi, menjadi kendala tersendiri dalam pengembangan layanan berbasis online.</li>
</ul>

<p>Menyikapi tantangan-tantangan ini, Disdukcapil Lampung Timur di bawah kepemimpinan Kepala Dinas Amriadi, S.H. (2024) dan dilanjutkan oleh Plt. Kepala Dinas Indra Gandi, S.IP. (2025–2026), merancang enam program unggulan berbasis inovasi yang menjawab kebutuhan lapangan secara langsung dan efektif.</p>

<h2>2. Enam Program Unggulan Disdukcapil Lampung Timur</h2>

<h3>2.1. PUAKHI — Jemput Bola Aktivasi IKD (Identitas Kependudukan Digital)</h3>
<p>Program <strong>PUAKHI</strong> (Pelayanan Unjuk Aksi Kependudukan dengan Hadirkan Identitas Digital) adalah program jemput bola aktivasi dan sosialisasi Identitas Kependudukan Digital (IKD) yang dilaksanakan langsung ke desa-desa seluruh Lampung Timur. IKD merupakan terobosan dari Ditjen Dukcapil Kemendagri yang mendigitalisasi dokumen kependudukan ke dalam smartphone warga.</p>

<p>IKD merupakan pengganti e-KTP dalam bentuk aplikasi digital yang dapat diakses melalui smartphone. Namun tantangannya, banyak warga — terutama di pedesaan — tidak mengetahui cara mengaktivasinya, bahkan ada yang belum pernah mengunduh aplikasinya karena keterbatasan informasi. Program PUAKHI hadir untuk menjembatani jurang informasi tersebut.</p>

<p>Melalui program ini, petugas Disdukcapil aktif mendatangi desa-desa, sekolah, kampus, komunitas keagamaan, dan komunitas adat untuk membantu warga mengaktivasi IKD secara langsung didampingi oleh operator terlatih. Hal ini sangat krusial karena aktivasi IKD memerlukan verifikasi face recognition dan scan QR code khusus yang dipegang oleh petugas resmi demi keamanan data. Target yang ditetapkan dalam Renja 2026 adalah aktivasi IKD di atas 30% dari total perekaman KTP-el, sebuah target ambisius yang terus dikejar melalui intensifikasi program ini.</p>

<h3>2.2. PLESIR DJAUH — Menjangkau Desa Terpencil dan Perbatasan</h3>
<p><strong>PLESIR DJAUH</strong> (Pelayanan Langsung Sambil Ikut Rombongan Djauh) adalah program penerbitan dokumen kependudukan bagi masyarakat desa yang letaknya sangat jauh dari ibukota kabupaten atau berada di wilayah perbatasan yang sulit dijangkau transportasi umum.</p>

<p>Dalam program ini, tim Disdukcapil secara rutin keluar kantor and mendatangi lokasi-lokasi terpencil untuk memberikan layanan cetak dokumen secara langsung — mulai dari Kartu Keluarga, KTP-el, akta kelahiran, akta kematian, hingga Kartu Identitas Anak (KIA) — tanpa masyarakat harus menempuh perjalanan puluhan kilometer ke Sukadana. Semua peralatan rekam dan cetak dibawa langsung ke lokasi kegiatan.</p>

<p>Salah satu momen berkesan adalah pelaksanaan layanan jemput bola di Balai Desa Sumber Gede yang berlangsung mulai pukul 08.00 hingga 16.00. Ratusan warga antusias mengantre, dan yang paling membahagiakan adalah semua dokumen yang diproses hari itu langsung dicetak dan diserahkan kepada masyarakat di tempat tanpa perlu menunggu hari esok. Program ini sejalan dengan amanat Peraturan Menteri Dalam Negeri Nomor 19 Tahun 2018 tentang Peningkatan Kualitas Layanan Administrasi Kependudukan.</p>

<h3>2.3. LAMTIM CERIA — Percepatan Kepemilikan KIA di Sekolah</h3>
<p><strong>LAMTIM CERIA</strong> (Lampung Timur Cetak dan Rekam Identitas Anak) adalah program cetak rekam Kartu Identitas Anak (KIA) yang dilaksanakan secara terintegrasi bekerja sama dengan sekolah, PAUD, dan TK di seluruh Kabupaten Lampung Timur.</p>

<p>KIA adalah identitas resmi bagi anak di bawah 17 tahun yang diterbitkan oleh Disdukcapil sebagai upaya negara memberikan perlindungan dan pemenuhan hak sipil anak. Sayangnya, tingkat kepemilikan KIA di Lampung Timur pada awalnya masih berada di angka 42% — masih di bawah target nasional sebesar 60%. Program LAMTIM CERIA menjadi solusi jitu dengan cara "menjemput bola ke sekolah" sehingga orang tua tidak perlu repot membawa anak ke kantor Disdukcapil.</p>

<p>Dengan mendatangi langsung sekolah-sekolah, petugas dapat merekam dan mencetak KIA dalam jumlah besar sekaligus. Anak-anak merasa senang karena prosesnya cepat dan mereka langsung mendapatkan kartu identitas mereka sendiri yang berguna untuk berbagai keperluan, seperti pendaftaran sekolah, menabung di bank, hingga klaim asuransi kesehatan.</p>

<h3>2.4. SILAMTIM BERJAYA — Layanan Mandiri Online 24 Jam</h3>
<p><strong>SILAMTIM BERJAYA</strong> (Sistem Informasi Layanan Administrasi Kependudukan Lampung Timur Berbasis Jaringan) adalah platform layanan online administrasi kependudukan yang memungkinkan warga mengurus semua dokumen dari mana saja tanpa harus antre di kantor fisik.</p>

<p>Layanan ini dapat diakses melalui website resmi maupun aplikasi smartphone, dan telah beroperasi secara konsisten untuk melayani warga. Melalui platform ini, warga dapat mengajukan permohonan dokumen seperti KK, KTP-el, akta kelahiran, akta kematian, surat pindah, dan KIA secara daring dengan mengunggah berkas persyaratan yang diperlukan.</p>

<p>Bagi warga yang tinggal jauh dari Sukadana — bahkan yang sedang merantau di luar kota atau luar negeri — sistem ini sangat membantu menghemat biaya transportasi dan akomodasi. Dokumen seperti akta kelahiran akan dikirimkan ke email pemohon dalam format PDF ber-tanda tangan elektronik (TTE) yang sah secara hukum dan dapat dicetak mandiri oleh warga menggunakan kertas HVS A4 80 gram.</p>

<h3>2.5. PALING MANTAB — Integrasi Cerdas dengan BPJS Kesehatan</h3>
<p><strong>PALING MANTAB</strong> (Pelayanan Administrasi Kependudukan Lampung Timur Mantap Terintegrasi Bersama) adalah layanan daring terintegrasi yang menghubungkan pengurusan dokumen kependudukan dengan pendaftaran BPJS Kesehatan dalam satu alur layanan yang ringkas.</p>

<p>Inovasi ini sangat berarti bagi warga yang baru melahirkan. Dalam satu proses pengajuan di rumah sakit atau puskesmas yang bekerja sama, mereka dapat sekaligus mendapatkan NIK bayi, akta kelahiran, pembaruan Kartu Keluarga, dan mendaftarkan bayi tersebut ke BPJS Kesehatan. Integrasi lintas sektor seperti ini mencerminkan semangat "negara hadir" secara komprehensif dalam satu titik pelayanan, mengurangi beban birokrasi bagi keluarga yang sedang berbahagia namun sibuk merawat bayi baru lahir.</p>

<h3>2.6. ISBAT NIKAH TERPADU — Memberikan Kepastian Hukum Keluarga</h3>
<p><strong>ISBAT NIKAH TERPADU</strong> adalah program kolaborasi luar biasa antara Pemerintah Kabupaten Lampung Timur, Pengadilan Agama Sukadana, dan Kantor Kementerian Agama Lampung Timur untuk memberikan kepastian hukum bagi pasangan yang perkawinannya belum tercatat negara.</p>

<p>Dalam satu hari kegiatan di lokasi yang ditentukan, pasangan peserta dapat memperoleh tiga produk hukum sekaligus: sidang isbat/pengesahan perkawinan oleh Pengadilan Agama, penerbitan buku nikah dari Kementerian Agama, serta pembaruan Kartu Keluarga dan KTP-el dari Disdukcapil — semuanya diberikan secara gratis dan selesai dalam satu hari kerja.</p>

<p>Program ini secara tegas merespons persoalan perkawinan tidak tercatat yang selama ini menjadi hambatan utama dalam penerbitan dokumen kependudukan anak-anak mereka. Pelaksanaan Isbat Nikah Terpadu Gelombang I pada 21 Juli 2025 di Balai Desa Sribhawono, Kecamatan Bandar Sribhawono, diikuti oleh 193 pasangan dari total 320 pendaftar yang telah lolos proses verifikasi berkas. Kepala Dinas Indragandi, S.IP. secara simbolis menyerahkan langsung KK dan KTP hasil isbat nikah kepada pemohon, menandai era baru kepastian hukum bagi keluarga-keluarga tersebut.</p>

<h2>3. Sistem Pelayanan Berbasis Zona: Mendekatkan Layanan ke Pintu Rumah</h2>
<p>Selain program-program unggulan di atas, Disdukcapil Lampung Timur juga menerapkan sistem pelayanan berbasis zona sesuai amanat Permendagri No. 19 Tahun 2018. Langkah ini diambil untuk memecah konsentrasi antrean di kantor pusat dan memberikan kemudahan akses bagi warga yang tinggal di wilayah luar jangkauan Sukadana.</p>

<p>Lima zona pelayanan ditempatkan di kantor kecamatan yang tersebar secara strategis di seluruh wilayah kabupaten:</p>
<ol>
  <li><strong>Zona 1</strong> — Kantor Camat Way Jepara (melayani wilayah timur laut)</li>
  <li><strong>Zona 2</strong> — Kantor Camat Marga Sekampung (melayani wilayah barat daya)</li>
  <li><strong>Zona 3</strong> — Kantor Camat Batanghari (melayani wilayah barat)</li>
  <li><strong>Zona 4</strong> — Kantor Camat Mataram Baru (melayani wilayah tenggara)</li>
  <li><strong>Zona 5</strong> — Kantor Camat Labuhan Maringgai (melayani wilayah pesisir timur)</li>
</ol>
<p>Melalui sistem zona ini, masyarakat dapat mengajukan pencetakan seluruh dokumen kependudukan di zona terdekat dari domisili mereka tanpa harus menempuh perjalanan jauh ke kantor pusat di Sukadana. Dokumen dicetak langsung di lokasi zona pelayanan, menghemat waktu, tenaga, and biaya transportasi warga secara signifikan.</p>

<h2>4. Capaian Kinerja 2024: Transparansi Anggaran dan Target Indikator</h2>
<p>Tahun anggaran 2024 menjadi tonggak penting dalam perjalanan Disdukcapil Lampung Timur. Berdasarkan dokumen Rencana Kerja (Renja) 2026 yang dipublikasikan secara resmi, dinas ini menunjukkan performa pengelolaan keuangan dan program yang sangat sehat:</p>
<ul>
  <li><strong>Realisasi anggaran</strong>: Berhasil menyerap Rp 8,23 miliar dari total pagu Rp 8,69 miliar, atau setara dengan <strong>94,68%</strong>. Capaian ini mencerminkan tata kelola anggaran yang disiplin, sehat, dan terencana dengan baik.</li>
  <li><strong>Perjanjian kinerja</strong> ditandatangani pada 3 Januari 2024 antara Kepala Dinas Amriadi, S.H. and Bupati Lampung Timur Hi.M. Dawam Rahardjo, sebagai bentuk komitmen pencapaian target.</li>
  <li>Anggaran tersebut disebar ke dalam empat program utama yang mencakup seluruh aspek layanan kependudukan dan pencatatan sipil dari hulu ke hilir.</li>
</ul>

<p>Dari sisi indikator kepemilikan dokumen dan target masa depan:</p>
<ul>
  <li>Kepemilikan KIA saat ini berada di angka 42% dengan target kenaikan menuju 60% melalui program LAMTIM CERIA.</li>
  <li>Pemanfaatan data kependudukan oleh Organisasi Perangkat Daerah (OPD) lain saat ini sebesar 27% dengan target ambisius mencapai 55% untuk mendukung perencanaan pembangunan yang berbasis data valid (data-driven policy).</li>
  <li>Target aktivasi IKD ditetapkan di atas 30% dari total perekaman KTP-el di wilayah Lampung Timur.</li>
</ul>

<h2>5. Pengakuan Nasional: Nilai Gemilang 95,08 dari Ombudsman RI</h2>
<p>Pencapaian paling membanggakan bagi Disdukcapil Lampung Timur di periode ini adalah raihan nilai 95,08 (Zona Hijau – Kualitas Tertinggi) dalam Penilaian Kepatuhan Penyelenggaraan Pelayanan Publik oleh Ombudsman RI pada tahun 2024. Penghargaan ini menjadi bukti sahih atas kerja keras seluruh elemen dinas.</p>

<p>Penilaian dari Ombudsman RI merupakan evaluasi independen yang sangat ketat, mengukur kepatuhan lembaga pelayanan publik terhadap standar yang ditetapkan undang-undang. Zona Hijau dengan kualitas tertinggi berarti Disdukcapil Lampung Timur dinilai telah memenuhi hampir seluruh standar pelayanan publik yang baik — mulai dari ketersediaan maklumat pelayanan yang jelas, standar operasional prosedur (SOP) yang transparan, penanganan pengaduan masyarakat yang responsif, aksesibilitas layanan bagi kaum rentan, hingga keterbukaan informasi publik.</p>

<p>Raihan nilai 95,08 ini bukan sekadar angka di atas kertas. Ini adalah pengakuan formal dari lembaga pengawas negara bahwa Disdukcapil Lampung Timur telah benar-benar bertransformasi dari instansi birokrasi konvensional yang sering dicap lamban menjadi dinas pelayanan publik yang modern, akuntabel, ramah, dan sangat berpihak kepada kepentingan masyarakat.</p>

<h2>6. Modernisasi Administrasi: Tanda Tangan Elektronik dan Cetak Mandiri</h2>
<p>Sejak 1 Juli 2020 dan dilanjutkan secara konsisten hingga periode 2023–2026, seluruh dokumen kependudukan hasil pelayanan Disdukcapil Lampung Timur dicetak menggunakan kertas HVS A4 80 gram berwarna putih, sesuai dengan amanat Permendagri Nomor 109 Tahun 2019. Kebijakan ini menggantikan penggunaan kertas security berhologram yang mahal dan seringkali terbatas pasokannya.</p>

<p>Yang lebih revolusioner, seluruh dokumen tersebut kini telah dibubuhi Tanda Tangan Elektronik (TTE) berupa QR Code barcode, sehingga tidak lagi memerlukan legalisasi manual basah dari pejabat berwenang. Keabsahan dokumen dapat langsung dicek oleh instansi pengguna (seperti bank, imigrasi, atau kepolisian) melalui aplikasi barcode scanner yang tersedia gratis di Playstore/AppStore.</p>

<p>Kebijakan ini memberikan kemerdekaan bagi warga. Warga yang tinggal jauh dari kantor Disdukcapil dapat mencetak dokumen kependudukannya secara mandiri di rumah, warnet, atau tempat fotokopi terdekat setelah menerima file PDF resmi melalui email — tanpa perlu lagi bolak-balik ke Sukadana hanya untuk meminta legalisir cap basah.</p>

<h2>7. Sinergi Lintas Lembaga: Kolaborasi untuk Solusi Komprehensif</h2>
<p>Kesadaran bahwa persoalan kependudukan tidak bisa diselesaikan sendirian mendorong Disdukcapil Lampung Timur aktif membangun sinergi dengan berbagai lembaga vertikal maupun horizontal. Salah satu wujud nyatanya adalah pelaksanaan Forum Group Discussion (FGD) bertema "TERPANA" (Terintegrasi Penertiban Administrasi Kependudukan dengan Kementerian Agama) bersama Kantor Kementerian Agama Lampung Timur yang melahirkan banyak inovasi turunan.</p>

<p>Forum ini berhasil melahirkan kesepakatan integrasi layanan pencatatan nikah antara KUA, Pengadilan Agama, dan Disdukcapil — yang kemudian menjadi cikal bakal suksesnya program Isbat Nikah Terpadu yang berjalan dengan sangat baik pada tahun 2024 dan 2025.</p>

<p>Selain itu, Disdukcapil juga aktif berpartisipasi dalam Musyawarah Perencanaan Pembangunan (Musrenbang) tingkat kecamatan. Kehadiran Disdukcapil di Musrenbang bukan hanya sebagai pendengar, tetapi sekaligus membuka gerai layanan jemput bola di lokasi acara. Seperti yang terjadi pada 14 Maret 2025 di Desa Braja Gemilang, Kecamatan Braja Selebah, di mana tim Disdukcapil melayani penerbitan KK, akta, KIA, dan perekaman KTP-el langsung di hadapan Wakil Bupati H. Azwar Hadi yang hadir meninjau.</p>

<h2>8. Menuju Masa Depan: Rencana Strategis Menuju Indonesia Emas 2045</h2>
<p>Dokumen Renja 2026 yang disusun di bawah kepemimpinan Plt. Kepala Dinas Indra Gandi, S.IP. menunjukkan ambisi besar Disdukcapil Lampung Timur untuk tahun-tahun mendatang, menyelaraskan diri dengan visi daerah "Lampung Timur Makmur Menuju Indonesia Emas."</p>

<p>Beberapa prioritas strategis untuk masa depan meliputi:</p>
<ul>
  <li><strong>Penguatan Infrastruktur Digital dan Keamanan Siber</strong>: Mengingat data kependudukan adalah aset negara yang sangat sensitif, Disdukcapil berencana mengimplementasikan teknologi cloud hybrid, sistem firewall yang lebih kuat, enkripsi data end-to-end, dan sistem threat detection untuk melindungi data kependudukan 1,13 juta warga dari ancaman kejahatan siber. Standar ISO 27001 menjadi acuan utama dalam manajemen keamanan informasi ini.</li>
  <li><strong>Percepatan Kepemilikan KIA</strong>: Target kepemilikan KIA dinaikkan secara agresif dari 42% menuju 60% dan seterusnya, dengan mengintensifkan kembali program LAMTIM CERIA di seluruh jenjang sekolah dasar dan anak usia dini.</li>
  <li><strong>Ekspansi Masif Aktivasi IKD</strong>: Target aktivasi IKD dipatok menembus angka di atas 30% dari total wajib KTP melalui pendekatan kolaboratif yang lebih luas dengan menggandeng komunitas pemuda, karang taruna, dan organisasi kemasyarakatan.</li>
  <li><strong>Peningkatan Pemanfaatan Data Kependudukan (Data Sharing)</strong>: Mendorong seluruh OPD di lingkungan Pemkab Lampung Timur untuk memanfaatkan hak akses data kependudukan Disdukcapil guna mempertajam akurasi target sasaran program pembangunan, seperti penyaluran bantuan sosial, pelayanan kesehatan, hingga pemetaan potensi pajak daerah.</li>
</ul>

<h2>Kesimpulan</h2>
<p>Perjalanan transformasi pelayanan administrasi kependudukan di Disdukcapil Lampung Timur dalam kurun waktu 2023–2026 adalah sebuah kisah inspiratif tentang bagaimana sebuah instansi pemerintah daerah dapat mendobrak keterbatasan demi melayani rakyatnya dengan lebih baik. Dengan bermodalkan komitmen "Melayani Sepenuh Hati," dinas ini berhasil mengubah tantangan geografis yang berat menjadi jembatan-jembatan inovasi yang mempercepat pelayanan.</p>

<p>Raihan nilai 95,08 dari Ombudsman RI bukanlah titik akhir pencapaian, melainkan sebuah standar baru sekaligus bahan bakar motivasi untuk terus melangkah lebih jauh di masa depan. Dengan rencana strategis yang matang menuju tahun 2026 dan seterusnya, Disdukcapil Lampung Timur siap terus berada di garda terdepan dalam mewujudkan ekosistem pelayanan publik yang membahagiakan masyarakat, menuju terwujudnya visi besar "Lampung Timur Makmur Menuju Indonesia Emas."</p>
    `;

    const news = await prisma.news.create({
      data: {
        title: title,
        slug: slug,
        content: content,
        status: "Published",
        authorId: fallbackUser.id,
        seoTitle: "Transformasi Pelayanan Disdukcapil Lampung Timur 2023-2026 | Inovasi Adminduk",
        seoDesc: "Artikel lengkap mengenai inovasi, capaian kinerja, dan transformasi pelayanan Disdukcapil Lampung Timur periode 2023-2026 dengan nilai Ombudsman 95,08.",
        seoKeywords: "Disdukcapil Lampung Timur, Inovasi Adminduk, IKD, KIA, Pelayanan Publik, Lampung Timur",
        category: "Inovasi",
        tags: "Inovasi,Pelayanan,IKD,KIA,Ombudsman",
        coverImage: "/images/foto_kegiatan/kantor_luar.avif",
        isCarousel: true
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
