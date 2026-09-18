import React from 'react';
import { Breadcrumbs, Typography } from '@mui/material';

export interface NavBreadcrumbsProps {
  items: string[];
}

export const NavBreadcrumbs: React.FC<NavBreadcrumbsProps> = ({ items }) => (
  <Breadcrumbs separator="/" aria-label="breadcrumb" sx={{ color: 'text.secondary' }}>
    {items.map((item, index) => {
      const isLast = index === items.length - 1;
      return (
        <Typography
          key={item}
          variant="body2"
          sx={{
            color: isLast ? 'text.primary' : 'text.secondary',
            fontWeight: isLast ? 600 : 400,
            fontSize: '0.875rem',
          }}
        >
          {item}
        </Typography>
      );
    })}
  </Breadcrumbs>
);
