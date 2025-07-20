import { Button, Link, ListItemButton, MenuItem } from '@mui/joy';
import { createLink } from '@tanstack/react-router';

const RouterLink = createLink(Link);

export const ListItemRouterButton = createLink(ListItemButton);
export const MenuItemRouterLink = createLink(MenuItem);
export const RouterButton = createLink(Button);
// export const RouterButton = createLink((props) => (
//   // @ts-expect-error
//   <Button component="a" {...props} />
// ));

export default RouterLink;
