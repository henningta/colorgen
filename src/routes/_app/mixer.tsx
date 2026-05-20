import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Box,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  TextField,
  Typography,
} from '@mui/material';
import { ClientOnly, createFileRoute } from '@tanstack/react-router';
import chroma from 'chroma-js';
import { useMemo, useState } from 'react';
import { ColorCard, ColorPicker, Page, PageHeader } from '~/components';
import { ColorStoreProvider } from '~/context';
import { useSelectedColor } from '~/hooks';
import {
  getColorHex,
  getShades,
  getTints,
  InterpolationMode,
  interpolationModes,
} from '~/utils';

const url = 'https://www.colorgen.io';

export const Route = createFileRoute('/_app/mixer')({
  component: RouteWrapper,
  head: ({ match }) => {
    const title = 'Mixer · colorgen.io';
    const description = 'Mixer description';

    return {
      meta: [
        { title: 'Mixer' },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: `${url}${match.pathname}` },

        // seo color image
        // { property: 'og:image', content: imgUrl },
        // { property: 'og:image:secure_url', content: imgUrl },
        // { property: 'og:image:width', content: '80' },
        // { property: 'og:image:height', content: '80' },
        // { property: 'og:image:alt', content: hex },
      ],
      links: [{ rel: 'canonical', href: `${url}${match.pathname}` }],
    };
  },
});

type TabValue = 'lightness' | 'mixer';

type TabInfo = {
  value: TabValue;
  label: string;
};

const tabs: TabInfo[] = [
  { value: 'mixer', label: 'Mixer' },
  { value: 'lightness', label: 'Lightness' },
];

function RouteWrapper() {
  return (
    <ColorStoreProvider initialColor="#fff">
      <RouteComponent />
    </ColorStoreProvider>
  );
}

function RouteComponent() {
  const { colorHex, selectedColor, setSelectedColor } = useSelectedColor();

  const [tab, setTab] = useState<TabValue>('lightness');

  const [interpolation, setInterpolation] = useState<InterpolationMode>('rgb');
  const [whitePointInput, setWhitePointInput] = useState('#fff');
  const [blackPointInput, setBlackPointInput] = useState('#000');
  const [tintsAmount, setTintsAmount] = useState(10);
  const [shadesAmount, setShadesAmount] = useState(10);

  const whitePoint = getColorHex(whitePointInput);
  const blackPoint = getColorHex(blackPointInput);

  const tints = useMemo(
    () => getTints(colorHex, whitePoint, tintsAmount, interpolation),
    [colorHex, interpolation, tintsAmount, whitePoint],
  );

  const shades = useMemo(
    () => getShades(colorHex, blackPoint, shadesAmount, interpolation),
    [blackPoint, colorHex, interpolation, shadesAmount],
  );

  return (
    <Page maxWidth={false} disableGutters sx={{ py: 0 }}>
      <ClientOnly>
        <Box
          sx={(theme) => ({
            width: '100%',
            maxWidth: 600,
            px: 2,
            display: { xs: 'none', md: 'block' },
            position: 'fixed',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: theme.zIndex.modal,
            transition: 'all 150ms ease-in-out',
            top: 36,
          })}
        >
          <ColorPicker
            value={selectedColor}
            onChange={setSelectedColor}
            useHexPicker
          />
        </Box>
      </ClientOnly>
      <PageHeader title="Mixer" />
      <TabContext value={tab}>
        <Paper square elevation={0}>
          <Container>
            <TabList onChange={(_, value) => setTab(value as TabValue)}>
              {tabs.map(({ label, value }) => (
                <Tab key={value} value={value} label={label} />
              ))}
            </TabList>
          </Container>
        </Paper>
        <Divider />
        <Container sx={{ py: 4 }}>
          <TabPanel value="mixer">
            <Stack sx={{ gap: 4 }}>
              <FormControl>
                <InputLabel>Interpolation Mode</InputLabel>
                <Select
                  size="small"
                  label="Interpolation Mode"
                  value={interpolation}
                  onChange={(e) => setInterpolation(e.target.value)}
                >
                  {interpolationModes.map((mode) => (
                    <MenuItem key={mode} value={mode}>
                      {mode}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                <Stack sx={{ flex: 1 }}>
                  <Typography>Tints</Typography>
                  <Stack direction="row" sx={{ gap: 1 }}>
                    <ColorPicker
                      value={whitePointInput}
                      onChange={setWhitePointInput}
                      useHexPicker
                    />
                    <TextField
                      value={tintsAmount}
                      onChange={(e) => setTintsAmount(parseInt(e.target.value))}
                      sx={{ width: 80 }}
                    />
                  </Stack>
                </Stack>
                <Stack sx={{ flex: 1 }}>
                  <Typography>Shades</Typography>
                  <Stack direction="row" sx={{ gap: 1 }}>
                    <ColorPicker
                      value={blackPointInput}
                      onChange={setBlackPointInput}
                      useHexPicker
                    />
                    <TextField
                      value={shadesAmount}
                      onChange={(e) =>
                        setShadesAmount(parseInt(e.target.value))
                      }
                      sx={{ width: 80 }}
                    />
                  </Stack>
                </Stack>
              </Stack>
              <Stack>
                {tints.map((x) => (
                  <ColorCard
                    key={x.id}
                    colorHex={x.color.hex()}
                    onSetAsSelected={setSelectedColor}
                  />
                ))}
              </Stack>
              <ColorCard
                colorHex={colorHex}
                onSetAsSelected={setSelectedColor}
              />
              <Stack>
                {shades.map((x) => (
                  <ColorCard
                    key={x.id}
                    colorHex={x.color.hex()}
                    onSetAsSelected={setSelectedColor}
                  />
                ))}
              </Stack>
            </Stack>
          </TabPanel>
          <TabPanel value="lightness">
            <Stack sx={{ gap: 4 }}>
              <FormControl>
                <InputLabel>Interpolation Mode</InputLabel>
                <Select
                  size="small"
                  label="Interpolation Mode"
                  value={interpolation}
                  onChange={(e) => setInterpolation(e.target.value)}
                >
                  {interpolationModes.map((mode) => (
                    <MenuItem key={mode} value={mode}>
                      {mode}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ColorCard
                colorHex={chroma(colorHex)
                  // .mix('white', 'a3aaae', 0.4, interpolation)
                  .set('oklab.l', 0.95)
                  .hex()}
                onSetAsSelected={setSelectedColor}
              />
              {/* {lightnesses.map((x) => (
                <ColorCard
                  key={x.id}
                  colorHex={x.color.hex()}
                  onSetAsSelected={setSelectedColor}
                />
              ))} */}
            </Stack>
          </TabPanel>
        </Container>
      </TabContext>
    </Page>
  );
}
