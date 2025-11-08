import { Drawer, DrawerProps, List, ListItemText } from '@mui/material';

export const DRAWER_WIDTH = 300;

export type NavDrawerProps = Omit<DrawerProps, 'children'>;

const NavDrawer: React.FC<NavDrawerProps> = ({ ...props }) => {
  return (
    <Drawer
      slotProps={{
        paper: {
          sx: {
            width: DRAWER_WIDTH,
          },
        },
      }}
      {...props}
    >
      <List>
        <ListItemText>test</ListItemText>
      </List>
    </Drawer>
  );
};

export default NavDrawer;
