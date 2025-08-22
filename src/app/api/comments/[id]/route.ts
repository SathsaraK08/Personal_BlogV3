import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const updated = await prisma.comment.update({ where: { id: params.id }, data: { approved: !!body.approved } });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await prisma.comment.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}









