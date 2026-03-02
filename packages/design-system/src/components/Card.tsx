import { cva, type RecipeVariantProps } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const cardStyle = cva({
  base: {
    backgroundColor: 'cardBg',
    borderRadius: '1.2rem',
    border: '1px solid',
    borderColor: 'border',
    padding: { base: '1.6rem', tablet: '2.4rem' },
    transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
  },
  variants: {
    interactive: {
      true: {
        cursor: 'pointer',
        '&:hover': {
          borderColor: 'borderHover',
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        },
      },
    },
    variant: {
      default: {},
      highlighted: {
        borderLeft: '3px solid',
        borderLeftColor: 'primary',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type CardVariants = RecipeVariantProps<typeof cardStyle>;
export const Card = styled('div', cardStyle);
