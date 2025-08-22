import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import HeroGrid from '@/components/HeroGrid';
import { PostCard } from '@/components/PostCard';

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: 6,
    select: { id: true, title: true, slug: true, excerpt: true, coverImageUrl: true, publishedAt: true },
  });

  return (
    <div className="py-8">
      <section className="mb-10">
        <HeroGrid posts={posts.slice(0, 4)} />
      </section>

      <section>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}


