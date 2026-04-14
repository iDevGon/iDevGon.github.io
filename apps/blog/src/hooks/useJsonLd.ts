import { useEffect } from 'react';

const JSONLD_ID = 'json-ld-structured-data';

export function useJsonLd(data: Record<string, unknown>) {
  const serialized = JSON.stringify(data);

  useEffect(() => {
    let el = document.getElementById(JSONLD_ID) as HTMLScriptElement | null;
    if (el) {
      el.textContent = serialized;
    } else {
      el = document.createElement('script');
      el.id = JSONLD_ID;
      el.type = 'application/ld+json';
      el.textContent = serialized;
      document.head.appendChild(el);
    }

    return () => {
      document.getElementById(JSONLD_ID)?.remove();
    };
  }, [serialized]);
}

const BASE_URL = 'https://idevgon.github.io';

const WEB_SITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: "DevGon's Log",
      url: BASE_URL,
      description: '프론트엔드 개발자 DevGon의 기술 블로그',
      inLanguage: 'ko',
    },
    {
      '@type': 'Person',
      name: 'DevGon',
      url: BASE_URL,
      sameAs: ['https://github.com/iDevGon'],
      jobTitle: '프론트엔드 개발자',
      image: 'https://avatars.githubusercontent.com/u/106735547?v=4',
    },
  ],
};

export function useWebSiteJsonLd() {
  useJsonLd(WEB_SITE_JSON_LD);
}

interface BlogPostingOptions {
  title: string;
  description: string;
  datePublished: string;
  author: string;
  tags: string[];
  url: string;
  image?: string;
}

export function useBlogPostingJsonLd({
  title,
  description,
  datePublished,
  author,
  tags,
  url,
  image,
}: BlogPostingOptions) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished,
    url: `${BASE_URL}${url}`,
    author: {
      '@type': 'Person',
      name: author,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'DevGon',
      url: BASE_URL,
    },
    keywords: tags.join(', '),
    inLanguage: 'ko',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}${url}`,
    },
  };

  if (image) {
    data.image = image;
  }

  useJsonLd(data);
}
