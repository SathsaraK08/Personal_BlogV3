"use client";
import { useState } from 'react';
import { useSiteSettings } from './ThemeProvider';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const { settings } = useSiteSettings();
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/subscribers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
    if (res.ok) setDone(true);
  }
  return (
    <footer className="border-t border-gray-200 py-12 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">Subscribe to our newsletter</h3>
        {done ? (
          <p className="mt-2 text-green-600 dark:text-green-400">Thanks for subscribing!</p>
        ) : (
          <form onSubmit={onSubmit} className="mt-2 flex gap-2">
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="h-10 w-64 rounded border border-gray-300 px-3 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400" 
              placeholder="you@example.com" 
            />
            <button className="btn-secondary h-10 rounded px-4 text-white hover:opacity-90 dark:text-gray-900">
              Subscribe
            </button>
          </form>
        )}
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {settings.siteTitle || 'SEO Blog CMS'} · All rights reserved.</p>
        <div className="flex gap-4 text-sm">
          <a href="/about" className="hover:text-gray-900 dark:hover:text-white">About</a>
          <a href="/contact" className="hover:text-gray-900 dark:hover:text-white">Contact</a>
          <a href="/privacy" className="hover:text-gray-900 dark:hover:text-white">Privacy</a>
          <a href="/terms" className="hover:text-gray-900 dark:hover:text-white">Terms</a>
        </div>
      </div>
    </footer>
  );
}


