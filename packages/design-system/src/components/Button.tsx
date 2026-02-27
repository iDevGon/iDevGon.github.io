import { cva, type RecipeVariantProps } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

export const buttonStyle = cva({
  base: {
    color: 'white',
    backgroundColor: 'primary',
    borderRadius: '0.6rem',
    padding: { base: '0.8rem 1.6rem', tablet: '1rem 2rem' },
    fontSize: '1.4rem',
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
    transition: 'all 0.2s ease',
    '&:active': {
      backgroundColor: 'primary.dark',
      transform: 'scale(0.98)',
    },
    '&:hover': {
      backgroundColor: 'primary.light',
    },
  },
  variants: {
    outline: {
      true: {
        backgroundColor: 'transparent',
        border: '1px solid',
        borderColor: 'primary',
        color: 'primary',
        '&:hover': {
          backgroundColor: 'primary',
          color: 'white',
        },
      },
    },
    wiggled: {
      true: {
        animation: 'wiggle 2s ease-in-out infinite',
        '&:hover, &:active': {
          animationPlayState: 'paused',
        },
      },
    },
  },
});

export type ButtonVariants = RecipeVariantProps<typeof buttonStyle>;

export const ButtonBase = styled('button', buttonStyle);
export const StyledAnchor = styled('a', buttonStyle);
