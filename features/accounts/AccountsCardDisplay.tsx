import { Grid, GridProps } from '@mui/material';
import { AccountWithBalance } from '@/shared/lib/supabase/types/types';
import { formatCurrency } from '@/shared/lib/utils';
import AccountCard from './AccountCard';

export interface AccountsCardDisplayProps {
  /** Array of accounts from Supabase */
  accounts: AccountWithBalance[];
  /** Optional click handler callback for individual cards */
  onAccountClick?: (account: AccountWithBalance) => void;
  /** Responsive grid sizes (defaults to 12 cols on xs, 6 cols on md) */
  gridSize?: GridProps['size'];
}

/** Helper function moved outside component render loop (SRP) */
function mapperAccountToCardProps(account: AccountWithBalance) {
  const balance = account.current_balance;
  const formattedBalance = typeof balance === 'number' ? formatCurrency(balance) : (balance ?? '');

  return {
    id: account.id,
    description: account.type ?? '',
    accountName: account.name ?? '',
    color: account.color ?? undefined,
    icon: account.icon ?? undefined,
    formattedBalance,
  };
}

export default function AccountsCardDisplay({
  accounts,
  onAccountClick,
  gridSize = { xs: 12, md: 6 },
}: AccountsCardDisplayProps) {
  return (
    <Grid container spacing={3} sx={{ mb: 5 }}>
      {accounts.map((account) => {
        const cardProps = mapperAccountToCardProps(account);

        return (
          <Grid size={gridSize} key={cardProps.id}>
            <AccountCard
              description={cardProps.description}
              accountName={cardProps.accountName}
              color={cardProps.color}
              icon={cardProps.icon}
              formattedBalance={cardProps.formattedBalance}
              onClick={onAccountClick ? () => onAccountClick(account) : undefined}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
