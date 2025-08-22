import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { slugify } from '@/lib/slugify';

export async function GET() {
  const tags = await prisma.tag.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(tags);
}

export async function POST(request: Request) {
  const { name } = await request.json();
  if (!name) return NextResponse.json({ error: 'name required' }, { status: 400 });
  const tag = await prisma.tag.create({ data: { name, slug: slugify(name) } });
  return NextResponse.json(tag);
}









