"use client";
import { useEffect, useState } from 'react';

export default function AdminCommentsPage() {
  const [items, setItems] = useState<any[]>([]);
  async function load() {
    const res = await fetch('/api/comments/moderate');
    const data = await res.json();
    setItems(data);
  }
  useEffect(() => { load(); }, []);
  async function approve(id: string) {
    await fetch(`/api/comments/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ approved: true }) });
    load();
  }
  async function remove(id: string) {
    await fetch(`/api/comments/${id}`, { method: 'DELETE' });
    load();
  }
  return (
    <div className="py-8">
      <h1 className="mb-4 text-2xl font-bold">Comments Moderation</h1>
      <ul className="space-y-3">
        {items.map((c) => (
          <li key={c.id} className="rounded border p-3">
            <div className="text-sm text-gray-600">Post: {c.post?.title}</div>
            <p className="my-1">{c.content}</p>
            <div className="space-x-2 text-sm">
              <button onClick={() => approve(c.id)} className="rounded bg-black px-3 py-1 text-white">Approve</button>
              <button onClick={() => remove(c.id)} className="rounded border border-red-600 px-3 py-1 text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}









