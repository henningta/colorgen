import './src/styles/global.css';

import React from 'react';
import { GatsbyBrowser } from 'gatsby';
import debounce from 'lodash.debounce';
import {
  AppContextProvider,
  ColorContextProvider,
  SnackbarProvider,
} from './src/context';
import { AppLayout } from './src/layouts';
import { Fonts, Splash } from './src/components';

const onClientEntry: GatsbyBrowser['onClientEntry'] = () => {
  console.debug('GatsbyBrowser: onClientEntry');
  console.debug('window: ', !!window);
  console.debug('document: ', !!document);

  // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  const setViewportUnits = debounce(() => {
    // Get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, 50);

  window.addEventListener('resize', () => {
    setViewportUnits();
  });

  document.documentElement.style.setProperty(
    '--initial-viewport-height',
    'calc(var(--vh, 1vh) * 100)'
  );
};

const onInitialClientRender: GatsbyBrowser['onInitialClientRender'] = () => {
  window.dispatchEvent(new Event('resize'));
};

const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props,
}) => (
  <SnackbarProvider>
    <Splash />
    <Fonts />
    <AppLayout {...props}>{element}</AppLayout>
  </SnackbarProvider>
);

const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => (
  <AppContextProvider>
    <ColorContextProvider>{element}</ColorContextProvider>
  </AppContextProvider>
);

export {
  onClientEntry,
  onInitialClientRender,
  wrapPageElement,
  wrapRootElement,
};
