import React from 'react';
import { getInitColorSchemeScript } from '@mui/joy/styles';

const onRenderBody = ({ setPreBodyComponents, setHtmlAttributes }) => {
  setPreBodyComponents([getInitColorSchemeScript()]);
};

export { onRenderBody };
