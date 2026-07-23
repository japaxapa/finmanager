import React, { useRef, useEffect } from 'react';
import {
  Box,
  Stack,
  Breadcrumbs,
  Typography,
  InputBase,
  IconButton,
  Badge,
  Chip,
  Tooltip,
} from '@mui/material';

// MUI Icons
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import MenuIcon from '@mui/icons-material/Menu';

export interface AppNavBarProps {
  /** Array of breadcrumb path items (e.g., ['finmanager', 'accounts']) */
  breadcrumbs?: string[];
  /** Current theme mode */
  mode?: 'light' | 'dark';
  /** Callback when theme toggle is clicked */
  onToggleTheme?: () => void;
  /** Number of unread notifications */
  unreadNotifications?: number;
  /** Callback when notification icon is clicked */
  onNotificationClick?: () => void;
  /** Callback for search query input */
  onSearchChange?: (value: string) => void;
  /** Optional callback to open mobile drawer menu */
  onMobileMenuOpen?: () => void;
}

export const AppNavBar: React.FC<AppNavBarProps> = ({
  breadcrumbs = ['finmanager', 'dashboard'],
  mode = 'dark',
  onToggleTheme,
  unreadNotifications = 0,
  onNotificationClick,
  onSearchChange,
  onMobileMenuOpen,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      {/* Left Side: Mobile Menu Button & Breadcrumbs */}
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        {/* Mobile Menu Icon (Hidden on Desktop) */}
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

        {/* Breadcrumbs Navigation */}
        <Breadcrumbs separator="/" aria-label="breadcrumb" sx={{ color: 'text.secondary' }}>
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <Typography
                key={item}
                variant="body2"
                sx={{
                  color: isLast ? 'text.primary' : 'text.secondary',
                  fontWeight: isLast ? 600 : 400,
                  fontSize: '0.875rem',
                }}
              >
                {item}
              </Typography>
            );
          })}
        </Breadcrumbs>
      </Stack>

      {/* Right Side: Search Input & Action Icons */}
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        {/* Quick Search Input */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'action.hover',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
            width: { xs: 160, sm: 220, md: 260 },
            transition: 'all 0.2s ease',
            '&:focus-within': {
              borderColor: 'primary.main',
              bgcolor: 'background.paper',
            },
          }}
        >
          <SearchIcon sx={{ color: 'text.secondary', fontSize: 20, mr: 1 }} />
          <InputBase
            inputRef={searchInputRef}
            placeholder="Buscar"
            onChange={(e) => onSearchChange?.(e.target.value)}
            sx={{
              flexGrow: 1,
              fontSize: '0.875rem',
              color: 'text.primary',
              '& input::placeholder': {
                color: 'text.secondary',
                opacity: 0.8,
              },
            }}
          />
          <Chip
            label="⌘K"
            size="small"
            sx={{
              height: 20,
              fontSize: '0.7rem',
              fontWeight: 600,
              bgcolor: 'action.selected',
              color: 'text.secondary',
              borderRadius: 1,
              px: 0.5,
              display: { xs: 'none', sm: 'inline-flex' },
            }}
          />
        </Box>

        {/* Top Action Icons */}
        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
          {/* Notifications Icon */}
          <Tooltip title="Notificações">
            <IconButton onClick={onNotificationClick} size="small" sx={{ color: 'text.secondary' }}>
              <Badge badgeContent={unreadNotifications} color="error" variant="dot">
                <NotificationsNoneOutlinedIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Light / Dark Mode Toggle Icon */}
          <Tooltip title={mode === 'dark' ? 'Modo Claro' : 'Modo Escuro'}>
            <IconButton onClick={onToggleTheme} size="small" sx={{ color: 'text.secondary' }}>
              {mode === 'dark' ? (
                <WbSunnyOutlinedIcon fontSize="small" />
              ) : (
                <DarkModeOutlinedIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AppNavBar;
