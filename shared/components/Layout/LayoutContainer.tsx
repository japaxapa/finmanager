'use client';

import { Container, Stack, useColorScheme, useMediaQuery, useTheme } from '@mui/material';
import ResponsiveMenu from '../NavBar/ResponsiveMenu';
import SearchBar from '../NavBar/SearchBar';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function LayoutContainer({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const router = useRouter();
  const pathName = usePathname();

  const { mode, setMode } = useColorScheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const onMobileMenuOpen = () => {
    setMenuOpen(true);
  };

  const onMobileClose = () => {
    setMenuOpen(false);
  };

  const onToggleTheme = () => {
    if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  const onNavigate = (path: string, replace?: boolean) => {
    if (replace) {
      router.replace(path);
    } else {
      router.push(path);
    }
  };

  if (!mode) {
    // TODO check if needs loading
    // TODO implement light mode
    return null;
  }

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
        {/* TODO pass breadcrumbs */}
        {/* TODO search bar logic */}
        <SearchBar onMobileMenuOpen={onMobileMenuOpen} mode={mode} onToggleTheme={onToggleTheme} />

        {children}
      </Stack>
    </Container>
  );
}
