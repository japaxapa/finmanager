import { Stack, Typography } from '@mui/material';
import CategoryModal from './CategoryModal';

export default function CategoryHeader() {
  {
    /* Page Header Section */
  }

  return (
    <Stack direction="row" sx={{ mb: 4, alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant="h4" sx={{ color: '#f3f4f6', fontWeight: 700 }}>
        Categorias
      </Typography>

      <CategoryModal />
    </Stack>
  );
}
