import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { slugify } from '@/lib/slugify';

export async function GET() {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const { name, description } = await request.json();
  if (!name) return NextResponse.json({ error: 'name required' }, { status: 400 });
  const category = await prisma.category.create({ data: { name, slug: slugify(name), description } });
  return NextResponse.json(category);
}








