import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

import App from './App';

hydrateRoot(
  // eslint-disable-next-line
  document.getElementById('root')!,
  <StrictMode>
    <App />
  </StrictMode>,
);
