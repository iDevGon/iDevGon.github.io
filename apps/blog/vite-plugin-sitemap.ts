import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

const BASE_URL = 'https://idevgon.github.io';

const STATIC_ROUTES = ['/', '/articles'];

export function sitemapPlugin(): Plugin {
  return {
    name: 'vite-plugin-sitemap',
    closeBundle() {
      const articlesDir = path.resolve(__dirname, 'src/articles');
      const articleIds: string[] = [];

      if (fs.existsSync(articlesDir)) {
        const files = fs.readdirSync(articlesDir);
        for (const file of files) {
          if (file.endsWith('.md')) {
            articleIds.push(file.replace('.md', ''));
          }
        }
      }

      const today = new Date().toISOString().split('T')[0];

      const urls = [
        ...STATIC_ROUTES.map(
          (route) => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
        ),
        ...articleIds.map(
          (id) => `  <url>
    <loc>${BASE_URL}/articles/detail/${id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`,
        ),
      ];

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

      const distDir = path.resolve(__dirname, 'dist');
      if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
      }
      fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), sitemap);
    },
  };
}
