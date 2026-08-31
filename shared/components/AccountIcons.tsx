import { Box } from '@mui/material';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';

export default function AccountIcon({ iconName = 'wallet' }: { iconName: string }) {
  const icons = {
    wallet: <AccountBalanceWalletOutlinedIcon fontSize="small" />,
    income: <TrendingUpOutlinedIcon fontSize="small" />,
    expense: <TrendingDownOutlinedIcon fontSize="small" />,
    savings: <SavingsOutlinedIcon fontSize="small" />,
    bank: <AccountBalanceIcon fontSize="small" />,
    card: <CreditCardIcon fontSize="small" />,
  };

  return (
    <Box
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
      {icons[iconName as keyof typeof icons] || (
        <AccountBalanceWalletOutlinedIcon fontSize="small" />
      )}
    </Box>
  );
}
