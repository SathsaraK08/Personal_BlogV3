import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@example.com';
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return;
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.user.create({ data: { email, name: 'Admin', passwordHash, role: 'ADMIN' } });
  console.log('Seeded admin user:', email, 'password: admin123');
}

main().finally(async () => {
  await prisma.$disconnect();
});









