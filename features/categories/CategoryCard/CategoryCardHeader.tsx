'use client';

import { useState } from 'react';
import FinIcon from '@/shared/components/UI/FinIcons';
import {
  Stack,
  Avatar,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

interface ICategoryCardHeader {
  isOverBudget: boolean;
  color: string;
  effectiveColor: string;
  icon: string;
  categoryName: string;
  transactionCount: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function CategoryCardHeader({
  isOverBudget,
  color,
  effectiveColor,
  icon,
  categoryName,
  transactionCount,
  onEdit,
  onDelete,
}: ICategoryCardHeader) {
  // Menu state management
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

  return (
    <Stack direction="row" sx={{ alignItems: 'start', justifyContent: 'space-between' }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        {/* Avatar com ícone e cor de fundo suave */}
        <Avatar
          sx={{
            bgcolor: isOverBudget ? 'error.lighter' : `${color}15`,
            color: effectiveColor,
            width: 48,
            height: 48,
            borderRadius: 2,
          }}
        >
          {FinIcon(icon)}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 600 }}>
            {categoryName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {transactionCount} transações
          </Typography>
        </Box>
      </Stack>

      {/* Botão de opções com Menu Popover */}
      <Box>
        <IconButton
          id="category-menu-button"
          aria-controls={open ? 'category-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleOpenMenu}
          size="small"
          sx={{ color: 'text.secondary' }}
        >
          <MoreHorizIcon />
        </IconButton>

        <Menu
          id="category-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          sx={{
            ariaLabelledby: 'category-menu-button',
          }}
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
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <EditOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Editar</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Excluir</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </Stack>
  );
}
