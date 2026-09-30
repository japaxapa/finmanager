'use client';

import { PropsWithChildren } from 'react';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from '@mui/material/styles';
import { globalTheme } from '@/shared/lib/mui.theme';
import GlobalToaster from '@/shared/lib/toaster';
import { CssBaseline } from '@mui/material';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={globalTheme}>
      <QueryProvider>
        <CssBaseline />
        <GlobalToaster />
        {children}
      </QueryProvider>
    </ThemeProvider>
  );
}
