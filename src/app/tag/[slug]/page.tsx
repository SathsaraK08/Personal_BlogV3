import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function TagPage({ params }: { params: { slug: string } }) {
  const tag = await prisma.tag.findUnique({ where: { slug: params.slug }, include: { posts: true } });
  if (!tag) return notFound();
  const posts = await prisma.post.findMany({
    where: { tags: { some: { id: tag.id } }, published: true },
    orderBy: { publishedAt: 'desc' },
  });
  return (
    <div className="py-8">
      <h1 className="mb-6 text-3xl font-bold">#{tag.name}</h1>
      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.id}>
            <Link href={`/blog/${p.slug}`} className="text-lg font-medium">{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}









