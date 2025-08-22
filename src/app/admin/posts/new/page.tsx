"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, excerpt, content }),
    });
    if (res.ok) router.push('/admin/posts');
  }

  return (
    <div className="py-8">
      <h1 className="mb-4 text-2xl font-bold">New Post</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Title</label>
          <input className="w-full rounded border px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Slug</label>
          <input className="w-full rounded border px-3 py-2" value={slug} onChange={(e) => setSlug(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Excerpt</label>
          <textarea className="w-full rounded border px-3 py-2" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Content (Markdown)</label>
          <textarea rows={12} className="w-full rounded border px-3 py-2" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <button className="rounded bg-black px-4 py-2 text-white">Create</button>
      </form>
    </div>
  );
}









