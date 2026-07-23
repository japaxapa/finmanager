import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  Stack,
} from '@mui/material';

// MUI Icons matching the reference design
import GridViewIcon from '@mui/icons-material/GridView'; // Dashboard
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'; // Contas
import SellOutlinedIcon from '@mui/icons-material/SellOutlined'; // Categorias
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined'; // Transações
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'; // Relatórios
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'; // Configurações
import PaidIcon from '@mui/icons-material/Paid'; // Brand Logo Icon

export interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const mainNavItems: NavItem[] = [
  { title: 'Dashboard', path: '/dashboard', icon: <GridViewIcon /> },
  { title: 'Contas', path: '/contas', icon: <AccountBalanceWalletOutlinedIcon /> },
  { title: 'Categorias', path: '/categorias', icon: <SellOutlinedIcon /> },
  { title: 'Transações', path: '/transacoes', icon: <SwapHorizOutlinedIcon /> },
  { title: 'Relatórios', path: '/relatorios', icon: <BarChartOutlinedIcon /> },
];

export interface MenuContentProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
}

export const MenuContent: React.FC<MenuContentProps> = ({
  currentPath = '/dashboard',
  onNavigate,
  user = {
    name: 'Lucas Martins',
    email: 'lucas@finmanager.dev',
  },
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
      {/* App Branding Logo Header */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar
          sx={{
            bgcolor: '#2563EB',
            width: 32,
            height: 32,
            borderRadius: 1.5,
          }}
        >
          <PaidIcon sx={{ fontSize: 20, color: '#FFFFFF' }} />
        </Avatar>
        <Typography
          variant="h6"
          sx={{ color: '#FFFFFF', letterSpacing: '-0.5px', fontWeight: 700 }}
        >
          fin<span style={{ color: '#3B82F6' }}>manager</span>
        </Typography>
      </Box>

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
        <ListItemButton
          onClick={() => handleItemClick('/configuracoes')}
          sx={{
            borderRadius: 2,
            py: 1,
            px: 1.5,
            mb: 2,
            color: currentPath === '/configuracoes' ? '#FFFFFF' : '#94A3B8',
            bgcolor: currentPath === '/configuracoes' ? 'rgba(37, 99, 235, 0.2)' : 'transparent',
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
        </ListItemButton>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', mb: 2 }} />

        {/* User Profile Card */}
        <Stack direction="row" spacing={1.5} sx={{ px: 0.5, alignItems: 'center' }}>
          <Avatar
            src={user.avatarUrl}
            sx={{
              width: 38,
              height: 38,
              bgcolor: '#1E293B',
              color: '#3B82F6',
              fontWeight: 700,
              fontSize: '0.85rem',
            }}
          >
            {user.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </Avatar>
          <Box sx={{ minWidth: 0, flexGrow: 1 }}>
            <Typography
              variant="subtitle2"
              noWrap
              sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.875rem' }}
            >
              {user.name}
            </Typography>
            <Typography
              variant="caption"
              noWrap
              sx={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}
            >
              {user.email}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
