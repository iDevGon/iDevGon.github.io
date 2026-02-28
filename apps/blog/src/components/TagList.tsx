import { Flex, Typo } from '@idevgon/design-system';
import { Link } from '@tanstack/react-router';
import { css } from 'styled-system/css';

const tagStyle = css({
  padding: '0.3rem 0.7rem',
  borderRadius: 'md',
  background: 'tagBg',
  fontSize: '1.4rem',
  color: 'tagText',
  textDecoration: 'none',
  transition: 'background 0.15s, color 0.15s',
  _hover: {
    background: 'primary',
    color: 'white',
  },
});

export function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;

  return (
    <Flex gap="0.8rem" mt="1.2rem" wrap="wrap">
      {tags.map((tag) => (
        <Typo asChild variant="body2" key={tag}>
          <Link
            to="/articles"
            search={{ page: 1, tag: tag.toLowerCase() }}
            className={tagStyle}
          >
            #{tag}
          </Link>
        </Typo>
      ))}
    </Flex>
  );
}
