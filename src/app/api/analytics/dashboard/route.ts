import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [totalPosts, totalViews, totalComments, totalSubscribers, recentPosts] = await Promise.all([
      prisma.post.count(),
      prisma.post.aggregate({ _sum: { views: true } }),
      prisma.comment.count(),
      prisma.subscriber.count(),
      prisma.post.findMany({
        where: { published: true },
        orderBy: { publishedAt: 'desc' },
        take: 5,
        select: { id: true, title: true, views: true, publishedAt: true },
      }),
    ]);

    return NextResponse.json({
      totalPosts,
      totalViews: totalViews._sum.views || 0,
      totalComments,
      totalSubscribers,
      recentPosts,
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Failed to load analytics' }, { status: 500 });
  }
}







