import { Box, Button, Container, Stack, Typography } from '@mui/joy';
import { navigate } from 'gatsby';
import React, { useEffect } from 'react';
import {
  ClientOnly,
  ColorPicker,
  CombinedPageProps,
  Icon,
  Page,
} from '../components';
import { useAppContext, useColorContext } from '../context';

const HomePage: React.FC<CombinedPageProps> = ({ ...props }) => {
  const { color, setColor, colorName, colorHex, contrastText } =
    useColorContext();

  const { setNav } = useAppContext();

  useEffect(() => {
    setNav(['home']);
  }, [setNav]);

  return (
    <Page {...props} sx={{ p: '0 !important' }} maxWidth={false}>
      <Box style={{ height: '100%', backgroundColor: colorHex }}>
        <Stack
          sx={{
            minHeight: 'calc(100vh - 64px)',
            py: 16,
            px: 16,
          }}
        >
          <Container maxWidth="sm" sx={{ m: 0, ml: -4 }}>
            <Typography level="display1" sx={{ color: contrastText }}>
              Welcome
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Typography
                sx={{ color: contrastText }}
                fontWeight={300}
                // fontSize={18}
              >
                Welcome to colorgen.io. This tool was created to help designers
                and developers find just the right color palette they need to
                beautifully brand their next app.
              </Typography>
              <Typography
                sx={{ color: contrastText, mt: 4 }}
                fontWeight={300}
                // fontSize={18}
              >
                This app is a work-in-progress, so stay tuned for more changes
                and features coming soon.
              </Typography>
            </Box>
          </Container>
          <ClientOnly>
            <Stack direction="row" sx={{ mt: 8 }}>
              <Container maxWidth="sm" sx={{ m: 0, ml: -4 }}>
                <ColorPicker value={color} onChange={setColor} />
              </Container>
              <Button
                variant="plain"
                sx={{
                  whiteSpace: 'nowrap',
                  color: contrastText,

                  '&:hover': {
                    color:
                      contrastText === 'common.white'
                        ? 'common.black'
                        : 'common.white',
                    backgroundColor: contrastText,
                  },
                }}
                endDecorator={<Icon>arrow_forward</Icon>}
                onClick={() => void navigate(`/color/${colorHex.substring(1)}`)}
              >
                See color info for &ldquo;{colorName}&rdquo;
              </Button>
            </Stack>
          </ClientOnly>
        </Stack>
      </Box>
    </Page>
  );
};

export default HomePage;
