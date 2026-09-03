import { TableRow, TableCell, Chip } from '@mui/material';
import { AccountWithBalance } from '@/shared/lib/supabase/types/types';
import { OptionsMenu } from '@/shared/components/UI/OptionsMenu';

interface IAccountRowProps {
  account: AccountWithBalance;
  onClick?: () => void;
  onEdit?: (account: AccountWithBalance) => void;
  onDelete?: (account: AccountWithBalance) => void;
}

export default function AccountRow({
  account,
  onEdit,
  onDelete,
}: IAccountRowProps): import('react').JSX.Element {
  const handleEdit = () => {
    if (onEdit) onEdit(account);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(account);
  };

  return (
    <TableRow
      key={account.id}
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        '& td, & th': { borderBottom: '1px solid #1F2937', color: '#E2E8F0' },
      }}
    >
      <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
        {account.name}
      </TableCell>
      {/* <TableCell sx={{ color: '#9CA3AF' }}>{account.institutionName}</TableCell> */}
      <TableCell>
        <Chip
          label={account.type}
          size="small"
          sx={{
            bgcolor: '#1E293B',
            color: '#94A3B8',
            borderRadius: 1.5,
            fontSize: '0.75rem',
          }}
        />
      </TableCell>
      <TableCell
        align="right"
        sx={{
          fontWeight: 600,
          color: account.current_balance && account.current_balance < 0 ? '#EF4444' : '#FFFFFF',
        }}
      >
        {account.current_balance}
      </TableCell>
      <TableCell align="right">
        <OptionsMenu name="account" onEdit={handleEdit} onDelete={handleDelete} />
      </TableCell>
    </TableRow>
  );
}
