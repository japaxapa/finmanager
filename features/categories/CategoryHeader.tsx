import { Stack, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function CategoryHeader() {
  {
    /* Page Header Section */
  }

  return (
    <Stack direction="row" sx={{ mb: 4, alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant="h4" sx={{ color: '#f3f4f6', fontWeight: 700 }}>
        Categorias
      </Typography>
      <Button
        variant="contained"
        disableElevation
        startIcon={<AddIcon />}
        sx={{
          backgroundColor: '#1d4ed8', // Blue primary color
          borderRadius: '8px',
          textTransform: 'none',
          px: 3,
          fontWeight: 600,
          '&:hover': {
            backgroundColor: '#2563eb',
          },
        }}
      >
        Nova categoria
      </Button>
    </Stack>
  );
}
