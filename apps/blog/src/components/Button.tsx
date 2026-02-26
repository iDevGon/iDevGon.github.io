import { createLink, type LinkComponent } from '@tanstack/react-router';
import type { ComponentProps } from 'react';
import { ButtonBase, StyledAnchor, type ButtonVariants } from '@idevgon/design-system';

export type { ButtonVariants };

const LinkButton = createLink(StyledAnchor);

type ButtonBaseProps = ComponentProps<typeof ButtonBase>;
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
