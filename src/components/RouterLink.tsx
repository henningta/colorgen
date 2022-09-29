import React from 'react';
import Link, { LinkProps } from 'next/link';
import {
  Button,
  ButtonProps,
  Link as JoyLink,
  LinkProps as JoyLinkProps,
} from '@mui/joy';

export type RouterLinkProps = Omit<JoyLinkProps, 'href' | 'classes'> &
  Pick<LinkProps, 'href' | 'as' | 'prefetch'>;

const RouterLink = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(
  ({ href, as, prefetch, ...props }, ref) => (
    <Link href={href} as={as} prefetch={prefetch} passHref>
      <JoyLink ref={ref} {...props} />
    </Link>
  )
);

RouterLink.displayName = 'RouterLink';

export type RouterButtonProps = Omit<ButtonProps, 'href'> &
  Pick<LinkProps, 'href' | 'as' | 'prefetch' | 'locale'>;

export const RouterButton = React.forwardRef<
  HTMLButtonElement,
  RouterButtonProps
>(({ href, as, prefetch, locale, ...props }, ref) => (
  <Link href={href} as={as} prefetch={prefetch} locale={locale} passHref>
    <Button ref={ref} {...props} />
  </Link>
));

RouterButton.displayName = 'RouterButton';

export default RouterLink;
