import { Flex, Typo } from '@idevgon/design-system';
import { css } from 'styled-system/css';

const tagStyle = css({
  padding: '3 5',
  borderRadius: 'md',
  background: 'tagBg',
  fontSize: '1.4rem',
  color: 'tagText',
});

export function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;

  return (
    <Flex style={{ gap: '0.8rem', marginTop: '1.2rem' }} wrap="wrap">
      {tags.map((tag) => (
        <Typo asChild variant="body2" key={tag}>
          <span className={tagStyle} style={{ padding: '0.3rem 0.7rem' }}>#{tag}</span>
        </Typo>
      ))}
    </Flex>
  );
}
