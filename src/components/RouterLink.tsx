import React from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import {
  Button,
  ButtonProps,
  Link as JoyLink,
  LinkProps as JoyLinkProps,
} from '@mui/joy';

// https://reacthustle.com/blog/extend-next-13-link-with-mui-link-with-typescript
// Defining the CustomNextLink
export type CustomNextLinkProps = Omit<NextLinkProps, 'href'> & {
  _href: NextLinkProps['href'];
};

export const CustomNextLink = ({ _href, ...props }: CustomNextLinkProps) => {
  return <NextLink href={_href} {...props} />;
};

// combine MUI LinkProps with NextLinkProps
type CombinedLinkProps = JoyLinkProps<typeof NextLink>;

// we remove both href properties
// and define a new href property using NextLinkProps
export type RouterLinkProps = Omit<CombinedLinkProps, 'href'> & {
  href: NextLinkProps['href'];
};

// use _href props of CustomNextLink to set the href
const RouterLink = ({ href, ...props }: RouterLinkProps) => (
  <JoyLink {...props} component={CustomNextLink} _href={href} />
);

export type RouterButtonProps = Omit<ButtonProps, 'href'> &
  Pick<NextLinkProps, 'href' | 'as' | 'prefetch' | 'locale'>;

export const RouterButton = React.forwardRef<
  HTMLButtonElement,
  RouterButtonProps
>(({ href, as, prefetch, locale, ...props }, ref) => (
  <NextLink href={href} as={as} prefetch={prefetch} locale={locale} passHref>
    <Button ref={ref} {...props} />
  </NextLink>
));

RouterButton.displayName = 'RouterButton';

export default RouterLink;
