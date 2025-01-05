# Tyler Newman's Blog

> A personal blog built with Next.js, featuring a modern design, internationalization, and a great writing experience.

<p align="center">
  <a href="https://tylerjnewman.com">
    <img alt="preview" src="./apps/web/public/og.jpg" width="100%">
  </a>
</p>

## 🎉 Features

- ✍️ Blog
  - 📚 Categories (Engineering, Product, Thoughts)
  - 🔖 Tags
  - 📟 Pagination
  - ⏱️ Reading time estimation
  - 🧬 Dynamic OG images for blog posts
- 🌎 Internationalization
  - 🇺🇸 English
  - 🇧🇷 Portuguese
- 💬 MDX Support
- 🎨 Modern Design
  - 🌓 Dark/Light mode
  - 💅 Tailwind CSS
  - 🧱 Shadcn/ui components
  - 📐 Responsive layout
- 🔍 SEO Optimized
- 🚀 Built with
  - Next.js 14
  - React 18
  - TypeScript
  - Contentlayer
  - next-intl

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/TylerJNewman/blog.git
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Writing Content

Blog posts are written in MDX and stored in the `content/blog` directory. Each post should include frontmatter with the following fields:

```yaml
---
title: Your Post Title
excerpt: A brief description of your post
date: YYYY-MM-DD
tags: [tag1, tag2]
author:
  name: Your Name
  site: https://yoursite.com
---
```

## 🏗️ Deployment

The site is deployed on Vercel. For deployment:

1. Push to the main branch
2. Set the root directory to `apps/web` in Vercel
3. Vercel will automatically build and deploy the site

## 📄 License

Licensed under the MIT license.
