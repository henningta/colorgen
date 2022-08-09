import React from 'react';
import { getInitColorSchemeScript } from '@mui/joy/styles';
import chroma from 'chroma-js';

exports.onRenderBody = ({ setPreBodyComponents, setHtmlAttributes }) => {
  setPreBodyComponents([getInitColorSchemeScript()]);
  setHtmlAttributes({ 'initial-color': chroma.random().hex() });
};
