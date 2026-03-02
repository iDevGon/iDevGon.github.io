import { Flex, Tag } from '@idevgon/design-system';
import { Link } from '@tanstack/react-router';
import { css } from 'styled-system/css';

const tagLinkStyle = css({ textDecoration: 'none' });

export function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;

  return (
    <Flex gap="0.8rem" mt="1.2rem" wrap="wrap">
      {tags.map((tag) => (
        <Link
          key={tag}
          to="/articles"
          search={{ page: 1, tag: tag.toLowerCase() }}
          className={tagLinkStyle}
        >
          <Tag interactive>#{tag}</Tag>
        </Link>
      ))}
    </Flex>
  );
}
