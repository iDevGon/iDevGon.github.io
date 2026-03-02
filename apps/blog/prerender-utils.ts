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

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function buildMetaTags(articleId: string, fm: Frontmatter): string {
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
