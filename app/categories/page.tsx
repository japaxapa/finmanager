import React from 'react';
import PageBackground from '@/shared/components/PageBackground';
import CategoryHeader from '@/features/categories/CategoryHeader';
import CategoriesContent from '@/features/categories/CategoriesContent';

// 3. The Page Implementation Component
export const CategoriesPage: React.FC = () => {
  return (
    <PageBackground sx={{ px: 4, py: 5 }}>
      <CategoryHeader />
      <CategoriesContent />
    </PageBackground>
  );
};

export default CategoriesPage;
