import {
  Box,
  Button,
  ButtonProps,
  Container,
  Stack,
  Typography,
} from '@mui/joy';
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
import { passSx } from '../utils';

type ColorButtonProps = ButtonProps & {
  colorHex: string;
  colorName: string;
  textColor: string;
};

const ColorButton: React.FC<ColorButtonProps> = ({
  colorHex,
  colorName,
  textColor,
  sx,
  ...props
}) => (
  <Button
    {...props}
    variant="plain"
    sx={[
      (theme) => ({
        whiteSpace: 'nowrap',
        color: textColor,

        '&:hover': {
          color: textColor === 'common.white' ? 'common.black' : 'common.white',
          backgroundColor: textColor,
        },

        [theme.breakpoints.down('md')]: {
          ml: 'auto',
        },
      }),
      ...passSx(sx),
    ]}
    endDecorator={<Icon sx={{ color: 'inherit' }}>arrow_forward</Icon>}
    onClick={() => void navigate(`/color/${colorHex.substring(1)}`)}
  >
    See color info for &ldquo;{colorName}&rdquo;
  </Button>
);

const HomePage: React.FC<CombinedPageProps> = ({ ...props }) => {
  const { isMobile } = useAppContext();
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
          sx={(theme) => ({
            minHeight: 'calc(100vh - 64px)',
            py: 4,
            px: 0,

            [theme.breakpoints.up('sm')]: {
              py: 8,
              px: 8,
            },

            [theme.breakpoints.up('lg')]: {
              py: 16,
              px: 16,
            },
          })}
        >
          <Container maxWidth="sm" sx={{ m: 0 }}>
            <Typography level="display1" textColor={contrastText}>
              Welcome
            </Typography>
            <Stack sx={{ mt: 4 }}>
              <Typography fontWeight={300} textColor={contrastText}>
                Welcome to colorgen.io. This tool was created to help designers
                and developers find just the right color palette they need to
                beautifully brand their next app.
              </Typography>
              <Typography
                sx={{ mt: 4 }}
                fontWeight={300}
                textColor={contrastText}
              >
                This app is a work-in-progress, so stay tuned for more changes
                and features coming soon.
              </Typography>
              {isMobile && (
                <>
                  <ColorPicker
                    value={color}
                    onChange={setColor}
                    sx={{ mt: 8 }}
                  />
                  <ColorButton
                    colorHex={colorHex}
                    colorName={colorName}
                    textColor={contrastText}
                    sx={{ mt: 4, ml: 'auto' }}
                  />
                </>
              )}
            </Stack>
          </Container>
          <ClientOnly>
            {!isMobile && (
              <Container
                maxWidth={false}
                sx={{
                  m: 0,
                  mt: 6,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <ColorPicker
                  value={color}
                  onChange={setColor}
                  sx={{ maxWidth: 536, my: 2 }}
                />
                <ColorButton
                  colorHex={colorHex}
                  colorName={colorName}
                  textColor={contrastText}
                  sx={{ ml: 2 }}
                />
              </Container>
            )}
          </ClientOnly>
        </Stack>
      </Box>
    </Page>
  );
};

export default HomePage;
