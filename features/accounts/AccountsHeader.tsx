import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function AccountHeader() {
  {
    /* Page Header */
  }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
      <Typography variant="h4" color="#ffffff" sx={{ fontWeight: 700 }}>
        Contas
      </Typography>
      {/* TODO check if there is a need to create this button as a component */}
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          bgcolor: '#2563EB',
          '&:hover': { bgcolor: '#1D4ED8' },
          textTransform: 'none',
          borderRadius: 2,
          px: 2.5,
          py: 1,
          fontWeight: 600,
          color: 'text.primary',
        }}
      >
        Nova conta
      </Button>
    </Box>
  );
}
