import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: 'desc' },
    select: { id: true, title: true, slug: true, published: true, updatedAt: true },
  });

  return (
    <div className="py-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link href="/admin/posts/new" className="rounded bg-black px-3 py-2 text-white">New Post</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left">Title</th>
              <th className="px-3 py-2 text-left">Slug</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Updated</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="px-3 py-2">{p.title}</td>
                <td className="px-3 py-2">{p.slug}</td>
                <td className="px-3 py-2">{p.published ? 'Published' : 'Draft'}</td>
                <td className="px-3 py-2">{new Date(p.updatedAt).toLocaleString()}</td>
                <td className="px-3 py-2">
                  <Link href={`/admin/posts/${p.id}`} className="text-blue-600">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}









