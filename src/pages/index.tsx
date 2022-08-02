import React from 'react';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Tabs from '@mui/joy/Tabs';
import Page from '../components/Page';
import Typography from '@mui/joy/Typography';

const HomePage: React.FC = () => (
  <Page>
    <Tabs defaultValue={0}>
      <TabList>
        <Tab>Overview</Tab>
        <Tab>Generator</Tab>
      </TabList>
      <TabPanel value={0}>
        <Typography>Tab One Active</Typography>
      </TabPanel>
      <TabPanel value={1}>
        <Typography>Tab Two Active</Typography>
      </TabPanel>
    </Tabs>
  </Page>
);

export default HomePage;
