import Link from 'next/link';

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q || '').trim();
  const results = q ? await fetch(`${process.env.SITE_URL || 'http://localhost:3000'}/api/search?q=${encodeURIComponent(q)}`, { cache: 'no-store' }).then((r) => r.json()) : [];
  return (
    <div className="py-8">
      <h1 className="mb-4 text-2xl font-bold">Search</h1>
      {q ? <p className="mb-6 text-sm text-gray-600">Results for “{q}”</p> : <p className="text-sm text-gray-600">Type in the search bar above.</p>}
      <ul className="space-y-4">
        {results.map((r: any) => (
          <li key={r.id}>
            <Link href={`/blog/${r.slug}`} className="text-lg font-medium">{r.title}</Link>
            {r.excerpt && <p className="text-sm text-gray-600">{r.excerpt}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}









