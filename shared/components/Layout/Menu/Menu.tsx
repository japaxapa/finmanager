'use client';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import { useRouter } from 'next/navigation';
import { createClient } from '@/shared/lib/supabase/client';

interface IMenu {
  isMenuOpen: boolean;
  toggleDrawer: (value: boolean) => (event: React.MouseEvent<HTMLElement>) => void;
}

export default function Menu({ isMenuOpen, toggleDrawer }: IMenu) {
  const router = useRouter();
  const supabase = createClient();

  const handleNavigate = (href: string) => (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    router.push(href);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  const DrawerList = (
    <Box sx={{ width: 250, pt: 4 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem>
          <ListItemButton onClick={handleNavigate('/')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton onClick={handleNavigate('/dashboard')}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={'Dashboard'} />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton onClick={handleNavigate('/categories')}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary={'Categories'} />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu button"
        sx={{ mr: 2 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={isMenuOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}
