import { Grid } from '@mui/material';
import AccountCard from './AccountCard';
import { AccountWithBalance } from '@/shared/lib/supabase/types/types';
// import { ACCOUNTS_DATA } from './mock.data';

interface IAccountsCardDisplay {
  accounts: AccountWithBalance[];
}

export default function AccountsCardDisplay({ accounts }: IAccountsCardDisplay) {
  return (
    <Grid container spacing={3} sx={{ mb: 5 }}>
      {accounts.map((account) => (
        <Grid size={{ xs: 12, md: 6 }} key={account.id}>
          <AccountCard
            description={account.type ?? ''}
            accountName={account.name ?? ''}
            balance={account.current_balance ?? 0}
            color={account.color ?? undefined}
            icon={account.icon ?? undefined}
            onClick={() => console.log('Card clicked', account.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
