const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const prisma = new PrismaClient();

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function main() {
  const users = await prisma.user.findMany();
  console.log("Found users:", users.map(u => ({ id: u.id, email: u.email, name: u.name })));
  
  if (users.length === 0) {
    console.log("No users found in database.");
    return;
  }
  
  const newPasswordHash = hashPassword('rumah123');
  
  for (const user of users) {
    await prisma.user.update({
      where: { id: user.id },
      data: { password: newPasswordHash }
    });
    console.log(`Updated password for ${user.email} to 'rumah123'`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
