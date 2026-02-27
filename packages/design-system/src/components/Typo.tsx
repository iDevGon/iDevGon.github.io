import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cva, type RecipeVariantProps } from 'styled-system/css';
import { Slot } from './Slot';

const typoStyle = cva({
  base: {
    letterSpacing: '-0.01em',
  },
  variants: {
    variant: {
      h1: {
        fontSize: { base: '2.6rem', tablet: '3.2rem' },
        fontWeight: 'bold',
        lineHeight: '1.2',
        letterSpacing: '-0.025em',
      },
      h2: {
        fontSize: { base: '2rem', tablet: '2.4rem' },
        fontWeight: 'bold',
        lineHeight: '1.3',
        letterSpacing: '-0.02em',
      },
      h3: {
        fontSize: { base: '1.7rem', tablet: '2rem' },
        fontWeight: 'semibold',
        lineHeight: '1.4',
        letterSpacing: '-0.015em',
      },
      body1: { fontSize: '1.6rem', lineHeight: '1.6' },
      body2: { fontSize: '1.4rem', lineHeight: '1.5' },
      caption: { fontSize: '1.2rem', lineHeight: '1.4' },
    },
  },
  defaultVariants: {
    variant: 'body1',
  },
});

export type TypoVariants = RecipeVariantProps<typeof typoStyle>;

type TypoProps = TypoVariants &
  ComponentPropsWithoutRef<'span'> & {
    children: ReactNode;
    asChild?: boolean;
  };

export const Typo = ({
  children,
  asChild,
  variant,
  className,
  ...props
}: TypoProps) => {
  const Component = asChild ? Slot : 'span';
  const combinedClassName = typoStyle({ variant });

  return (
    <Component className={`${combinedClassName} ${className ?? ''}`} {...props}>
      {children}
    </Component>
  );
};
