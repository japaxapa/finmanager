import { ComponentPropsWithRef } from 'react';
import { Box } from '@mui/material';

export default function PageContainer({ children }: ComponentPropsWithRef<'div'>) {
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        color: 'text.primary',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
}
