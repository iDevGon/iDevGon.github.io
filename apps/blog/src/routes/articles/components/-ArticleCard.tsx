import { Link } from '@tanstack/react-router';
import { css } from 'styled-system/css';
import { Flex } from '@idevgon/design-system';
import type { ArticleMeta } from '@/interfaces/article';
import { TagList } from '@/components/TagList';

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      to="/articles/detail/$articleId"
      params={{ articleId: article.id }}
      className={css({
        display: 'block',
        padding: '4',
        borderRadius: 'lg',
        border: '1px solid',
        borderColor: 'border',
        transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
        _hover: {
          borderColor: 'borderHover',
          transform: 'translateY(-2px)',
          boxShadow: 'md',
          '& h2': { color: 'primary' },
        },
      })}
    >
      <h2
        className={css({
          fontSize: '1.8rem',
          fontWeight: 'semibold',
          marginBottom: '2',
          transition: 'color 0.2s',
        })}
      >
        {article.title}
      </h2>

      <Flex
        className={css({ gap: '4', color: 'textSecondary', fontSize: '1.4rem' })}
      >
        <span>{article.author}</span>
        <span>{article.date}</span>
      </Flex>

      {article.excerpt && (
        <p
          className={css({
            marginTop: '3',
            fontSize: '1.4rem',
            color: 'textSecondary',
            lineHeight: '1.6',
          })}
        >
          {article.excerpt}
        </p>
      )}

      <TagList tags={article.tags} />
    </Link>
  );
}
