# Project Plan: Enterprise-Grade CMS Blog Platform

This document outlines the phased implementation plan for building a modern, scalable CMS-powered blog inspired by TechCrunch, The Verge, Dev.to, and the Saara WP Blog Theme.

## Architecture Overview
- **Monorepo** with `apps/frontend` (Next.js + TailwindCSS) and `apps/backend` (NestJS + Prisma + PostgreSQL).
- Shared packages for `types`, `dtos`, `utils`, `config`, `logging`, and `errors`.
- REST API initially; architecture prepared for future GraphQL adoption.

## Phase Breakdown

### Phase 1: Auth + Admin
- Set up monorepo structure and initialize frontend and backend apps.
- Implement JWT authentication with roles: Admin, Editor, Contributor.
- Basic admin dashboard accessible at `/admin` with sidebar and top bar layout.
- Rate limiting (5 attempts/min, 15-minute lockout) and placeholders for MFA.

### Phase 2: Posts + Editor
- Rich text WYSIWYG editor with formatting, lists, quotes, code blocks, and media uploads (images, videos, YouTube embeds).
- Post management: draft, publish, schedule.
- CRUD for posts, categories, tags, and media library.

### Phase 3: SEO + Monetization
- URL structure `/category/post-slug`.
- Custom meta tags, JSON-LD structured data, auto-generation of `sitemap.xml` and `robots.txt`.
- Monetization integrations: Google AdSense, affiliate links, product embeds, and newsletter signup.

### Phase 4: User System
- User accounts with profile page (avatar, bio, social links).
- Settings: change email, password, username; profile image upload with cropping and border options.
- User actions: comment, like, bookmark, share (Twitter, Facebook, LinkedIn, WhatsApp).

### Phase 5: Theme Editor
- Admin theme editor for color schemes, font management, logo upload, and image management.
- Dark/light mode toggle with responsive design.

### Phase 6: Analytics
- Dashboard charts (line and bar) for views, engagement, user growth, and revenue.

## Deployment
- Dockerized deployment targeting Ubuntu (Oracle free tier) with future support for AWS/Azure/GCP.

## Performance & Security
- Input sanitization, XSS and SQL injection protection.
- Image optimization using Sharp with defined quality and compression settings.
- Lighthouse score target of 90+.
