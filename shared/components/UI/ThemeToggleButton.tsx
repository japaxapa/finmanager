import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

export interface ThemeToggleButtonProps {
  mode: 'light' | 'dark' | 'system';
  onToggle?: () => void;
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ mode, onToggle }) => (
  <Tooltip title={mode === 'dark' ? 'Modo Claro' : 'Modo Escuro'}>
    <IconButton onClick={onToggle} size="small" sx={{ color: 'text.secondary' }}>
      {mode === 'dark' ? (
        <WbSunnyOutlinedIcon fontSize="small" />
      ) : (
        <DarkModeOutlinedIcon fontSize="small" />
      )}
    </IconButton>
  </Tooltip>
);
