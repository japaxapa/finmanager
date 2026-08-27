'use client';

import FinIcon from '@/shared/components/UI/FinIcons';
import { Stack, Avatar, Box, Typography } from '@mui/material';
import { OptionsMenu } from '@/shared/components/UI/OptionsMenu';

interface ICategoryCardHeader {
  isOverBudget: boolean;
  color: string;
  effectiveColor: string;
  icon: string;
  categoryName: string;
  transactionCount: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function CategoryCardHeader({
  isOverBudget,
  color,
  effectiveColor,
  icon,
  categoryName,
  transactionCount,
  onEdit,
  onDelete,
}: ICategoryCardHeader) {
  const handleEdit = () => {
    if (onEdit) onEdit();
  };

  const handleDelete = () => {
    if (onDelete) onDelete();
  };

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

      {/* Botão de opções com Menu Popover */}
      <OptionsMenu name="category" onEdit={handleEdit} onDelete={handleDelete} />
    </Stack>
  );
}
