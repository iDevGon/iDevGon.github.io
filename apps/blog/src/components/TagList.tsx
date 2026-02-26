import { css } from 'styled-system/css';
import { Flex } from '@idevgon/design-system';

const tagStyle = css({
  padding: '1 2',
  borderRadius: 'md',
  background: 'tagBg',
  fontSize: '1.2rem',
  color: 'tagText',
});

export function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;

  return (
    <Flex className={css({ gap: '2', marginTop: '3' })} wrap="wrap">
      {tags.map((tag) => (
        <span key={tag} className={tagStyle}>
          #{tag}
        </span>
      ))}
    </Flex>
  );
}
