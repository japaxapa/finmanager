import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

export interface ThemeToggleButtonProps {
  onClick?: () => void;
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ onClick }) => {
  const { mode, setMode } = useColorScheme();

  // Guard against SSR / pre-hydration state
  if (!mode) {
    return null;
  }

  const handleToggle = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
    onClick?.();
  };

  const isDark = mode === 'dark';

  return (
    <Tooltip title={isDark ? 'Modo Claro' : 'Modo Escuro'}>
      <IconButton
        onClick={handleToggle}
        size="small"
        sx={{ color: 'text.secondary' }}
        aria-label={isDark ? 'Modo Claro' : 'Modo Escuro'}
      >
        {isDark ? (
          <WbSunnyOutlinedIcon fontSize="small" />
        ) : (
          <DarkModeOutlinedIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
};
