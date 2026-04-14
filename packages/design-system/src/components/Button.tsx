import type { ComponentProps, ElementType, Ref } from 'react';
import { cva, type RecipeVariantProps } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

export const buttonStyle = cva({
  base: {
    color: 'white',
    backgroundColor: 'primary',
    borderRadius: '0.6rem',
    padding: { base: '0.8rem 1.6rem', tablet: '0.8rem 1.8rem' },
    fontSize: { base: '1.4rem', tablet: '1.6rem' },
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
    transition:
      'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
    '&:active': {
      backgroundColor: 'primary.dark',
      transform: 'scale(0.98)',
    },
    '&:hover': {
      backgroundColor: 'primary.light',
    },
    _dark: {
      backgroundColor: 'primary.dark',
      '&:hover': {
        backgroundColor: 'primary',
      },
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
        _dark: {
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
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

/* ------------------------------------------------------------------ */
/* Polymorphic Button                                                  */
/* Renders as <button> by default, or as any link component when       */
/* `href` is provided. Pass `linkComponent` to override the anchor.    */
/* ------------------------------------------------------------------ */

type ButtonBaseProps = ComponentProps<typeof ButtonBase> & {
  href?: undefined;
  linkComponent?: never;
};

type LinkProps<L extends ElementType = typeof StyledAnchor> = Omit<
  ComponentProps<typeof StyledAnchor>,
  'as'
> &
  ComponentProps<L> & {
    href: string;
    linkComponent?: L;
  };

export type PolymorphicButtonProps<
  L extends ElementType = typeof StyledAnchor,
> = ButtonBaseProps | LinkProps<L>;

export function Button({
  ref,
  ...props
}: PolymorphicButtonProps<ElementType> & { ref?: Ref<HTMLElement> }) {
  if (props.href !== undefined) {
    const { linkComponent, ...rest } = props as LinkProps<ElementType>;
    const LinkComp = linkComponent ?? StyledAnchor;
    return <LinkComp ref={ref as Ref<HTMLAnchorElement>} {...rest} />;
  }
  return (
    <ButtonBase
      ref={ref as Ref<HTMLButtonElement>}
      {...(props as ButtonBaseProps)}
    />
  );
}
