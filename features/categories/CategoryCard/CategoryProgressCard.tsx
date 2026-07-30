import React from 'react';
import { Card, CardContent, Box } from '@mui/material';
import ErrorChip from './ErrorChip';
import CategoryCardContent from './CategoryCardContent';
import CategoryCardHeader from './CategoryCardHeader';

export interface CategoryProgressCardProps {
  /** Nome da categoria (ex: "Alimentação") */
  categoryName: string;
  /** Quantidade de transações */
  transactionCount: number;
  /** Valor total gasto atualmente (em Reais) */
  currentSpending: number;
  /** Valor total do orçamento definido (em Reais) */
  budgetGoal: number;
  /** Ícone da categoria (componente React, ex: <RestaurantIcon />) */
  icon: string;
  /** Cor base da categoria (para o ícone e barra de progresso) */
  color: string;
}

export const CategoryProgressCard: React.FC<CategoryProgressCardProps> = ({
  categoryName,
  transactionCount,
  currentSpending,
  budgetGoal,
  icon,
  color,
}) => {
  // Verificação de estouro de orçamento
  const isOverBudget = currentSpending > budgetGoal;

  // Cálculo do progresso (limitado a 100% para a barra visual)
  const progressPercentage = Math.min((currentSpending / budgetGoal) * 100, 100);

  // Definição das cores dinâmicas
  const effectiveColor = isOverBudget ? 'error.main' : color;
  // const progressColor = isOverBudget ? 'error' : 'primary'; // Usamos o color prop do LinearProgress ou customizamos

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
            categoryName={categoryName}
            color={color}
            effectiveColor={effectiveColor}
            icon={icon}
            isOverBudget={isOverBudget}
            transactionCount={transactionCount}
          />

          <CategoryCardContent
            budgetGoal={budgetGoal}
            currentSpending={currentSpending}
            effectiveColor={effectiveColor}
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
