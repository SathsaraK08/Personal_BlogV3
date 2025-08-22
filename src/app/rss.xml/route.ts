import { prisma } from '@/lib/prisma';

export async function GET() {
  const base = process.env.SITE_URL || 'http://localhost:3000';
  const posts = await prisma.post.findMany({ where: { published: true }, orderBy: { publishedAt: 'desc' } });
  const items = posts
    .map(
      (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${base}/blog/${p.slug}</link>
      <guid>${base}/blog/${p.slug}</guid>
      <pubDate>${p.publishedAt?.toUTCString() ?? new Date().toUTCString()}</pubDate>
      <description><![CDATA[${p.excerpt ?? ''}]]></description>
    </item>
  `,
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>SEO Blog CMS</title>
      <link>${base}</link>
      <description>RSS feed</description>
      ${items}
    </channel>
  </rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}









