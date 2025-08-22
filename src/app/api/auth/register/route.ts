import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    if (!email || !password) return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: 'Email already registered' }, { status: 409 });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, name: name || null, passwordHash, role: 'CONTRIBUTOR' } });
    return NextResponse.json({ id: user.id, email: user.email, role: user.role });
  } catch (e) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}




