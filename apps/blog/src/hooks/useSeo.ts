import { useEffect } from 'react';

const SITE_NAME = "DevGon's Log";
const BASE_URL = 'https://idevgon.github.io';
const DEFAULT_IMAGE =
  'https://avatars.githubusercontent.com/u/106735547?v=4';

interface SeoOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    author?: string;
    tags?: string[];
  };
}

function setMetaTag(
  attr: 'name' | 'property',
  key: string,
  content: string,
) {
  let el = document.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (el) {
    el.setAttribute('content', content);
  } else {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    el.setAttribute('content', content);
    document.head.appendChild(el);
  }
}

function setCanonical(url: string) {
  let el = document.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (el) {
    el.href = url;
  } else {
    el = document.createElement('link');
    el.rel = 'canonical';
    el.href = url;
    document.head.appendChild(el);
  }
}

function removeMetaTag(attr: 'name' | 'property', key: string) {
  document
    .querySelector(`meta[${attr}="${key}"]`)
    ?.remove();
}

export function useSeo({
  title,
  description,
  noindex = false,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  article,
}: SeoOptions) {
  useEffect(() => {
    const fullTitle =
      title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
    const url = `${BASE_URL}${path}`;

    document.title = fullTitle;

    setMetaTag('name', 'description', description);
    setCanonical(url);

    if (noindex) {
      setMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      removeMetaTag('name', 'robots');
    }

    // Open Graph
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:type', type);

    // Twitter
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);

    // Article-specific
    if (type === 'article' && article) {
      if (article.publishedTime) {
        setMetaTag(
          'property',
          'article:published_time',
          article.publishedTime,
        );
      }
      if (article.author) {
        setMetaTag('property', 'article:author', article.author);
      }
      article.tags?.forEach((tag) => {
        setMetaTag('property', 'article:tag', tag);
      });
    }

    return () => {
      removeMetaTag('property', 'article:published_time');
      removeMetaTag('property', 'article:author');
      removeMetaTag('property', 'article:tag');
    };
  }, [title, description, noindex, path, image, type, article]);
}
