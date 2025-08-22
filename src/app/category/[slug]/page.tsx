import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params, searchParams }: { params: { slug: string }, searchParams?: { page?: string } }) {
  const category = await prisma.category.findUnique({ where: { slug: params.slug } });
  if (!category) return notFound();
  const pageSize = 10;
  const page = Math.max(1, Number(searchParams?.page || 1));
  const [total, posts] = await Promise.all([
    prisma.post.count({ where: { categoryId: category.id, published: true } }),
    prisma.post.findMany({
      where: { categoryId: category.id, published: true },
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="py-8">
      <h1 className="mb-2 text-3xl font-bold">{category.name}</h1>
      {category.description ? (
        <p className="mb-6 text-gray-600 dark:text-gray-400">{category.description}</p>
      ) : null}
      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.id}>
            <Link href={`/blog/${p.slug}`} className="text-lg font-medium">{p.title}</Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex items-center justify-between">
        <Link
          aria-disabled={page <= 1}
          className={`rounded border px-3 py-2 ${page <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
          href={`/category/${params.slug}?page=${page - 1}`}
        >
          Previous
        </Link>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Page {page} of {totalPages}
        </div>
        <Link
          aria-disabled={page >= totalPages}
          className={`rounded border px-3 py-2 ${page >= totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
          href={`/category/${params.slug}?page=${page + 1}`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}








