'use client';

import { Box, ButtonGroup, Grid } from '@mui/material';
import CategoryProgressCard from './CategoryCard/CategoryProgressCard';
import { useCategories } from '@/shared/hooks/useCategories';
import { useState } from 'react';
import { Enums } from '@/shared/lib/supabase/types/supabase';
import { FilterButton } from '@/shared/components/UI/FilterButton';

export default function CategoriesContet() {
  {
    /* Filter Section (Despesas / Receitas) */
  }

  const [activeTab, setActiveTab] = useState<Enums<'category_type'>>('expense');
  const { data: categories } = useCategories(activeTab);

  const handleClick = (type: Enums<'category_type'>) => {
    setActiveTab(type);
  };

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <ButtonGroup variant="outlined" sx={{ borderRadius: '8px', display: 'flex' }}>
          <FilterButton selected={activeTab == 'expense'} onClick={() => handleClick('expense')}>
            Despesas
          </FilterButton>
          <FilterButton selected={activeTab == 'income'} onClick={() => handleClick('income')}>
            Receitas
          </FilterButton>
        </ButtonGroup>
      </Box>
      {/* Grid Container for Categories */}
      <Grid container spacing={3}>
        {categories &&
          categories?.data?.map((cat, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <CategoryProgressCard
                categoryName={cat.name}
                transactionCount={0}
                currentSpending={0}
                budgetGoal={cat.budget_goal || 0}
                icon={cat.icon || ''}
                color={cat.color || '#fff'}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
}
