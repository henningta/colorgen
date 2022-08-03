import React from 'react';
import { Tab, TabList, TabPanel, Tabs, Typography } from '@mui/joy';
import { Overview, Page } from '../components';

const HomePage: React.FC = () => (
  <Page>
    <Tabs defaultValue={0}>
      <TabList sx={{ mb: 4 }}>
        <Tab>Overview</Tab>
        <Tab>Generator</Tab>
      </TabList>
      <TabPanel value={0}>
        <Overview />
      </TabPanel>
      <TabPanel value={1}>
        <Typography>Tab Two Active</Typography>
      </TabPanel>
    </Tabs>
  </Page>
);

export default HomePage;
