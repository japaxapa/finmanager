import { Avatar, Box, Typography } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid'; // Brand Logo Icon
import Link from 'next/link';

export default function LogoButton() {
  {
    /* App Branding Logo Header */
  }

  return (
    <Link href={'/'} className="w-full">
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar
          sx={{
            bgcolor: '#2563EB',
            width: 32,
            height: 32,
            borderRadius: 1.5,
          }}
        >
          <PaidIcon sx={{ fontSize: 20, color: '#FFFFFF' }} />
        </Avatar>
        <Typography
          variant="h6"
          sx={{ color: '#FFFFFF', letterSpacing: '-0.5px', fontWeight: 700 }}
        >
          fin<span style={{ color: '#3B82F6' }}>manager</span>
        </Typography>
      </Box>
    </Link>
  );
}
