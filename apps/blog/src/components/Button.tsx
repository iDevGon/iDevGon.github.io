import { createLink, type LinkComponent } from '@tanstack/react-router';
import type { ComponentProps } from 'react';
import {
  Button as DSButton,
  type ButtonBase,
  StyledAnchor,
  type ButtonVariants,
} from '@idevgon/design-system';

export type { ButtonVariants };

const RouterLink = createLink(StyledAnchor);

type ButtonBaseProps = ComponentProps<typeof ButtonBase> & { to?: undefined };
type LinkButtonProps = ComponentProps<LinkComponent<typeof StyledAnchor>> & {
  to: string;
};

type ButtonProps = ButtonBaseProps | LinkButtonProps;

export function Button(props: ButtonProps) {
  if (props.to !== undefined) {
    return <RouterLink preload="intent" {...props} />;
  }
  return <DSButton {...props} />;
}
