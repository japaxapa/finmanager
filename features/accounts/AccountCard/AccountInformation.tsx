import React from 'react';
import { Avatar, Stack, Typography } from '@mui/material';
import FinIcon from '@/shared/components/UI/FinIcons';
import { AccountInformationProps } from '.';

export const AccountInformation: React.FC<AccountInformationProps> = ({
  accountName,
  icon = 'wallet',
  tag,
}) => {
  const renderedIcon = typeof icon === 'string' ? FinIcon(icon) : icon;

  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
      <Avatar
        sx={{
          color: 'text.secondary',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'action.hover',
          p: 1,
        }}
      >
        {renderedIcon}
      </Avatar>

      <Stack sx={{ gap: 0.5 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
          {accountName}
        </Typography>
        {tag}
      </Stack>
    </Stack>
  );
};
