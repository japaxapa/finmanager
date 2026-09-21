import React from 'react';
import { Chip } from '@mui/material';
import { InstitutionTagProps } from '.';

export const InstitutionTag: React.FC<InstitutionTagProps> = ({ description, color }) => {
  if (!description) return null;

  return (
    <Chip
      label={description}
      size="small"
      sx={{
        fontWeight: 600,
        fontSize: '0.75rem',
        bgcolor: color ? `${color}15` : 'action.selected',
        color: color || 'text.primary',
        border: color ? `1px solid ${color}33` : 'none',
        width: '8rem',
      }}
    />
  );
};
