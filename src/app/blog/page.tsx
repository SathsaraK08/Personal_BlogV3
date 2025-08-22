import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function BlogIndexPage({ searchParams }: { searchParams: { page?: string } }) {
  const pageSize = 9;
  const page = Math.max(1, Number(searchParams.page || '1'));
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      select: { id: true, title: true, slug: true, excerpt: true, coverImageUrl: true, publishedAt: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.post.count({ where: { published: true } }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="py-8">
      <h1 className="mb-6 text-3xl font-bold">Blog</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="rounded-lg border p-4">
            <h2 className="mb-2 text-2xl font-semibold">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-700">{post.excerpt}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-center gap-2">
        <Link href={`/blog?page=${Math.max(1, page - 1)}`} className={`rounded border px-3 py-2 text-sm ${page <= 1 ? 'pointer-events-none opacity-50' : ''}`}>Prev</Link>
        <span className="text-sm">Page {page} of {totalPages}</span>
        <Link href={`/blog?page=${Math.min(totalPages, page + 1)}`} className={`rounded border px-3 py-2 text-sm ${page >= totalPages ? 'pointer-events-none opacity-50' : ''}`}>Next</Link>
      </div>
    </div>
  );
}


