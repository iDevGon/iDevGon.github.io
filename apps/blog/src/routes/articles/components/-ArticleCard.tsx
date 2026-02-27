import { Flex, Typo } from '@idevgon/design-system';
import { Link } from '@tanstack/react-router';
import { css } from 'styled-system/css';
import { TagList } from '@/components/TagList';
import type { ArticleMeta } from '@/interfaces/article';

const cardStyle = css({
  display: 'block',
  padding: { base: '1.6rem', tablet: '2rem 2.4rem' },
  borderRadius: '1rem',
  border: '1px solid',
  borderColor: 'border',
  borderLeft: '3px solid',
  borderLeftColor: 'secondary',
  transition:
    'border-color 0.2s, border-left-color 0.2s, transform 0.2s, box-shadow 0.2s',
  _hover: {
    borderColor: 'borderHover',
    borderLeftColor: 'primary',
    transform: { base: 'none', tablet: 'translateY(-2px)' },
    boxShadow: { base: 'none', tablet: '0 4px 16px rgba(0,0,0,0.06)' },
    '& h2': { color: 'primary' },
  },
});

const titleStyle = css({
  fontSize: { base: '1.6rem', tablet: '1.8rem' },
  fontWeight: 600,
  marginBottom: '0.8rem',
  transition: 'color 0.2s',
  letterSpacing: '-0.01em',
  lineHeight: 1.4,
});

const metaStyle = css({
  gap: { base: '0.8rem', tablet: '1.6rem' },
  color: 'textMuted',
  fontSize: { base: '1.2rem', tablet: '1.4rem' },
  fontFamily: '{fonts.mono}',
  letterSpacing: '0.01em',
});

const excerptStyle = css({
  marginTop: '1.2rem',
  fontSize: '1.4rem',
  color: 'textSecondary',
  lineHeight: '1.6',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  lineClamp: { base: 2, tablet: 3 },
});

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      to="/articles/detail/$articleId"
      params={{ articleId: article.id }}
      className={cardStyle}
    >
      <Typo asChild variant="h2">
        <h2 className={titleStyle}>{article.title}</h2>
      </Typo>

      <Flex className={metaStyle}>
        <Typo asChild variant="body2">
          <span>{article.author}</span>
        </Typo>
        <Typo asChild variant="body2">
          <span>{article.date}</span>
        </Typo>
      </Flex>

      {article.excerpt && (
        <Typo asChild variant="body2">
          <p className={excerptStyle}>{article.excerpt}</p>
        </Typo>
      )}

      <TagList tags={article.tags} />
    </Link>
  );
}
