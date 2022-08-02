import React from 'react';
import { getInitColorSchemeScript } from '@mui/joy/styles';

export function onRenderBody({ setPreBodyComponents }) {
  setPreBodyComponents([getInitColorSchemeScript()]);
}
