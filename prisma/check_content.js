const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const news = await prisma.news.findUnique({
    where: { id: 134 },
    select: { content: true }
  });
  console.log(news.content);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
