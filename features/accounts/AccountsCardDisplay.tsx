import { Grid } from '@mui/material';
import { AccountWithBalance } from '@/shared/lib/supabase/types/types';
import { formatCurrency } from '@/shared/lib/utils';
import AccountCard from './AccountCard';

interface IAccountsCardDisplay {
  accounts: AccountWithBalance[];
}

export default function AccountsCardDisplay({ accounts }: IAccountsCardDisplay) {
  return (
    <Grid container spacing={3} sx={{ mb: 5 }}>
      {accounts.map((account) => {
        const formattedBalance =
          typeof account.current_balance === 'number'
            ? formatCurrency(account.current_balance)
            : account.current_balance;
        return (
          <Grid size={{ xs: 12, md: 6 }} key={account.id}>
            <AccountCard
              description={account.type ?? ''}
              accountName={account.name ?? ''}
              color={account.color ?? undefined}
              icon={account.icon ?? undefined}
              formattedBalance={formattedBalance ?? ''}
              // onClick={() => console.log('Card clicked', account.id)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
