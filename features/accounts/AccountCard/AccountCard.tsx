import React from 'react';
import { Card, CardContent, Stack } from '@mui/material';
import { AccountCardProps, AccountInformation, BalanceDisplay, InstitutionTag } from '.';

export const AccountCard: React.FC<AccountCardProps> = ({
  accountName,
  description = '',
  formattedBalance,
  icon = 'wallet',
  color,
  onClick,
}) => {
  return (
    <Card
      variant="outlined"
      onClick={onClick}
      sx={{
        borderRadius: 2.5,
        height: '100%',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease-in-out',
        '&:hover': onClick
          ? {
              boxShadow: 3,
              borderColor: 'primary.main',
              transform: 'translateY(-2px)',
            }
          : {},
      }}
    >
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <AccountInformation
            accountName={accountName}
            icon={icon}
            tag={<InstitutionTag description={description} color={color} />}
          />
          <BalanceDisplay formattedBalance={formattedBalance} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
