import Chip from '@mui/material/Chip';

interface ICategoryChip {
  title: string;
}

export default function CategoryChip({ title }: ICategoryChip) {
  return <Chip label={title} />;
}
