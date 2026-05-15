const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const fallbackUser = await prisma.user.findFirst();
    if (!fallbackUser) {
      console.error('No user found to assign as author. Create a user first.');
      return;
    }

    const title = "Pelayanan 'Jebol' (Jemput Bola) di Wilayah Pesisir Labuhan Maringgai";
    const slug = "pelayanan-jebol-jemput-bola-di-wilayah-pesisir-labuhan-maringgai";
    
    // Generating content in the specific JSON array block format expected by the app
    // Using H3, H4, and paragraph tags inside the text block content
    const contentArray = [
      {
        type: "text",
        content: `
<h3>Pendahuluan: Tantangan Geografis Wilayah Pesisir</h3>
<p>Kabupaten Lampung Timur memiliki bentang alam yang sangat luas, dengan garis pantai yang panjang di sepanjang wilayah timur. Salah satu kecamatan yang berada di wilayah pesisir adalah Kecamatan Labuhan Maringgai. Jarak yang cukup jauh dari pusat pemerintahan kabupaten di Sukadana seringkali menjadi kendala klasik bagi masyarakat pesisir dalam mengakses pelayanan publik, terutama pengurusan dokumen administrasi kependudukan (adminduk).</p>

<p>Menyadari hambatan geografis tersebut, Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kabupaten Lampung Timur tidak tinggal diam. Demi mewujudkan prinsip "Negara Hadir di Tengah Masyarakat," Disdukcapil meluncurkan strategi ganda: membuka pusat pelayanan tetap di tingkat kecamatan dan menggeber program **Jebol** (Jemput Bola) langsung ke desa-desa nelayan di wilayah pesisir.</p>

<p>Langkah ini terbukti sangat efektif dalam mendongkrak cakupan kepemilikan dokumen kependudukan di wilayah pesisir. Artikel ini akan mengulas bagaimana sistem pelayanan di Labuhan Maringgai bekerja, fakta-fakta lapangan mengenai program Jebol, serta komitmen Disdukcapil dalam menghadirkan layanan yang membahagiakan masyarakat tanpa pungutan biaya sepeser pun.</p>

<h3>Pelayanan Tetap di Kecamatan: Solusi Strategis Zona 5</h3>
<p>Sebelum adanya desentralisasi pelayanan, warga Labuhan Maringgai harus menempuh perjalanan berjam-jam untuk sampai ke kantor Disdukcapil pusat. Kondisi ini sangat memberatkan, baik dari segi waktu maupun biaya transportasi, apalagi bagi masyarakat yang berprofesi sebagai nelayan tradisional dengan penghasilan harian yang tidak menentu.</p>

<p>Sebagai solusi permanen, Pemerintah Kabupaten Lampung Timur menetapkan kantor Kecamatan Labuhan Maringgai sebagai pusat pelayanan adminduk untuk **Zona 5**. Zona ini dibentuk khusus untuk melayani masyarakat di empat kecamatan sekaligus, yaitu:</p>
<ul>
  <li>Kecamatan Labuhan Maringgai</li>
  <li>Kecamatan Pasir Sakti</li>
  <li>Kecamatan Melinting</li>
  <li>Kecamatan Gunung Pelindung</li>
</ul>

<p>Di pusat pelayanan Zona 5 ini, masyarakat dapat melakukan perekaman dan pembuatan KTP elektronik (KTP-el), pembuatan Kartu Keluarga (KK), hingga pencetakan Kartu Identitas Anak (KIA) secara langsung tanpa harus pergi ke ibu kota kabupaten. Kehadiran loket pelayanan ini menjadi angin segar yang disambut gembira oleh ribuan warga pesisir.</p>

<h3>Program 'Jebol': Menembus Batas Jarak hingga ke Rumah Warga</h3>
<p>Meskipun sudah ada loket di kantor kecamatan, Disdukcapil menyadari bahwa masih ada kelompok masyarakat yang tetap kesulitan untuk datang. Mereka adalah kaum lansia, penyandang disabilitas, warga yang sedang sakit keras, serta masyarakat yang tinggal di pulau-pulau kecil atau desa terpencil yang sulit diakses transportasi umum.</p>

<p>Untuk kelompok rentan inilah program **Jebol (Jemput Bola)** digulirkan secara rutin. Tim operator Disdukcapil yang berdedikasi tinggi bergerak mendatangi balai desa, sekolah-sekolah, bahkan melakukan kunjungan langsung dari rumah ke rumah (*door-to-door*).</p>

<h4>Fokus Layanan Jemput Bola</h4>
<p>Dalam setiap aksi jemput bola di wilayah pesisir Labuhan Maringgai, petugas fokus memberikan beberapa layanan prioritas, di antaranya:</p>
<ul>
  <li><strong>Perekaman KTP-el Pemula</strong>: Menyasar para pelajar di sekolah-sekolah pesisir yang telah memasuki usia 17 tahun agar segera memiliki identitas resmi.</li>
  <li><strong>Aktivasi IKD (Identitas Kependudukan Digital)</strong>: Membantu warga yang memiliki smartphone untuk mengaktifkan KTP digital mereka agar lebih praktis digunakan.</li>
  <li><strong>Penyisiran Warga Disabilitas</strong>: Petugas membawa alat rekam biometrik portable langsung ke dalam rumah warga yang mengalami keterbatasan fisik untuk melakukan pengambilan foto dan sidik jari.</li>
</ul>

<h3>Komitmen Pelayanan: 100% Gratis dan Bebas Calo</h3>
<p>Satu hal yang paling ditekankan oleh pimpinan Disdukcapil Lampung Timur dalam setiap sosialisasi adalah bahwa seluruh layanan administrasi kependudukan adalah **GRATIS** alias tidak dipungut biaya sepeser pun. Hal ini berlaku untuk semua jenis layanan: baik yang diurus di kantor kabupaten, di loket kecamatan Zona 5, melalui aplikasi online *Si LAMTIM MAKMUR*, maupun melalui layanan jemput bola di desa.</p>

<p>Kebijakan ini diambil untuk melindungi masyarakat dari praktik percaloan yang seringkali memanfaatkan ketidaktahuan warga pedesaan. Masyarakat diimbau untuk mengurus dokumen kependudukannya secara mandiri melalui jalur-jalur resmi yang telah disediakan oleh pemerintah.</p>

<h3>Kesimpulan</h3>
<p>Pelayanan adminduk di wilayah pesisir Labuhan Maringgai adalah contoh nyata bagaimana inovasi birokrasi dapat meruntuhkan sekat geografis. Dengan adanya pembagian Zona 5 dan masifnya program Jemput Bola (Jebol), masyarakat pesisir kini dapat menikmati hak sipil mereka dengan mudah, cepat, dan tanpa beban biaya.</p>

<p>Disdukcapil Lampung Timur berkomitmen untuk terus mempertahankan dan meningkatkan kualitas layanan ini. Karena bagi kami, senyum bahagia warga pesisir saat menerima dokumen kependudukan mereka adalah bukti nyata dari keberhasilan pelayanan yang kami berikan.</p>
        `
      }
    ];

    const news = await prisma.news.create({
      data: {
        title: title,
        slug: slug,
        content: JSON.stringify(contentArray), // Storing as stringified JSON array
        status: "Published",
        authorId: fallbackUser.id,
        seoTitle: "Pelayanan Jemput Bola Labuhan Maringgai | Disdukcapil",
        seoDesc: "Disdukcapil Lampung Timur gelar pelayanan jemput bola (Jebol) di wilayah pesisir Labuhan Maringgai untuk permudah adminduk warga.",
        seoKeywords: "Jemput Bola, Labuhan Maringgai, Disdukcapil Lamtim, Pelayanan Pesisir",
        category: "Pelayanan Publik",
        tags: "Pelayanan,Jebol,Pesisir,Gratis",
        coverImage: "/images/foto_kegiatan/kantor_luar.avif",
        createdAt: new Date("2026-01-05T10:00:00Z"), // Date from user's list
        updatedAt: new Date("2026-01-05T10:00:00Z")
      },
    });

    console.log('Seeded successfully with Quill format:', news.title);
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
