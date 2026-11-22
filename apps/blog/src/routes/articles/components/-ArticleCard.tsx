import { Flex, Typo } from '@idevgon/design-system';
import { Link } from '@tanstack/react-router';
import { css } from 'styled-system/css';
import { TagList } from '@/components/TagList';
import type { ArticleMeta } from '@/interfaces/article';

const cardStyle = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  alignItems: 'start',
  gap: '1.6rem',
  paddingBlock: { base: '2.4rem', tablet: '2.8rem' },
  borderBottom: '1px solid var(--colors-border)',
  '&:has(img:not([hidden]))': {
    gridTemplateColumns: { tablet: 'minmax(0, 1fr) 18rem' },
    columnGap: { tablet: '3.2rem' },
  },
  _hover: {
    '& h2': { color: 'primary', textDecoration: 'underline' },
  },
});

const coverStyle = css({
  display: 'block',
  width: { base: 'min(100%, 24rem)', tablet: '100%' },
  height: 'auto',
  aspectRatio: '2 / 1',
  objectFit: 'cover',
  borderRadius: '0.5rem',
  border: '1px solid',
  borderColor: 'border',
  '&[hidden]': { display: 'none' },
});

const titleStyle = css({
  fontSize: { base: '2.1rem', tablet: '2.5rem' },
  fontWeight: 700,
  marginBottom: '0.8rem',
  transition: 'color 0.2s',
  letterSpacing: '-0.035em',
  wordBreak: 'keep-all',
  overflowWrap: 'anywhere',
  textUnderlineOffset: '0.2em',
  textDecorationThickness: '1px',
  lineHeight: 1.4,
});

const metaStyle = css({
  gap: { base: '0.8rem', tablet: '1.6rem' },
  color: 'textMuted',
  fontSize: { base: '1.2rem', tablet: '1.4rem' },
  flexWrap: 'wrap',
  fontVariantNumeric: 'tabular-nums',
  letterSpacing: '0.01em',
});

const excerptStyle = css({
  marginTop: '1.2rem',
  fontSize: '1.5rem',
  color: 'textSecondary',
  lineHeight: '1.7',
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
      <div>
        <h2 className={titleStyle}>{article.title}</h2>

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
      </div>

      {article.coverImage && (
        <img
          src={article.coverImage}
          className={coverStyle}
          alt=""
          loading="lazy"
          onError={(event) => {
            event.currentTarget.hidden = true;
          }}
        />
      )}
    </Link>
  );
}
