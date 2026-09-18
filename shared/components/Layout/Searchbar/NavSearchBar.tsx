import React from 'react';
import { Box, InputBase, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchShortcut } from '@/shared/hooks/useSearchShortcut';

export interface NavSearchBarProps {
  onSearchChange?: (value: string) => void;
  placeholder?: string;
  shortcutLabel?: string;
}

export const NavSearchBar: React.FC<NavSearchBarProps> = ({
  onSearchChange,
  placeholder = 'Buscar',
  shortcutLabel = '⌘K',
}) => {
  const searchInputRef = useSearchShortcut('k');

  return (
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
        width: { xs: '80%', md: 260 },
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
        placeholder={placeholder}
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
      {shortcutLabel && (
        <Chip
          label={shortcutLabel}
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
      )}
    </Box>
  );
};
