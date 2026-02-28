import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

const BASE_URL = 'https://idevgon.github.io';
const SITE_NAME = "DevGon's Log";
const DEFAULT_IMAGE =
  'https://avatars.githubusercontent.com/u/106735547?v=4';

interface Frontmatter {
  title: string;
  description?: string;
  author?: string;
  date?: string;
  tags?: string[];
}

function parseFrontmatter(content: string): Frontmatter | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const raw = match[1];
  const fm: Record<string, unknown> = {};

  let currentKey = '';
  let inArray = false;
  const arrayValues: string[] = [];

  for (const line of raw.split('\n')) {
    if (inArray) {
      const itemMatch = line.match(/^\s+-\s+(.+)/);
      if (itemMatch) {
        arrayValues.push(itemMatch[1].trim());
        continue;
      } else {
        fm[currentKey] = [...arrayValues];
        arrayValues.length = 0;
        inArray = false;
      }
    }

    const kvMatch = line.match(/^(\w+):\s*(.*)/);
    if (kvMatch) {
      currentKey = kvMatch[1];
      const value = kvMatch[2].trim();
      if (value === '') {
        inArray = true;
      } else {
        fm[currentKey] = value;
      }
    }
  }

  if (inArray) {
    fm[currentKey] = [...arrayValues];
  }

  return fm as unknown as Frontmatter;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildMetaTags(articleId: string, fm: Frontmatter): string {
  const title = `${fm.title} | ${SITE_NAME}`;
  const description = fm.description ?? '';
  const url = `${BASE_URL}/articles/detail/${articleId}`;
  const image = DEFAULT_IMAGE;
  const author = fm.author ?? 'DevGon';
  const tags = fm.tags ?? [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: fm.title,
    description,
    datePublished: fm.date ?? '',
    url,
    author: { '@type': 'Person', name: author, url: BASE_URL },
    publisher: { '@type': 'Person', name: 'DevGon', url: BASE_URL },
    keywords: tags.join(', '),
    inLanguage: 'ko',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  const escapedTitle = escapeHtml(title);
  const escapedDesc = escapeHtml(description);

  const lines = [
    `<title>${escapedTitle}</title>`,
    `<meta name="description" content="${escapedDesc}">`,
    `<link rel="canonical" href="${url}">`,
    // Open Graph
    `<meta property="og:type" content="article">`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}">`,
    `<meta property="og:title" content="${escapedTitle}">`,
    `<meta property="og:description" content="${escapedDesc}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:locale" content="ko_KR">`,
    // Twitter Card
    `<meta name="twitter:card" content="summary">`,
    `<meta name="twitter:title" content="${escapedTitle}">`,
    `<meta name="twitter:description" content="${escapedDesc}">`,
    `<meta name="twitter:image" content="${image}">`,
    // Article meta
    ...(fm.date
      ? [`<meta property="article:published_time" content="${fm.date}">`]
      : []),
    `<meta property="article:author" content="${escapeHtml(author)}">`,
    ...tags.map(
      (tag) => `<meta property="article:tag" content="${escapeHtml(tag)}">`,
    ),
    // JSON-LD
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
  ];

  return lines.join('\n    ');
}

export function prerenderPlugin(): Plugin {
  return {
    name: 'vite-plugin-prerender',
    closeBundle() {
      const articlesDir = path.resolve(__dirname, 'src/articles');
      const distDir = path.resolve(__dirname, 'dist');
      const templatePath = path.resolve(distDir, 'index.html');

      if (!fs.existsSync(templatePath)) {
        console.warn('⚠ prerender: dist/index.html not found, skipping');
        return;
      }

      const template = fs.readFileSync(templatePath, 'utf-8');

      if (!fs.existsSync(articlesDir)) {
        console.warn('⚠ prerender: src/articles directory not found');
        return;
      }

      const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith('.md'));
      let count = 0;

      for (const file of files) {
        const articleId = file.replace('.md', '');
        const content = fs.readFileSync(
          path.resolve(articlesDir, file),
          'utf-8',
        );
        const fm = parseFrontmatter(content);

        if (!fm?.title) {
          console.warn(`⚠ prerender: skipping ${file} (no title in frontmatter)`);
          continue;
        }

        const metaTags = buildMetaTags(articleId, fm);

        // Replace <title> and existing meta tags in <head>
        let html = template;

        // Remove existing title, description, canonical, OG, Twitter tags
        html = html.replace(/\s*<title>[^<]*<\/title>/, '');
        html = html.replace(
          /\s*<meta name="description"[^>]*>/g,
          '',
        );
        html = html.replace(/\s*<link rel="canonical"[^>]*>/g, '');
        html = html.replace(
          /\s*<!-- Open Graph -->\n?/g,
          '',
        );
        html = html.replace(
          /\s*<meta property="og:[^"]*"[^>]*>/g,
          '',
        );
        html = html.replace(
          /\s*<!-- Twitter Card -->\n?/g,
          '',
        );
        html = html.replace(
          /\s*<meta name="twitter:[^"]*"[^>]*>/g,
          '',
        );

        // Insert new meta tags after the last <meta name="theme-color"> tag
        html = html.replace(
          /(<meta name="theme-color"[^>]*>)\n(\s*<link rel="preconnect")/,
          `$1\n    ${metaTags}\n$2`,
        );

        const outDir = path.resolve(
          distDir,
          'articles',
          'detail',
          articleId,
        );
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.resolve(outDir, 'index.html'), html);
        count++;
      }

      console.log(`✓ prerendered ${count} article page(s)`);
    },
  };
}
