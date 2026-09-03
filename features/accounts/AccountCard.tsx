import React from 'react';
import { Card, CardContent, Typography, Box, Stack, Chip, Avatar } from '@mui/material';
import { formatCurrency } from '../../shared/lib/utils';
import FinIcon from '@/shared/components/UI/FinIcons';

export interface AccountCardProps {
  /** Name of the bank or institution (e.g., "Nubank", "Banco Inter", "C6 Bank") */
  description?: string;
  /** Account identifier or title (e.g., "Checking Account", "Main Account", "**** 4821") */
  accountName: string;
  /** Main balance amount. If passed as a number, it formats as BRL currency by default. */
  balance: number | string;
  /** URL to the bank logo OR a React icon node */
  icon?: string;
  /** Optional background or theme color associated with the bank (e.g., "#8A05BE" for Nubank) */
  color?: string;
  /** Optional click handler for selecting/opening the account */
  onClick?: () => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  description = '',
  accountName,
  balance,
  icon,
  color = 'ffffff',
  onClick,
}) => {
  const formattedBalance = typeof balance === 'number' ? formatCurrency(balance) : balance;

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
        <Stack spacing={2}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <AccountInformation
              icon={icon}
              color={color}
              description={description}
              accountName={accountName}
            />

            <BalanceDisplay formattedBalance={formattedBalance} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

function AccountInformation({
  icon = 'wallet',
  color,
  description,
  accountName,
}: {
  icon?: string;
  color?: string;
  description: string;
  accountName: string;
}) {
  {
    /* Header: Institution Logo/Icon & Tag */
  }
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
          borderRadius: '50%',
        }}
      >
        {FinIcon(icon)}
      </Avatar>

      <Stack sx={{ gap: 0.5 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
          {accountName}
        </Typography>
        <InstitutionTag description={description} color={color} />
      </Stack>
    </Stack>
  );
}

function BalanceDisplay({ formattedBalance }: { formattedBalance: number | string }) {
  {
    /* Balance Display Section */
  }
  return (
    <Box sx={{ pt: 0.5 }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ fontWeight: 500, display: 'block' }}
      >
        Current Balance
      </Typography>
      <Typography variant="h5" component="div" color="text.primary" sx={{ fontweight: 700 }}>
        {formattedBalance}
      </Typography>
    </Box>
  );
}

function InstitutionTag({ description, color }: { description: string; color?: string }) {
  {
    /* Institution Tag / Badge */
  }
  return (
    <Chip
      label={description}
      size="small"
      sx={{
        fontWeight: 600,
        fontSize: '0.75rem',
        bgcolor: color ? `${color}15` : 'action.selected',
        color: color || 'text.primary',
        border: color ? `1px solid ${color}33` : 'none',
        width: '8rem',
      }}
    />
  );
}

export default AccountCard;
