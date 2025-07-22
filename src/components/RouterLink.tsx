import { forwardRef } from 'react';
import { createLink } from '@tanstack/react-router';
import { Button, type ButtonProps, Link, type LinkProps } from '@mui/material';
import type { LinkComponent } from '@tanstack/react-router';

// RouterLink
type MuiLinkProps = LinkProps & {
  // additional link props
};

const MuiLinkComponent = forwardRef<HTMLAnchorElement, MuiLinkProps>(
  function MuiLinkComponent(props, ref) {
    return <Link ref={ref} {...props} />;
  },
);

const CreatedLinkComponent = createLink(MuiLinkComponent);

const RouterLink: LinkComponent<typeof MuiLinkComponent> = (props) => (
  <CreatedLinkComponent preload="intent" {...props} />
);

export default RouterLink;

// RouterButton
type MuiButtonLinkProps = ButtonProps<'a'> & {
  // additional button props
};

const MuiButtonLinkComponent = forwardRef<
  HTMLAnchorElement,
  MuiButtonLinkProps
>(function MuiButtonLinkComponent(props, ref) {
  return <Button ref={ref} component="a" {...props} />;
});

const CreatedButtonLinkComponent = createLink(MuiButtonLinkComponent);

export const RouterButton: LinkComponent<typeof MuiButtonLinkComponent> = (
  props,
) => <CreatedButtonLinkComponent preload="intent" {...props} />;
