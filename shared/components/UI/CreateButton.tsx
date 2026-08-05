import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface ICreateButton {
  title: string;
  handleClick?: () => void;
}

export default function CreateButton({ title, handleClick }: ICreateButton) {
  return (
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={handleClick}
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
      {title}
    </Button>
  );
}
