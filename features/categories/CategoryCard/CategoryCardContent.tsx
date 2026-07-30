import { formatCurrency } from '@/shared/lib/utils';
import { Box, Stack, Typography, LinearProgress } from '@mui/material';

interface ICategoryCardContent {
  isOverBudget: boolean;
  currentSpending: number;
  budgetGoal: number;
  progressPercentage: number;
  effectiveColor: string;
}

export default function CategoryCardContent({
  isOverBudget,
  currentSpending,
  budgetGoal,
  progressPercentage,
  effectiveColor,
}: ICategoryCardContent) {
  {
    /* Seção de Valores e Progresso */
  }
  return (
    <Box>
      <Stack
        direction="row"
        sx={{ alignItems: 'baseline', justifyContent: 'space-between', mb: 1 }}
      >
        {/* Valor gasto atual (Fica vermelho se estourar) */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 700 }}
          color={isOverBudget ? 'error.main' : 'text.primary'}
        >
          {formatCurrency(currentSpending)}
        </Typography>

        {/* Valor do orçamento total */}
        {budgetGoal != 0 && (
          <Typography variant="body2" color="text.secondary">
            de {formatCurrency(budgetGoal)}
          </Typography>
        )}
      </Stack>

      {/* Barra de Progresso MUI com estilização dinâmica */}
      <LinearProgress
        variant="determinate"
        value={progressPercentage}
        sx={{
          height: 8,
          borderRadius: 4,
          bgcolor: 'action.hover', // Cor do fundo da barra
          '& .MuiLinearProgress-bar': {
            bgcolor: effectiveColor, // Cor do preenchimento
            borderRadius: 4,
          },
        }}
      />
    </Box>
  );
}
