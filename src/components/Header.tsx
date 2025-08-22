"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { useSiteSettings } from './ThemeProvider';

export default function Header() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const { settings } = useSiteSettings();
  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (query) router.push(`/search?q=${encodeURIComponent(query)}`);
  }
  return (
    <header className="flex items-center justify-between border-b border-gray-200 py-6 dark:border-gray-700">
      <Link href="/" className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
        {settings.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={settings.logoUrl} alt="Logo" className="h-8 w-auto" />
        ) : null}
        <span>{settings.siteTitle || 'SEO Blog CMS'}</span>
      </Link>
      <nav className="hidden gap-6 sm:flex">
        <Link href="/blog" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
          Latest
        </Link>
        <Link href="/category/news" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
          News
        </Link>
        <Link href="/category/reviews" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
          Reviews
        </Link>
        <Link href="/category/features" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
          Features
        </Link>
      </nav>
      <div className="flex items-center gap-3">
        <form onSubmit={onSearch} className="flex items-center gap-2">
          <input 
            value={q} 
            onChange={(e) => setQ(e.target.value)} 
            className="h-9 w-40 rounded border border-gray-300 px-3 text-sm bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400" 
            placeholder="Search" 
          />
          <button className="btn-primary h-9 rounded px-3 text-sm text-white hover:opacity-90">
            Go
          </button>
        </form>
        <ThemeToggle />
      </div>
    </header>
  );
}


