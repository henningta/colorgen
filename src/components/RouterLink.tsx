import React from 'react';
import NextLink from 'next/link';
import {
  Button,
  ButtonProps,
  Link as JoyLink,
  LinkProps as JoyLinkProps,
} from '@mui/joy';

// https://gist.github.com/kachar/028b6994eb6b160e2475c1bb03e33e6a

const RouterLink = (props: JoyLinkProps<'a'>) => (
  <JoyLink component={NextLink} {...props} />
);

export const RouterButton = (props: ButtonProps<'a'>) => (
  <Button component={NextLink} {...props} />
);

export default RouterLink;
