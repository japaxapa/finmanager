'use client';

import { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

export interface IOptionsMenuProps {
  name: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function OptionsMenu({ name, onEdit, onDelete }: IOptionsMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    if (onEdit) onEdit();
  };

  const handleDelete = () => {
    handleCloseMenu();
    if (onDelete) onDelete();
  };

  {
    /* Botão de opções com Menu Popover */
  }
  return (
    <Box>
      <IconButton
        id={`${name}-menu-button`}
        aria-controls={open ? `${name}-menu` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpenMenu}
        size="small"
        sx={{ color: 'text.secondary' }}
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        id={`${name}-menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            elevation: 2,
            sx: {
              borderRadius: 2,
              minWidth: 140,
            },
          },
        }}
      >
        {onEdit && (
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <EditOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Editar</ListItemText>
          </MenuItem>
        )}

        {onDelete && (
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Excluir</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
}
