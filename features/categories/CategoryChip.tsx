import { useDeleteCategory } from '@/shared/hooks/useCategories';
import { Enums } from '@/shared/lib/supabase/types/supabase';
import { Category } from '@/shared/lib/supabase/types/types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

interface ICategoryChip {
  category: Category;
  enableDelete: boolean;
}

export default function CategoryChip({ category, enableDelete }: ICategoryChip) {
  const { mutate, isPending } = useDeleteCategory();

  const handleDelete = () =>
    mutate({ name: category.name, type: category.type as Enums<'category_type'> });

  return (
    <Box sx={{ position: 'relative' }}>
      {enableDelete && !isPending && (
        <Button
          onClick={handleDelete}
          size="small"
          variant="contained"
          sx={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            minWidth: 0,
            padding: 0,
            textTransform: 'none',
            position: 'absolute',
            right: -10,
            top: -10,
            bgcolor: 'red',
          }}
        >
          X
        </Button>
      )}
      <Chip label={category.name} />
    </Box>
  );
}
