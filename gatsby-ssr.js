import React from 'react';
import { getInitColorSchemeScript } from '@mui/joy/styles';

const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <React.Fragment key="joy">{getInitColorSchemeScript()}</React.Fragment>,
    <React.Fragment key="random-color">
      <script
        dangerouslySetInnerHTML={{
          __html: `
          function randomColor() {
            // https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript
            const hexChars = "0123456789abcdef";

            let hex = '';
            for (var i = 0; i < 6; i++) {
              hex += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
            }

            return hex;
          }

          document.documentElement.setAttribute('data-random-color', randomColor());
          `,
        }}
      />
    </React.Fragment>,
  ]);
};

export { onRenderBody };
