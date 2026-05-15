const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.news.deleteMany({
      where: {
        slug: {
          startsWith: 'berita-otomatis-'
        }
      }
    });
    console.log(`=== Sukses Menghapus ${result.count} Berita Otomatis! ===`);
  } catch (error) {
    console.error('Delete error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
