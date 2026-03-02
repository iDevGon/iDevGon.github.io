import { cva, type RecipeVariantProps } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const skeletonStyle = cva({
  base: {
    backgroundColor: 'border',
  },
  variants: {
    variant: {
      text: { borderRadius: '0.4rem', height: '1.6rem' },
      heading: { borderRadius: '0.4rem', height: '2.2rem' },
      block: { borderRadius: '0.8rem', height: '12rem' },
      circle: { borderRadius: '50%' },
    },
    animation: {
      dimming: {
        animation: 'blink 1.5s ease-in-out infinite',
      },
      shimmer: {
        backgroundImage:
          'linear-gradient(90deg, token(colors.border) 25%, token(colors.surfaceHover) 50%, token(colors.border) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s ease-in-out infinite',
      },
    },
  },
  defaultVariants: {
    variant: 'text',
    animation: 'dimming',
  },
});

export type SkeletonVariants = RecipeVariantProps<typeof skeletonStyle>;
export const Skeleton = styled('div', skeletonStyle);
