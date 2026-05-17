const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const existingCount = await prisma.speech.count();
  if (existingCount > 0) {
    console.log("Speeches table already populated. Skipping seed.");
    return;
  }

  const speeches = [
    {
      name: "Ela Siti Nuryamah, S.Sos.",
      title: "Bupati Lampung Timur",
      quote: "Pelayanan publik yang cepat, transparan, dan membahagiakan adalah komitmen kami untuk seluruh warga Lampung Timur. Disdukcapil hadir untuk mempermudah urusan Anda.",
      image: "/images/pidato/pidato_1.avif"
    },
    {
      name: "Azwar Hadi, S.E., M.Si.",
      title: "Wakil Bupati Lampung Timur",
      quote: "Inovasi tiada henti dalam administrasi kependudukan adalah kunci mewujudkan Lampung Timur yang Berjaya. Kami siap melayani dengan sepenuh hati.",
      image: "/images/pidato/pidato_2.avif"
    }
  ];

  for (const s of speeches) {
    await prisma.speech.create({
      data: s
    });
    console.log(`Successfully seeded speech: ${s.name}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
