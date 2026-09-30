'use client';

import { Container, Stack, useMediaQuery, useTheme } from '@mui/material';
import ResponsiveMenu from './Menu/ResponsiveMenu';
import { AppNavBar } from './Searchbar/AppNavBar';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function LayoutContainer({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const router = useRouter();
  const pathName = usePathname();
  const breadcrumbs = ['finmanager', ...pathName.split('/').filter(Boolean)];

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const onMobileMenuOpen = () => {
    setMenuOpen(true);
  };

  const onMobileClose = () => {
    setMenuOpen(false);
  };

  const onNavigate = (path: string, replace?: boolean) => {
    if (replace) {
      router.replace(path);
    } else {
      router.push(path);
    }
  };

  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'row', minHeight: '70vh', minWidth: '100%' }}
      disableGutters
    >
      <ResponsiveMenu
        currentPath={pathName}
        isMobile={isMobile}
        mobileOpen={isMenuOpen}
        onMobileClose={onMobileClose}
        onNavigate={onNavigate}
      />
      <Stack sx={{ flexGrow: 1, minHeight: '100%' }} spacing={2}>
        {/* TODO search bar logic */}
        <AppNavBar onMobileMenuOpen={onMobileMenuOpen} breadcrumbs={breadcrumbs} />

        {children}
      </Stack>
    </Container>
  );
}
