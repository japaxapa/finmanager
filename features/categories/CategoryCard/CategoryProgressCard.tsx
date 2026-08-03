import React from 'react';
import { Card, CardContent, Box } from '@mui/material';
import ErrorChip from './ErrorChip';
import CategoryCardContent from './CategoryCardContent';
import CategoryCardHeader from './CategoryCardHeader';
import { Category, CategoryUpdate } from '@/shared/lib/supabase/types/types';

export interface CategoryProgressCardProps {
  category: Category;
  transactionCount: number;
  currentSpending: number;
  onEdit: (category: CategoryUpdate) => void;
}

export const CategoryProgressCard: React.FC<CategoryProgressCardProps> = ({
  category,
  transactionCount,
  currentSpending,
  onEdit,
}) => {
  // Verificação de estouro de orçamento
  const isOverBudget = category.budget_goal ? currentSpending > category.budget_goal : false;

  // Cálculo do progresso (limitado a 100% para a barra visual)
  const progressPercentage = category.budget_goal
    ? Math.min((currentSpending / category.budget_goal) * 100, 100)
    : 0;

  // Definição das cores dinâmicas
  const effectiveColor = isOverBudget ? 'error.main' : category.color;
  // const progressColor = isOverBudget ? 'error' : 'primary'; // Usamos o color prop do LinearProgress ou customizamos

  const handleEdit = () => {
    onEdit(category);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 3,
        borderColor: isOverBudget ? 'error.main' : 'divider',
        position: 'relative',
        minWidth: 300,
        '&:hover': {
          borderColor: isOverBudget ? 'error.main' : 'primary.main',
        },
      }}
    >
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <CategoryCardHeader
            categoryName={category.name}
            color={category.color || '#FFF'}
            effectiveColor={effectiveColor || 'error.main'}
            icon={category.icon || ''}
            isOverBudget={isOverBudget}
            transactionCount={transactionCount}
            onEdit={handleEdit}
          />

          <CategoryCardContent
            budgetGoal={category.budget_goal || 0}
            currentSpending={currentSpending}
            effectiveColor={effectiveColor || '#FFF'}
            isOverBudget={isOverBudget}
            progressPercentage={progressPercentage}
          />

          <ErrorChip isOverBudget={isOverBudget} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CategoryProgressCard;
