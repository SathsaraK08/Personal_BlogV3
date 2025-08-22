import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });
  if (!post) return {};
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt || undefined,
      images: post.coverImageUrl ? [post.coverImageUrl] : [],
      type: 'article',
    },
  } as any;
}

export default async function BlogPostPage({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: { author: true, tags: true, category: true },
  });
  if (!post || !post.published) return notFound();
  await prisma.post.update({ where: { id: post.id }, data: { views: { increment: 1 } } });

  return (
    <article className="prose prose-zinc max-w-none py-8">
      <h1>{post.title}</h1>
      {post.coverImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.coverImageUrl} alt={post.alt || post.title} />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            datePublished: post.publishedAt || undefined,
            image: post.coverImageUrl ? [post.coverImageUrl] : undefined,
            author: post.author?.name || 'Author',
            keywords: post.metaKeywords || undefined,
          }),
        }}
      />
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {post.content}
      </ReactMarkdown>
      <AdSlot className="my-8" />
      <hr />
      <section>
        <h3>Tags</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Link key={t.id} href={`/tag/${t.slug}`} className="rounded bg-gray-100 px-2 py-1 text-xs">#{t.name}</Link>
          ))}
        </div>
      </section>
      <section className="mt-8">
        <h3>Comments</h3>
        {/* Simple comments UI */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <form action="/api/comments" method="post" className="mt-2 space-y-2">
          <input type="hidden" name="slug" value={post.slug} />
          <input name="authorEmail" type="email" placeholder="you@example.com" className="w-full rounded border px-3 py-2" required />
          <textarea name="content" placeholder="Write a comment" className="w-full rounded border px-3 py-2" rows={4} required />
          <button className="rounded bg-black px-4 py-2 text-white">Submit</button>
        </form>
        <p className="mt-2 text-xs text-gray-500">Comments are held for moderation.</p>
      </section>
    </article>
  );
}


