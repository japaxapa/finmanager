'use client';

import React, { useState } from 'react';
import { Stack, Avatar, Box, Typography, Menu, MenuItem, ButtonBase } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout'; // Optional MUI Icon
import { createClient } from '@/shared/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useUserProfile } from '@/shared/hooks/useUser';
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link';

export function UserProfileCard() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const router = useRouter();
  const supabase = createClient();

  const { data: user } = useUserProfile();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await supabase.auth.signOut();
    setAnchorEl(null);
    router.push('/auth/login');
  };

  if (!user) {
    return (
      <Link href={'/auth/login'}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            width: '100%',
            textAlign: 'left',
            borderRadius: 1.5,
            p: 1,
            transition: 'background-color 0.2s',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.05)', // Subtle hover highlight
            },
          }}
        >
          <LoginIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: 'text.primary', fontSize: '1.25rem' }}
          >
            Log in
          </Typography>
        </Box>
      </Link>
    );
  }

  return (
    <>
      {/* 2. Wrap layout in ButtonBase to make it fully interactive */}
      <ButtonBase
        onClick={handleClick}
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : 'false'}
        sx={{
          width: '100%',
          textAlign: 'left',
          borderRadius: 1.5,
          p: 1,
          transition: 'background-color 0.2s',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.05)', // Subtle hover highlight
          },
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ px: 0.5, alignItems: 'center', width: '100%' }}>
          <Avatar
            src={user?.fullName}
            sx={{
              width: 38,
              height: 38,
              bgcolor: '#1E293B',
              color: '#3B82F6',
              fontWeight: 700,
              fontSize: '0.85rem',
            }}
          >
            {user?.fullName
              ?.split(' ')
              .map((n: string) => n[0])
              .join('')
              .toUpperCase()}
          </Avatar>
          <Box sx={{ minWidth: 0, flexGrow: 1 }}>
            <Typography
              variant="subtitle2"
              noWrap
              sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.875rem' }}
            >
              {user?.fullName}
            </Typography>
            <Typography
              variant="caption"
              noWrap
              sx={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}
            >
              {user?.email}
            </Typography>
          </Box>
        </Stack>
      </ButtonBase>

      {/* 3. The Dropdown Menu */}
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '.MuiMenu-paper': {
            mt: -1,
            bgcolor: '#1E293B', // Dark theme matching your dark avatar
            color: '#FFFFFF',
            border: '1px solid #334155',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            minWidth: 160,
            '& .MuiMenuItem-root': {
              fontSize: '0.875rem',
              gap: 1.5,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.08)',
              },
            },
          },
        }}
      >
        <MenuItem onClick={handleLogout} sx={{ color: '#EF4444' }}>
          <LogoutIcon fontSize="small" />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
