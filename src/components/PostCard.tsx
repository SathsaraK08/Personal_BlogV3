import Link from 'next/link';

interface Props {
  post: { id: string; title: string; slug: string; excerpt?: string | null; coverImageUrl?: string | null };
}

export function PostCard({ post }: Props) {
  return (
    <article className="rounded-lg border p-4">
      {post.coverImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.coverImageUrl} alt={post.title} className="mb-3 h-40 w-full rounded object-cover" />
      ) : null}
      <h2 className="mb-2 line-clamp-2 text-lg font-semibold">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      {post.excerpt ? <p className="line-clamp-3 text-sm text-gray-600">{post.excerpt}</p> : null}
    </article>
  );
}









