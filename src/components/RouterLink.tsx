import { forwardRef } from 'react';
import { createLink } from '@tanstack/react-router';
import { Button, type ButtonProps, Link, type LinkProps } from '@mui/joy';
import type { LinkComponent } from '@tanstack/react-router';

// RouterLink
type JoyLinkProps = LinkProps & {
  // additional link props
};

const JoyLinkComponent = forwardRef<HTMLAnchorElement, JoyLinkProps>(
  (props, ref) => <Link ref={ref} {...props} />,
);

JoyLinkComponent.displayName = 'MUILinkComponent';

const CreatedLinkComponent = createLink(JoyLinkComponent);

const RouterLink: LinkComponent<typeof JoyLinkComponent> = (props) => (
  <CreatedLinkComponent preload="intent" {...props} />
);

export default RouterLink;

// RouterButton
type JoyButtonLinkProps = ButtonProps<'a'> & {
  // additional button props
};

const JoyButtonLinkComponent = forwardRef<
  HTMLAnchorElement,
  JoyButtonLinkProps
>((props, ref) => <Button ref={ref} component="a" {...props} />);

JoyButtonLinkComponent.displayName = 'JoyButtonLinkComponent';

const CreatedButtonLinkComponent = createLink(JoyButtonLinkComponent);

export const RouterButton: LinkComponent<typeof JoyButtonLinkComponent> = (
  props,
) => <CreatedButtonLinkComponent preload="intent" {...props} />;
