'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  ButtonGroup,
  styled,
  alpha,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import FastfoodIcon from '@mui/icons-material/Restaurant';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CodeIcon from '@mui/icons-material/Code';
import CategoryProgressCard from '@/features/categories/CategoryProgressCard';

// Assuming this component is imported from your existing code

// 1. Mock Data based on the screenshot
// This replicates the specific values, colors, and order from the image.
const mockCategories = [
  {
    categoryName: 'Moradia',
    transactionCount: 8,
    currentSpending: 3200,
    budgetGoal: 3500,
    icon: <HomeIcon />,
    color: '#38bdf8', // Light Blue
  },
  {
    categoryName: 'Alimentação',
    transactionCount: 34,
    currentSpending: 2100, // This is over budget
    budgetGoal: 2000,
    icon: <FastfoodIcon />,
    color: '#ef4444', // Red
  },
  {
    categoryName: 'Transporte',
    transactionCount: 12,
    currentSpending: 1400,
    budgetGoal: 1800,
    icon: <DirectionsCarIcon />,
    color: '#0284c7', // Darker Blue
  },
  {
    categoryName: 'Lazer',
    transactionCount: 9,
    currentSpending: 1420,
    budgetGoal: 1500,
    icon: <SportsEsportsIcon />,
    color: '#fbbf24', // Yellow
  },
  {
    categoryName: 'Compras',
    transactionCount: 6,
    currentSpending: 820,
    budgetGoal: 1200,
    icon: <ShoppingBagIcon />,
    color: '#a78bfa', // Purple
  },
  {
    categoryName: 'Software',
    transactionCount: 5,
    currentSpending: 340,
    budgetGoal: 500,
    icon: <CodeIcon />,
    color: '#06b6d4', // Teal
  },
];

// 2. Custom Styled Components for consistent dark theme
const PageBackground = styled(Box)(() => ({
  backgroundColor: '#0a0d14', // Very dark background from screenshot
  minHeight: '100vh',
  color: '#e5e7eb',
  fontFamily: 'sans-serif',
}));

const FilterButton = styled(Button)<{ selected?: boolean }>(({ selected }) => ({
  textTransform: 'none',
  paddingLeft: 16,
  paddingRight: 16,
  color: selected ? '#e5e7eb' : '#6b7280',
  backgroundColor: selected ? '#22252a' : 'transparent',
  borderColor: '#22252a',
  borderRadius: '8px !important', // Match the UI rounding
  fontWeight: selected ? 600 : 400,
  '&:hover': {
    backgroundColor: selected ? '#2a2e35' : alpha('#2a2e35', 0.5),
    borderColor: '#22252a',
  },
}));

// 3. The Page Implementation Component
export const CategoryDashboardPage: React.FC = () => {
  return (
    <PageBackground sx={{ px: 4, py: 5 }}>
      {/* Container is used to centralize and provide side padding */}
      <Container maxWidth="xl" disableGutters>
        {/* Page Header Section */}
        <Stack
          direction="row"
          sx={{ mb: 4, alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Typography variant="h4" sx={{ color: '#f3f4f6', fontWeight: 700 }}>
            Categorias
          </Typography>
          <Button
            variant="contained"
            disableElevation
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: '#1d4ed8', // Blue primary color
              borderRadius: '8px',
              textTransform: 'none',
              px: 3,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#2563eb',
              },
            }}
          >
            Nova categoria
          </Button>
        </Stack>

        {/* Filter Section (Despesas / Receitas) */}
        <Box sx={{ mb: 5 }}>
          <ButtonGroup variant="outlined" sx={{ borderRadius: '8px' }}>
            <FilterButton selected>Despesas</FilterButton>
            <FilterButton>Receitas</FilterButton>
          </ButtonGroup>
        </Box>

        {/* Grid Container for Categories */}
        {/* We use a responsive grid that shows 3 columns on medium screens and up, 
            stacking on smaller devices */}
        <Grid container spacing={3}>
          {mockCategories.map((cat, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              {/* This is the component you already have. We are mocking its appearance by passing 
                  realistic dark-theme specific colors from the screenshot data. */}
              <CategoryProgressCard
                categoryName={cat.categoryName}
                transactionCount={cat.transactionCount}
                currentSpending={cat.currentSpending}
                budgetGoal={cat.budgetGoal}
                icon={cat.icon}
                color={cat.color}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </PageBackground>
  );
};

export default CategoryDashboardPage;
