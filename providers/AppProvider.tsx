'use client';

import { PropsWithChildren } from 'react';
import { QueryProvider } from './QueryProvider';
import GlobalToaster from '@/shared/lib/toaster';
import AppThemeProvider from './AppThemeProvider';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <AppThemeProvider>
      <QueryProvider>
        <GlobalToaster />
        {children}
      </QueryProvider>
    </AppThemeProvider>
  );
}
