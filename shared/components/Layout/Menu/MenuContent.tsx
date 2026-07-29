import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';

// MUI Icons matching the reference design
import GridViewIcon from '@mui/icons-material/GridView'; // Dashboard
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'; // Contas
import SellOutlinedIcon from '@mui/icons-material/SellOutlined'; // Categorias
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined'; // Transações
// import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'; // Relatórios
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'; // Configurações
import { UserProfileCard } from './MenuProfileButton';
import LogoButton from './LogoBtn';

export interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const mainNavItems: NavItem[] = [
  { title: 'Dashboard', path: '/dashboard', icon: <GridViewIcon /> },
  { title: 'Contas', path: '/accounts', icon: <AccountBalanceWalletOutlinedIcon /> },
  { title: 'Categorias', path: '/categories', icon: <SellOutlinedIcon /> },
  { title: 'Transações', path: '/transactions', icon: <SwapHorizOutlinedIcon /> },
  // { title: 'Relatórios', path: '/reports', icon: <BarChartOutlinedIcon /> },
];

export interface MenuContentProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const MenuContent: React.FC<MenuContentProps> = ({
  currentPath = '/dashboard',
  onNavigate,
}) => {
  const handleItemClick = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: '#0B0F17', // Dark background matching design
        color: '#94A3B8',
        width: 260,
        borderRight: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.08)',
      }}
    >
      <LogoButton />

      {/* Main Navigation Menu Section */}
      <Box sx={{ flexGrow: 1, px: 2 }}>
        <Typography
          variant="caption"
          sx={{
            px: 1.5,
            pb: 1,
            display: 'block',
            fontWeight: 600,
            color: '#64748B',
            fontSize: '0.7rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          MENU
        </Typography>

        <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {mainNavItems.map((item) => {
            const isActive = currentPath === item.path;

            return (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  onClick={() => handleItemClick(item.path)}
                  sx={{
                    borderRadius: 2,
                    py: 1,
                    px: 1.5,
                    bgcolor: isActive ? 'rgba(37, 99, 235, 0.2)' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#94A3B8',
                    '&:hover': {
                      bgcolor: isActive ? 'rgba(37, 99, 235, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                      color: '#FFFFFF',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: isActive ? '#3B82F6' : '#64748B',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 600 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Bottom Actions & User Profile Footer */}
      <Box sx={{ p: 2 }}>
        {/* Settings Button */}
        {/* <ListItemButton
          onClick={() => handleItemClick('/config')}
          sx={{
            borderRadius: 2,
            py: 1,
            px: 1.5,
            mb: 2,
            color: currentPath === '/config' ? '#FFFFFF' : '#94A3B8',
            bgcolor: currentPath === '/config' ? 'rgba(37, 99, 235, 0.2)' : 'transparent',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.04)',
              color: '#FFFFFF',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: '#64748B' }}>
            <SettingsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Configurações" sx={{ fontSize: '0.9rem', fontWeight: 500 }} />
        </ListItemButton> */}

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', mb: 2 }} />

        <UserProfileCard />
      </Box>
    </Box>
  );
};
