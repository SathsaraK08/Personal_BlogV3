import Link from 'next/link';

export default function HeroGrid({ posts }: { posts: Array<{ id: string; title: string; slug: string; coverImageUrl?: string | null; excerpt?: string | null }> }) {
  const [first, ...rest] = posts;
  if (!first) return null;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Link href={`/blog/${first.slug}`} className="relative col-span-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {first.coverImageUrl && <img src={first.coverImageUrl} alt={first.title} className="h-80 w-full rounded object-cover" />}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          <h2 className="text-2xl font-bold">{first.title}</h2>
          {first.excerpt && <p className="line-clamp-2 text-sm opacity-90">{first.excerpt}</p>}
        </div>
      </Link>
      <div className="grid grid-cols-1 gap-4">
        {rest.slice(0, 3).map((p) => (
          <article key={p.id} className="rounded border p-3">
            <h3 className="mb-1 line-clamp-2 font-semibold"><Link href={`/blog/${p.slug}`}>{p.title}</Link></h3>
            {p.excerpt && <p className="line-clamp-2 text-sm text-gray-600">{p.excerpt}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}









