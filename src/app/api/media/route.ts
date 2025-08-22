import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const items = await prisma.media.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const files = formData.getAll('file');
  if (!files?.length) return NextResponse.json({ error: 'No files' }, { status: 400 });
  // Demo storage: convert to base64 data URLs. Replace with S3/Supabase in production.
  const created = [] as any[];
  for (const file of files as File[]) {
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const mime = file.type || 'application/octet-stream';
    const url = `data:${mime};base64,${base64}`;
    const media = await prisma.media.create({ data: { url, type: mime, title: file.name } });
    created.push(media);
  }
  return NextResponse.json(created);
}









