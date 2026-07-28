'use client';
import { Box, Container, styled, SxProps } from '@mui/material';

// 2. Custom Styled Components for consistent dark theme
const StyledBox = styled(Box)(() => ({
  backgroundColor: '#0a0d14', // Very dark background from screenshot
  minHeight: '100vh',
  color: '#e5e7eb',
  fontFamily: 'sans-serif',
}));

export default function PageBackground({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: SxProps;
}) {
  return (
    <StyledBox sx={{ px: 4, py: 5, ...sx }}>
      {/* Container is used to centralize and provide side padding */}
      <Container maxWidth="xl" disableGutters>
        {children}
      </Container>
    </StyledBox>
  );
}
