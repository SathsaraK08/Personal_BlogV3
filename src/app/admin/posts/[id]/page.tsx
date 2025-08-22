"use client";
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [priority, setPriority] = useState<number>(0);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/posts/${id}`);
      const data = await res.json();
      setTitle(data.title || '');
      setSlug(data.slug || '');
      setExcerpt(data.excerpt || '');
      setContent(data.content || '');
      setPublished(!!data.published);
      setFeatured(!!data.featured);
      setPriority(Number(data.priority || 0));
      setMetaTitle(data.metaTitle || '');
      setMetaDescription(data.metaDescription || '');
      setMetaKeywords(data.metaKeywords || '');
      setLoading(false);
    }
    if (id) load();
  }, [id]);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, excerpt, content, published, featured, priority, metaTitle, metaDescription, metaKeywords }),
    });
    router.push('/admin/posts');
  }

  async function onDelete() {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    router.push('/admin/posts');
  }

  if (loading) return <div className="py-8">Loading…</div>;

  return (
    <div className="py-8">
      <h1 className="mb-4 text-2xl font-bold">Edit Post</h1>
      <form onSubmit={onSave} className="space-y-4">
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm">Meta Title</label>
            <input className="w-full rounded border px-3 py-2" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm">Meta Description</label>
            <input className="w-full rounded border px-3 py-2" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm">Meta Keywords (comma separated)</label>
            <input className="w-full rounded border px-3 py-2" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center space-x-2 text-sm">
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
            <span>Published</span>
          </label>
          <label className="flex items-center space-x-2 text-sm">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
            <span>Featured</span>
          </label>
          <label className="flex items-center space-x-2 text-sm">
            <span>Priority</span>
            <input type="number" className="w-24 rounded border px-2 py-1" value={priority} onChange={(e) => setPriority(Number(e.target.value))} />
          </label>
          <button type="submit" className="rounded bg-black px-4 py-2 text-white">Save</button>
          <button type="button" onClick={onDelete} className="rounded border border-red-600 px-4 py-2 text-red-600">Delete</button>
        </div>
      </form>
    </div>
  );
}


