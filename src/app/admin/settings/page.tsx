"use client";

import { useEffect, useState } from 'react';

type Settings = {
  siteTitle?: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  themeDefault?: 'light' | 'dark' | 'system';
  adsEnabled?: 'true' | 'false';
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({ themeDefault: 'system', adsEnabled: 'false' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => setSettings((s) => ({ ...s, ...data })))
      .catch(() => {});
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      setMessage('Saved');
    } catch {
      setMessage('Failed to save');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl py-6">
      <h1 className="mb-6 text-2xl font-bold">Site Settings</h1>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="mb-1 block text-sm font-medium">Site Title</label>
          <input
            className="w-full rounded border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-800"
            value={settings.siteTitle || ''}
            onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
            id="siteTitle"
            placeholder="My Awesome Blog"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Logo URL</label>
          <input
            className="w-full rounded border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-800"
            value={settings.logoUrl || ''}
            onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
            id="logoUrl"
            placeholder="https://..."
          />
          {settings.logoUrl ? (
            <img src={settings.logoUrl} alt="Logo" className="mt-2 h-12 w-auto" />
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Primary Color</label>
            <input
              type="color"
              className="h-10 w-full cursor-pointer rounded border border-gray-300 bg-white p-1 dark:border-gray-600 dark:bg-gray-800"
              value={settings.primaryColor || '#2563eb'}
              onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
              id="primaryColor"
              title="Primary Color"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Secondary Color</label>
            <input
              type="color"
              className="h-10 w-full cursor-pointer rounded border border-gray-300 bg-white p-1 dark:border-gray-600 dark:bg-gray-800"
              value={settings.secondaryColor || '#10b981'}
              onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
              id="secondaryColor"
              title="Secondary Color"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Font Family</label>
          <select
            className="w-full rounded border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-800"
            value={settings.fontFamily || 'inter'}
            onChange={(e) => setSettings({ ...settings, fontFamily: e.target.value })}
            id="fontFamily"
            title="Font Family"
          >
            <option value="inter">Inter</option>
            <option value="system-ui">System UI</option>
            <option value="georgia">Georgia</option>
            <option value="mono">Mono</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Default Theme</label>
          <select
            className="w-full rounded border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-800"
            value={settings.themeDefault || 'system'}
            onChange={(e) => setSettings({ ...settings, themeDefault: e.target.value as Settings['themeDefault'] })}
            id="themeDefault"
            title="Default Theme"
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="adsEnabled"
            type="checkbox"
            checked={(settings.adsEnabled || 'false') === 'true'}
            onChange={(e) => setSettings({ ...settings, adsEnabled: e.target.checked ? 'true' : 'false' })}
          />
          <label htmlFor="adsEnabled" className="text-sm">Enable Ads</label>
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={saving}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
          {message ? <span className="text-sm text-gray-500">{message}</span> : null}
        </div>
      </form>
    </div>
  );
}


