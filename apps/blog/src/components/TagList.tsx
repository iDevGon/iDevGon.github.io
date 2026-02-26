import { Flex, Typo } from '@idevgon/design-system';
import { css } from 'styled-system/css';

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
        <Typo asChild variant="caption" key={tag}>
          <span className={tagStyle}>#{tag}</span>
        </Typo>
      ))}
    </Flex>
  );
}
