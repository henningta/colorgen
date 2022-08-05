import React from 'react';
import { Page } from '../components';
import { useColorContext } from '../context';

const Palette: React.FC = () => {
  const { color } = useColorContext();

  return <Page>palette</Page>;
};

export default Palette;
