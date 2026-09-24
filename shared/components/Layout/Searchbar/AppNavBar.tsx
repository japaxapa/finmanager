'use client';

import React from 'react';
import { Box, Stack, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavBreadcrumbs } from './NavBreadcrumbs';
// import { NavSearchBar } from './NavSearchBar';
// import { NotificationsButton } from './NotificationsButton';
import { ThemeToggleButton } from '../../UI/buttons/ThemeToggleButton';

export interface AppNavBarProps {
  breadcrumbs?: string[];
  mode?: 'light' | 'dark' | 'system';
  unreadNotifications?: number;
  onToggleTheme?: () => void;
  onNotificationClick?: () => void;
  onSearchChange?: (value: string) => void;
  onMobileMenuOpen?: () => void;
  actionsSlot?: React.ReactNode;
}

export const AppNavBar: React.FC<AppNavBarProps> = ({
  breadcrumbs = [],
  mode = 'dark',
  onToggleTheme,
  onMobileMenuOpen,
  actionsSlot,
  // unreadNotifications = 0,
  // onNotificationClick,
  // onSearchChange,
}) => {
  return (
    <Box
      component="header"
      sx={{
        width: '100%',
        py: 2,
        px: { xs: 2, md: 3 },
        bgcolor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justify: 'space-between',
        gap: 2,
      }}
    >
      {/* Left Section */}
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        {onMobileMenuOpen && (
          <IconButton
            onClick={onMobileMenuOpen}
            edge="start"
            aria-label="open drawer"
            sx={{ display: { md: 'none' }, color: 'text.secondary' }}
          >
            <MenuIcon />
          </IconButton>
        )}
        {breadcrumbs.length > 0 && <NavBreadcrumbs items={breadcrumbs} />}
      </Stack>

      {/* Right Section */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: 'center',
          flexGrow: 1,
          justifyContent: { xs: 'space-between', md: 'flex-end' },
        }}
      >
        {/* TODO check if this is necessary */}
        {/* <NavSearchBar onSearchChange={onSearchChange} /> */}

        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
          {actionsSlot ? (
            actionsSlot
          ) : (
            <>
              {/* TODO refactor and check if this is needed */}
              {/* <NotificationsButton
                unreadCount={unreadNotifications}
                onClick={onNotificationClick}
              /> */}
              <ThemeToggleButton mode={mode} onToggle={onToggleTheme} />
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default AppNavBar;
