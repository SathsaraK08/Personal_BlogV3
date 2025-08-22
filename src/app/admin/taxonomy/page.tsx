"use client";
import { useEffect, useState } from 'react';

export default function TaxonomyPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');

  async function load() {
    const [c, t] = await Promise.all([
      fetch('/api/categories').then((r) => r.json()),
      fetch('/api/tags').then((r) => r.json()),
    ]);
    setCategories(c);
    setTags(t);
  }

  useEffect(() => { load(); }, []);

  async function addCategory() {
    await fetch('/api/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: newCategory }) });
    setNewCategory('');
    load();
  }
  async function addTag() {
    await fetch('/api/tags', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: newTag }) });
    setNewTag('');
    load();
  }

  return (
    <div className="py-8">
      <h1 className="mb-4 text-2xl font-bold">Categories & Tags</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <h2 className="mb-2 font-semibold">Categories</h2>
          <div className="mb-3 flex items-center space-x-2">
            <input className="w-full rounded border px-3 py-2" placeholder="New category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
            <button className="rounded bg-black px-3 py-2 text-white" onClick={addCategory}>Add</button>
          </div>
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c.id} className="flex items-center justify-between rounded border p-2 text-sm">
                <span>{c.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-2 font-semibold">Tags</h2>
          <div className="mb-3 flex items-center space-x-2">
            <input className="w-full rounded border px-3 py-2" placeholder="New tag" value={newTag} onChange={(e) => setNewTag(e.target.value)} />
            <button className="rounded bg-black px-3 py-2 text-white" onClick={addTag}>Add</button>
          </div>
          <ul className="space-y-2">
            {tags.map((t) => (
              <li key={t.id} className="flex items-center justify-between rounded border p-2 text-sm">
                <span>{t.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}









