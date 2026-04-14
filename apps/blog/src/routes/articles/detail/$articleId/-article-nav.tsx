import type React from 'react';
import { Link } from '@tanstack/react-router';
import type { ArticleMeta } from '@/interfaces/article';
import {
  articleNavContentStyle,
  articleNavCoverBgStyle,
  articleNavExcerptStyle,
  articleNavLabelStyle,
  articleNavLinkStyle,
  articleNavStyle,
  articleNavTitleStyle,
} from './-styles';

interface ArticleNavProps {
  prev: ArticleMeta | null;
  next: ArticleMeta | null;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'instant' });
}

export function ArticleNav({ prev, next }: ArticleNavProps) {
  if (!prev && !next) return null;

  return (
    <nav className={articleNavStyle}>
      {prev ? (
        <Link
          to="/articles/detail/$articleId"
          params={{ articleId: prev.id }}
          className={articleNavLinkStyle}
          onClick={scrollToTop}
        >
          {prev.coverImage && (
            <div
              data-cover-bg
              className={articleNavCoverBgStyle}
              style={
                {
                  '--cover-image': `url(${prev.coverImage})`,
                } as React.CSSProperties
              }
            />
          )}
          <div className={articleNavContentStyle}>
            <span className={articleNavLabelStyle}>&larr; 이전글</span>
            <span className={articleNavTitleStyle}>{prev.title}</span>
            <span className={articleNavExcerptStyle}>
              {prev.description || prev.excerpt}
            </span>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          to="/articles/detail/$articleId"
          params={{ articleId: next.id }}
          className={articleNavLinkStyle}
          style={{ textAlign: 'right' }}
          onClick={scrollToTop}
        >
          {next.coverImage && (
            <div
              data-cover-bg
              className={articleNavCoverBgStyle}
              style={
                {
                  '--cover-image': `url(${next.coverImage})`,
                } as React.CSSProperties
              }
            />
          )}
          <div className={articleNavContentStyle}>
            <span className={articleNavLabelStyle}>다음글 &rarr;</span>
            <span className={articleNavTitleStyle}>{next.title}</span>
            <span className={articleNavExcerptStyle}>
              {next.description || next.excerpt}
            </span>
          </div>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
