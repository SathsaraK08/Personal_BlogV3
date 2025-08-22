import { ReactNode } from 'react';
import Link from 'next/link';
import "../globals.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <section className="grid grid-cols-1 gap-0 md:grid-cols-[240px_1fr]">
      <aside className="min-h-screen border-r border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-6 text-lg font-semibold">Admin</div>
        <nav className="flex flex-col gap-2 text-sm">
          <Link className="rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href="/admin">Dashboard</Link>
          <Link className="rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href="/admin/posts">Posts</Link>
          <Link className="rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href="/admin/media">Media</Link>
          <Link className="rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href="/admin/taxonomy">Categories</Link>
          <Link className="rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href="/admin/comments">Comments</Link>
        </nav>
      </aside>
      <div>
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">Admin Dashboard</div>
          <a href="/api/auth/signout" className="text-sm underline">Logout</a>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </section>
  );
}





