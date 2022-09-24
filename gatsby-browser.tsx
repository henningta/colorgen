import './src/styles/global.css';

import debounce from 'lodash.debounce';
import { GatsbyBrowser } from 'gatsby';

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

export { onClientEntry, onInitialClientRender };
