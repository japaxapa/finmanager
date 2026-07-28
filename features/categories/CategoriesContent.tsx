'use client';

import { alpha, Box, Button, ButtonGroup, Grid, styled } from '@mui/material';
import CategoryProgressCard from './CategoryProgressCard';
import { mockCategories } from './mock.data';

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

export default function CategoriesContet() {
  {
    /* Filter Section (Despesas / Receitas) */
  }
  return (
    <>
      <Box sx={{ mb: 5 }}>
        <ButtonGroup variant="outlined" sx={{ borderRadius: '8px' }}>
          <FilterButton selected>Despesas</FilterButton>
          <FilterButton>Receitas</FilterButton>
        </ButtonGroup>
      </Box>
      {/* Grid Container for Categories */}
      <Grid container spacing={3}>
        {mockCategories.map((cat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
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
    </>
  );
}
