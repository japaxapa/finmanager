import { Button } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

interface FilterButtonProps {
  selected?: boolean;
}

export const FilterButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<FilterButtonProps>(({ selected }) => ({
  textTransform: 'none',
  paddingLeft: 16,
  paddingRight: 16,
  color: selected ? '#e5e7eb' : '#6b7280',
  backgroundColor: selected ? '#22252a' : 'transparent',
  borderColor: '#22252a',
  borderRadius: 8,
  fontWeight: selected ? 600 : 400,
  '&:hover': {
    backgroundColor: selected ? '#2a2e35' : alpha('#2a2e35', 0.5),
    borderColor: '#22252a',
  },
}));
