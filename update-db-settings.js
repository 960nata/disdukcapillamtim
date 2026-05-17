const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const settingsData = [
    { key: 'whatsapp', value: '+62 812-7238-8818' },
    { key: 'phone', value: '+62 812-7238-8818' },
    { key: 'instagram', value: 'https://www.instagram.com/disdukcapillamtim/' },
    { key: 'tiktok', value: 'https://www.tiktok.com/@dukcapillamtim' },
    { key: 'email', value: 'disdukcapillamtim45@gmail.com' }
  ];

  for (const item of settingsData) {
    await prisma.setting.upsert({
      where: { key: item.key },
      update: { value: item.value },
      create: { key: item.key, value: item.value }
    });
    console.log(`Successfully upserted setting: ${item.key} -> ${item.value}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
