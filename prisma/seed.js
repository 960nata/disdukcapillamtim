const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@disdukcapil.com' },
    update: {},
    create: {
      email: 'admin@disdukcapil.com',
      name: 'Indra Gandi',
      password: 'password123',
      role: 'Superadmin',
      status: 'Aktif',
    },
  })
  console.log('Seeded admin user:', admin)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
