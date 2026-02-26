import { Flex, Typo } from '@idevgon/design-system';
import { Link } from '@tanstack/react-router';
import { css } from 'styled-system/css';
import { TagList } from '@/components/TagList';
import type { ArticleMeta } from '@/interfaces/article';

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
      <Typo asChild variant="h2">
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
      </Typo>

      <Flex
        className={css({
          gap: '4',
          color: 'textSecondary',
          fontSize: '1.4rem',
        })}
      >
        <Typo asChild variant="body2">
          <span>{article.author}</span>
        </Typo>
        <Typo asChild variant="body2">
          <span>{article.date}</span>
        </Typo>
      </Flex>

      {article.excerpt && (
        <Typo asChild variant="body2">
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
        </Typo>
      )}

      <TagList tags={article.tags} />
    </Link>
  );
}
