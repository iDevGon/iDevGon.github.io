import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { buildMetaTags } from './prerender-utils';

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
      }
    },
  };
}
