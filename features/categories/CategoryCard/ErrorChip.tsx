import { Box, Chip } from '@mui/material';

export default function ErrorChip({ isOverBudget }: { isOverBudget: boolean }) {
  {
    /* Tag de Aviso (Exibida apenas se estiver acima do orçamento) */
  }
  return (
    <Box>
      <Chip
        label="Acima do orçamento"
        variant="outlined"
        size="small"
        sx={{
          visibility: isOverBudget ? 'visible' : 'hidden',
          color: 'error.main',
          borderColor: 'error.main',
          fontWeight: 500,
          fontSize: '0.75rem',
          borderRadius: 1,
        }}
      />
    </Box>
  );
}
