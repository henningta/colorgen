import React from 'react';
import { GatsbySSR } from 'gatsby';
import { getInitColorSchemeScript } from '@mui/joy/styles';
import {
  AppContextProvider,
  ColorContextProvider,
  SnackbarProvider,
} from './src/context';
import { AppLayout } from './src/layouts';
import { Fonts, Splash } from './src/components';

const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHeadComponents,
  setHtmlAttributes,
  setPreBodyComponents,
}) => {
  // setHtmlAttributes({ lang: 'en' });

  // setHeadComponents([
  //   <meta key="title" name="title" content={pathname} />,
  //   <meta key="description" name="description" content="Description" />,
  // ]);

  setPreBodyComponents([
    <React.Fragment key="joy">{getInitColorSchemeScript()}</React.Fragment>,
    // <React.Fragment key="random-color">
    //   <script
    //     dangerouslySetInnerHTML={{
    //       __html: `(function() { try {
    //         function randomColor() {
    //           // https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript
    //           const hexChars = "0123456789abcdef";

    //           let hex = '';
    //           for (var i = 0; i < 6; i++) {
    //             hex += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
    //           }

    //           return hex;
    //         }

    //         document.documentElement.setAttribute('data-random-color', randomColor());
    //       } catch (e) {} })();`,
    //     }}
    //   />
    // </React.Fragment>,
  ]);
};

const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element, props }) => (
  <SnackbarProvider>
    <Splash />
    <Fonts />
    <AppLayout {...props}>{element}</AppLayout>
  </SnackbarProvider>
);

const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => (
  <AppContextProvider>
    <ColorContextProvider>{element}</ColorContextProvider>
  </AppContextProvider>
);

export { onRenderBody, wrapPageElement, wrapRootElement };
