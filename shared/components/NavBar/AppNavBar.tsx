'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { createClient } from '../../lib/supabase/client';
import { useRouter } from 'next/navigation';
import ProfileButton from './ProfileButton';
import Menu from './Menu';

export default function AppNavBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const supabase = createClient();

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAuth(event.target.checked);
  // };

  const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const toggleDrawer = (newOpen: boolean) => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setMenuOpen(newOpen);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAnchorEl(null);
    router.push('/auth/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Menu isMenuOpen={isMenuOpen} toggleDrawer={toggleDrawer} />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* Check how to get the name of the page */}
            Menu
          </Typography>

          {/* Check for auth conditional */}
          <ProfileButton
            anchorEl={anchorEl}
            handleProfileMenu={handleProfileMenu}
            handleClose={handleClose}
            handleLogout={handleLogout}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
