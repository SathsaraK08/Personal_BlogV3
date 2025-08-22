import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

export default async function AdminDashboardPage() {
  const [postsCount, usersCount, mediaCount] = await Promise.all([
    prisma.post.count(),
    prisma.user.count(),
    prisma.media.count(),
  ]);

  return (
    <div className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Link className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" href="/admin/posts/new">
            New Post
          </Link>
          <Link className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700" href="/admin/settings">
            Settings
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Posts</div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">{postsCount}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Users</div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">{usersCount}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Media</div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">{mediaCount}</div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Analytics</h2>
        <AnalyticsDashboard />
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link 
            href="/admin/posts" 
            className="flex items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <div className="mr-3 h-8 w-8 rounded bg-blue-100 dark:bg-blue-900"></div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Manage Posts</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Create and edit content</div>
            </div>
          </Link>
          <Link 
            href="/admin/media" 
            className="flex items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <div className="mr-3 h-8 w-8 rounded bg-green-100 dark:bg-green-900"></div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Media Library</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Upload and manage files</div>
            </div>
          </Link>
          <Link 
            href="/admin/taxonomy" 
            className="flex items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <div className="mr-3 h-8 w-8 rounded bg-yellow-100 dark:bg-yellow-900"></div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Categories & Tags</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Organize content</div>
            </div>
          </Link>
          <Link 
            href="/admin/comments" 
            className="flex items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <div className="mr-3 h-8 w-8 rounded bg-purple-100 dark:bg-purple-900"></div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Comments</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Moderate discussions</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}


