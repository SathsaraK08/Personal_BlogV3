"use client";
import { useEffect, useState } from 'react';

export default function MediaLibraryPage() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [items, setItems] = useState<any[]>([]);

  async function load() {
    const res = await fetch('/api/media');
    const data = await res.json();
    setItems(data);
  }

  useEffect(() => { load(); }, []);

  async function onUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!files || files.length === 0) return;
    const form = new FormData();
    Array.from(files).forEach((f) => form.append('file', f));
    const res = await fetch('/api/media', { method: 'POST', body: form });
    if (res.ok) load();
  }

  return (
    <div className="py-8">
      <h1 className="mb-4 text-2xl font-bold">Media Library</h1>
      <form onSubmit={onUpload} className="mb-6 flex items-center space-x-3">
        <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
        <button className="rounded bg-black px-3 py-2 text-white">Upload</button>
      </form>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {items.map((m) => (
          <div className="rounded border p-2" key={m.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.url} alt={m.alt || m.title || ''} className="h-28 w-full rounded object-cover" />
            <div className="mt-1 truncate text-xs">{m.title || m.url}</div>
          </div>
        ))}
      </div>
    </div>
  );
}








