import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  let slug: string | undefined;
  let content: string | undefined;
  let authorEmail: string | undefined;
  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const body = await request.json();
    slug = body.slug;
    content = body.content;
    authorEmail = body.authorEmail;
  } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    const form = await request.formData();
    slug = String(form.get('slug') || '');
    content = String(form.get('content') || '');
    authorEmail = String(form.get('authorEmail') || '');
  }
  if (!slug || !content || !authorEmail) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  const author = await prisma.user.upsert({
    where: { email: authorEmail },
    update: {},
    create: { email: authorEmail },
  });
  const comment = await prisma.comment.create({ data: { content, postId: post.id, authorId: author.id } });
  return NextResponse.json(comment);
}


