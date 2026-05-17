const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const basePrograms = [
  {
    name: 'PUAKHI',
    desc: 'Jemput bola aktivasi dan sosialisasi Identitas Kependudukan Digital (IKD) langsung ke desa-desa seluruh Lampung Timur.',
    status: 'Aktif',
    image: '/images/inovasi/puakhi.avif',
    url: '#',
  },
  {
    name: 'PLESIR DJAUH',
    desc: 'Penerbitan dokumen kependudukan bagi masyarakat desa terpencil yang jauh dari ibukota kabupaten atau di wilayah perbatasan.',
    status: 'Aktif',
    image: '/images/inovasi/plesir_djauh.avif',
    url: '#',
  },
  {
    name: 'LAMTIM CERIA',
    desc: 'Cetak rekam KIA terintegrasi bekerjasama dengan sekolah, PAUD, dan TK seluruh Kabupaten Lampung Timur.',
    status: 'Aktif',
    image: '/images/inovasi/lamtim_ceria.avif',
    url: '#',
  },
  {
    name: 'SILAMTIM BERJAYA',
    desc: 'Platform layanan online administrasi kependudukan — urus semua dokumen dari mana saja tanpa antre di kantor.',
    status: 'Aktif',
    image: '/images/inovasi/silamtim_berjaya.avif',
    url: '#',
  },
  {
    name: 'PALING MANTAB',
    desc: 'Layanan daring terintegrasi bersama BPJS Kesehatan — terbitkan akta lahir dan daftar BPJS dalam satu layanan.',
    status: 'Aktif',
    image: '/images/inovasi/paling_mantab.avif',
    url: '#',
  },
  {
    name: 'ISBATH NIKAH TERPADU',
    desc: 'Kolaborasi Pemkab, Pengadilan Agama & Kemenag — sidang isbath, buku nikah, KTP dan KK diterbitkan dalam satu hari.',
    status: 'Aktif',
    image: '/images/inovasi/isbath_nikah.avif',
    url: '#',
  },
];

async function main() {
  console.log('Seeding innovations...');
  for (const prog of basePrograms) {
    const item = await prisma.innovation.create({
      data: {
        name: prog.name,
        desc: prog.desc,
        status: prog.status,
        image: prog.image,
        url: prog.url,
      },
    });
    console.log('Seeded innovation:', item.name);
  }
  console.log('Seeding finished successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
