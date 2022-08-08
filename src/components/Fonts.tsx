import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const fontsUrl =
  'https://fonts.googleapis.com/css2?family=Material+Icons&family=Noto+Sans+Mono&family=Noto+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap';

const Fonts: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Helmet onChangeClientState={() => setLoaded(true)}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="preload" as="style" href={fontsUrl} />
      <link rel="stylesheet" href={fontsUrl} media={loaded ? 'all' : 'print'} />
    </Helmet>
  );
};

export default Fonts;
