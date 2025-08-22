import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.SITE_URL || 'http://localhost:3000';
  const posts = await prisma.post.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } });
  const postUrls = posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.updatedAt }));
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },
    ...postUrls,
  ];
}









