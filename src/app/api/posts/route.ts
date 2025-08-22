import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, slug, excerpt, content } = body;
  if (!title || !slug || !content) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  const readingTime = estimateReadingTime(content);
  const post = await prisma.post.create({ data: { title, slug, excerpt, content, readingTime, published: false, author: { connect: { id: (await prisma.user.findFirst())?.id || (await prisma.user.create({ data: { email: `admin@local`, passwordHash: '', role: 'ADMIN' } })).id } } } });
  return NextResponse.json(post);
}

export async function GET() {
  const posts = await prisma.post.findMany({ orderBy: { updatedAt: 'desc' } });
  return NextResponse.json(posts);
}


