import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cva, type RecipeVariantProps } from 'styled-system/css';
import { Slot } from './Slot';

const typoStyle = cva({
  base: {},
  variants: {
    variant: {
      h1: { fontSize: '3.2rem', fontWeight: 'bold', lineHeight: '1.2' },
      h2: { fontSize: '2.4rem', fontWeight: 'bold', lineHeight: '1.3' },
      h3: { fontSize: '2rem', fontWeight: 'semibold', lineHeight: '1.4' },
      body1: { fontSize: '1.6rem', lineHeight: '1.5' },
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
