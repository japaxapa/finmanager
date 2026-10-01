import React from 'react';
import PageBackground from '@/shared/components/Layout/PageBackground';
import CategoryHeader from '@/features/categories/CategoryHeader';
import CategoriesContent from '@/features/categories/CategoriesContent';

export const CategoriesPage: React.FC = () => {
  return (
    <PageBackground sx={{ px: 4, py: 5, bgcolor: 'background.default' }}>
      <CategoryHeader />
      <CategoriesContent />
    </PageBackground>
  );
};

export default CategoriesPage;
