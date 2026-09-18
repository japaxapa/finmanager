import React from 'react';
import { IconButton, Badge, Tooltip } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

export interface NotificationsButtonProps {
  unreadCount?: number;
  onClick?: () => void;
}

export const NotificationsButton: React.FC<NotificationsButtonProps> = ({
  unreadCount = 0,
  onClick,
}) => (
  <Tooltip title="Notificações">
    <IconButton onClick={onClick} size="small" sx={{ color: 'text.secondary' }}>
      <Badge badgeContent={unreadCount} color="error" variant="dot">
        <NotificationsNoneOutlinedIcon fontSize="small" />
      </Badge>
    </IconButton>
  </Tooltip>
);
