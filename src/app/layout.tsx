import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: {
    default: 'SEO Blog CMS',
    template: '%s | SEO Blog CMS',
  },
  description: 'A modern, SEO-focused blog platform with an integrated CMS.',
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    title: 'SEO Blog CMS',
    siteName: 'SEO Blog CMS',
  },
};

async function getSiteSettings(): Promise<Record<string, string>> {
  const rows = await prisma.siteSettings.findMany();
  const out: Record<string, string> = {};
  for (const r of rows) out[r.key] = r.value;
  return out;
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const initialSettings = await getSiteSettings();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-gray-100">
        <ThemeProvider initialSettings={initialSettings}>
          <div className="mx-auto max-w-5xl px-4">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}


