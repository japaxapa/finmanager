import FinIcon from '@/shared/components/UI/FinIcons';
import { Stack, Avatar, Box, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; // Ícone de opções

interface ICategoryCardHeader {
  isOverBudget: boolean;
  color: string;
  effectiveColor: string;
  icon: string;
  categoryName: string;
  transactionCount: number;
}

export default function CategoryCardHeader({
  isOverBudget,
  color,
  effectiveColor,
  icon,
  categoryName,
  transactionCount,
}: ICategoryCardHeader) {
  {
    /* Cabeçalho: Ícone, Nomes e Menu */
  }
  return (
    <Stack direction="row" sx={{ alignItems: 'start', justifyContent: 'space-between' }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        {/* Avatar com ícone e cor de fundo suave */}
        <Avatar
          sx={{
            bgcolor: isOverBudget ? 'error.lighter' : `${color}15`,
            color: effectiveColor,
            width: 48,
            height: 48,
            borderRadius: 2,
          }}
        >
          {FinIcon(icon)}
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
  );
}
