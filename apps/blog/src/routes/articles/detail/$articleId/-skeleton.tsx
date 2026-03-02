import { Skeleton } from '@idevgon/design-system';
import { css } from 'styled-system/css';

const wrapperStyle = css({ maxWidth: '72rem', marginInline: 'auto' });

export function ArticleSkeleton() {
  return (
    <output className={wrapperStyle} aria-busy="true" aria-label="글 불러오는 중">
      {/* h2 heading */}
      <Skeleton variant="heading" w="40%" mb="1.2rem" />

      {/* paragraph */}
      <Skeleton w="100%" mb="0.6rem" />
      <Skeleton w="95%" mb="0.6rem" />
      <Skeleton w="80%" mb="1.6rem" />

      {/* paragraph */}
      <Skeleton w="100%" mb="0.6rem" />
      <Skeleton w="88%" mb="0.6rem" />
      <Skeleton w="92%" mb="0.6rem" />
      <Skeleton w="60%" mb="2.4rem" />

      {/* code block */}
      <Skeleton variant="block" w="100%" mb="2.4rem" animationDelay="0.3s" />

      {/* h3 heading */}
      <Skeleton variant="heading" w="30%" h="1.9rem" mb="1rem" />

      {/* paragraph */}
      <Skeleton w="100%" mb="0.6rem" />
      <Skeleton w="90%" mb="0.6rem" />
      <Skeleton w="70%" mb="1.6rem" />

      {/* paragraph */}
      <Skeleton w="96%" mb="0.6rem" />
      <Skeleton w="100%" mb="0.6rem" />
      <Skeleton w="45%" />
    </output>
  );
}
