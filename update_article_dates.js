const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const updates = [
      {
        slug: "puakhi-inovasi-jemput-bola-disdukcapil-lampung-timur-untuk-aktivasi-ikd",
        date: "2026-05-10T08:00:00Z"
      },
      {
        slug: "plesir-djauh-solusi-dokumen-kependudukan-untuk-warga-desa-terpencil",
        date: "2025-03-15T09:00:00Z"
      },
      {
        slug: "isbat-nikah-terpadu-disdukcapil-lamtim-berikan-legalitas-hukum-bagi-ratusan-pasangan",
        date: "2025-07-22T10:00:00Z"
      },
      {
        slug: "lamtim-ceria-upaya-disdukcapil-percepat-kepemilikan-kia-di-sekolah",
        date: "2025-09-05T08:30:00Z"
      },
      {
        slug: "silamtim-berjaya-layanan-adminduk-online-24-jam-tanpa-antre",
        date: "2024-01-10T07:45:00Z"
      },
      {
        slug: "program-paling-mantab-lahir-langsung-dapat-akta-dan-bpjs-kesehatan",
        date: "2024-06-20T11:20:00Z"
      },
      {
        slug: "disdukcapil-lamtim-terapkan-sistem-5-zona-pelayanan-untuk-pecah-antrean",
        date: "2024-11-15T14:00:00Z"
      },
      {
        slug: "raih-nilai-9508-dari-ombudsman-ri-disdukcapil-lamtim-masuk-zona-hijau",
        date: "2024-12-20T09:15:00Z"
      }
    ];

    for (const item of updates) {
      const exists = await prisma.news.findUnique({ where: { slug: item.slug } });
      if (exists) {
        const updated = await prisma.news.update({
          where: { slug: item.slug },
          data: { 
            createdAt: new Date(item.date),
            updatedAt: new Date(item.date) // Also update updatedAt to match
          }
        });
        console.log('Updated date for:', updated.title);
      } else {
        console.log('Slug not found:', item.slug);
      }
    }

    console.log('=== All dates adjusted successfully! ===');
  } catch (error) {
    console.error('Update error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
