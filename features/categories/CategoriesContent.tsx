'use client';

import { Box, ButtonGroup, Grid } from '@mui/material';
import CategoryProgressCard from './CategoryCard/CategoryProgressCard';
import { useCategories } from '@/shared/hooks/useCategories';
import { useState } from 'react';
import { Enums } from '@/shared/lib/supabase/types/supabase';
import { FilterButton } from '@/shared/components/UI/FilterButton';
import { Category, CategoryUpdate } from '@/shared/lib/supabase/types/types';
import CategoryDeleteModal from './CategoryDeleteModal';
import CategoryModal from './CategoryModal';

export default function CategoriesContet() {
  {
    /* Filter Section (Despesas / Receitas) */
  }

  const [activeTab, setActiveTab] = useState<Enums<'category_type'>>('expense');
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryUpdate | undefined>(undefined);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | undefined>(undefined);

  const { data: categories } = useCategories(activeTab);

  const handleClose = () => {
    setModalOpen(false);
    setCategoryToEdit(undefined);
    setCategoryToDelete(undefined);
  };

  const onEdit = (category: CategoryUpdate) => {
    setModalOpen(true);
    setCategoryToEdit(category);
  };

  const onDelete = (category: Category) => {
    setCategoryToDelete(category);
  };

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
                category={cat}
                transactionCount={0}
                currentSpending={0}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </Grid>
          ))}
      </Grid>
      <CategoryModal
        title="Editar Categoria"
        categoryToEdit={categoryToEdit}
        open={modalOpen}
        handleClose={handleClose}
      />

      <CategoryDeleteModal selectedCategory={categoryToDelete} handleClose={handleClose} />
    </>
  );
}
