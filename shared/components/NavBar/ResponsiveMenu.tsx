import React from 'react';
import { Drawer, Box, useMediaQuery, useTheme } from '@mui/material';
import { MenuContent } from './MenuContent';

export interface MenuProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const DRAWER_WIDTH = 260;

export const ResponsiveMenu: React.FC<MenuProps> = ({
  currentPath = '/dashboard',
  onNavigate,
  mobileOpen = false,
  onMobileClose,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }} // Better mobile performance
        sx={{
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            bgcolor: '#0B0F17',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          },
        }}
      >
        <MenuContent
          currentPath={currentPath}
          onNavigate={(path) => {
            if (onNavigate) onNavigate(path);
            if (onMobileClose) onMobileClose();
          }}
        />
      </Drawer>
    );
  }

  return (
    <Box
      component="nav"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        height: '100vh',
        position: 'sticky',
        top: 0,
      }}
    >
      <MenuContent currentPath={currentPath} onNavigate={onNavigate} />
    </Box>
  );
};

export default ResponsiveMenu;
