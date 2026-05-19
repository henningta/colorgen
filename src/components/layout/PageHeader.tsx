import {
  Container,
  Divider,
  Paper,
  PaperProps,
  Stack,
  Typography,
} from '@mui/material';

export type PageHeaderProps = PaperProps & {
  title: string;
  divider?: boolean;
};

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  divider,
  ...props
}) => (
  <>
    <Paper square elevation={0} sx={{ pt: 8 }} {...props}>
      <Container sx={{ height: '100%' }}>
        <Stack sx={{ justifyContent: 'flex-end', height: '100%' }}>
          <Typography variant="h1">{title}</Typography>
        </Stack>
      </Container>
    </Paper>
    {divider && <Divider />}
  </>
);

export default PageHeader;
