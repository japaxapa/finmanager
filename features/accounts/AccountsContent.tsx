'use client';

import AccountsTable from './AccountsTable';
import AccountsCardDisplay from './AccountsCardDisplay';
import { useAccounts } from '@/shared/hooks/useAccounts';

export default function AccountsContent() {
  const { data: accountsArray } = useAccounts();

  {
    /* Accounts Cards Grid using your component */
  }

  return (
    <>
      <AccountsCardDisplay accounts={accountsArray ?? []} />
      <AccountsTable accounts={accountsArray ?? []} />
    </>
  );
}
