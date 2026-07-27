import React from 'react';
import { Card, CardContent, Typography, Box, Stack, Chip, Avatar } from '@mui/material';
import { formatCurrency } from '../lib/utils';

export interface AccountCardProps {
  /** Name of the bank or institution (e.g., "Nubank", "Banco Inter", "C6 Bank") */
  institutionName: string;
  /** Account identifier or title (e.g., "Checking Account", "Main Account", "**** 4821") */
  accountName: string;
  /** Main balance amount. If passed as a number, it formats as BRL currency by default. */
  balance: number | string;
  /** URL to the bank logo OR a React icon node */
  logo?: string | React.ReactNode;
  /** Optional background or theme color associated with the bank (e.g., "#8A05BE" for Nubank) */
  brandColor?: string;
  /** Optional click handler for selecting/opening the account */
  onClick?: () => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  institutionName,
  accountName,
  balance,
  logo,
  brandColor,
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
              logo={logo}
              brandColor={brandColor}
              institutionName={institutionName}
              accountName={accountName}
            />

            <InstitutionTag institutionName={institutionName} brandColor={brandColor} />

            <BalanceDisplay formattedBalance={formattedBalance} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

function AccountInformation({
  logo,
  brandColor,
  institutionName,
  accountName,
}: {
  logo?: string | React.ReactNode;
  brandColor?: string;
  institutionName: string;
  accountName: string;
}) {
  {
    /* Header: Institution Logo/Icon & Tag */
  }
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
      <Avatar
        src={typeof logo === 'string' ? logo : undefined}
        sx={{
          width: 40,
          height: 40,
          bgcolor: brandColor || 'action.hover',
          color: brandColor ? '#ffffff' : 'text.primary',
          fontWeight: 700,
          fontSize: '0.9rem',
        }}
      >
        {/* Fallback to first letter of institution if no image/icon */}
        {typeof logo !== 'string' && logo ? logo : institutionName.charAt(0).toUpperCase()}
      </Avatar>

      <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
        {accountName}
      </Typography>
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

function InstitutionTag({
  institutionName,
  brandColor,
}: {
  institutionName: string;
  brandColor?: string;
}) {
  {
    /* Institution Tag / Badge */
  }
  return (
    <Chip
      label={institutionName}
      size="small"
      sx={{
        fontWeight: 600,
        fontSize: '0.75rem',
        bgcolor: brandColor ? `${brandColor}15` : 'action.selected',
        color: brandColor || 'text.primary',
        border: brandColor ? `1px solid ${brandColor}33` : 'none',
      }}
    />
  );
}

export default AccountCard;
