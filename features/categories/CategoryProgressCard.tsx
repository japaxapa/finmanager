import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Avatar,
  LinearProgress,
  Chip,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; // Ícone de opções

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
  icon: React.ReactNode;
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

  // Formatação de moeda para o padrão brasileiro (R$)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
      .format(value)
      .replace(/^R\$\s?/, 'R$ '); // Garante o espaço padrão visto no print
  };

  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: 'background.paper', // Garanta que seu tema dark esteja configurado
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
        <Stack spacing={3}>
          {/* Cabeçalho: Ícone, Nomes e Menu */}
          <Stack direction="row" sx={{ alignItems: 'start', justifyContent: 'space-between' }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              {/* Avatar com ícone e cor de fundo suave */}
              <Avatar
                sx={{
                  bgcolor: isOverBudget ? 'error.lighter' : `${color}15`, // Opacidade de ~8% da cor base
                  color: effectiveColor,
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                }}
              >
                {icon}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 600 }}>
                  {categoryName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {transactionCount} transações
                </Typography>
              </Box>
            </Stack>
            {/* Ícone de opções (três pontos) */}
            <MoreHorizIcon sx={{ color: 'text.secondary', cursor: 'pointer' }} />
          </Stack>

          {/* Seção de Valores e Progresso */}
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
              <Typography variant="body2" color="text.secondary">
                de {formatCurrency(budgetGoal)}
              </Typography>
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

          {/* Tag de Aviso (Exibida apenas se estiver acima do orçamento) */}
          {isOverBudget && (
            <Box sx={{ mt: 1 }}>
              <Chip
                label="Acima do orçamento"
                variant="outlined"
                size="small"
                sx={{
                  color: 'error.main',
                  borderColor: 'error.main',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  borderRadius: 1,
                }}
              />
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CategoryProgressCard;
