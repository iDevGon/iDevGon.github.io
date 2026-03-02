import { cva, type RecipeVariantProps } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const tagStyle = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.4rem 1rem',
    borderRadius: '2rem',
    fontSize: '1.2rem',
    fontWeight: 500,
    backgroundColor: 'tagBg',
    color: 'tagText',
    transition: 'background-color 0.15s ease, color 0.15s ease',
    whiteSpace: 'nowrap',
  },
  variants: {
    size: {
      sm: { padding: '0.2rem 0.8rem', fontSize: '1.1rem' },
      md: { padding: '0.4rem 1rem', fontSize: '1.2rem' },
    },
    interactive: {
      true: {
        cursor: 'pointer',
        textDecoration: 'none',
        '&:hover': {
          backgroundColor: 'primary',
          color: 'white',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type TagVariants = RecipeVariantProps<typeof tagStyle>;

export const Tag = styled('span', tagStyle);
