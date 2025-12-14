import { createLink, type LinkComponent } from '@tanstack/react-router';
import type { ComponentProps } from 'react';
import { cva, type RecipeVariantProps } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const buttonStyle = cva({
  base: {
    color: 'white',
    backgroundColor: 'primary',
    borderRadius: '0.4rem',
    padding: '0.8rem 1.6rem',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    '&:active': {
      backgroundColor: 'primary.dark',
    },
    '&:hover': {
      backgroundColor: 'primary.light',
    },
  },
  variants: {
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

const ButtonBase = styled('button', buttonStyle);
const StyledAnchor = styled('a', buttonStyle);

type ButtonBaseProps = ComponentProps<typeof ButtonBase>;

const LinkButton = createLink(StyledAnchor);

type LinkButtonProps = ComponentProps<LinkComponent<typeof StyledAnchor>>;

type ButtonProps =
  | (ButtonBaseProps & { to?: undefined })
  | (LinkButtonProps & { to: string });

export function Button(props: ButtonProps) {
  if (props.to !== undefined) {
    return <LinkButton preload="intent" {...props} />;
  }
  return <ButtonBase {...props} />;
}
