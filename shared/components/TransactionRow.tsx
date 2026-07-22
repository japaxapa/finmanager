'use client';

import React from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import NorthEastIcon from '@mui/icons-material/NorthEast'; // Top-right arrow
import SouthEastIcon from '@mui/icons-material/SouthEast'; // Down-right arrow

export interface TransactionRowProps {
  title: string;
  date: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  /** Optional custom currency formatter. Defaults to BRL (R$) */
  currencySymbol?: string;
  onClick?: () => void;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({
  title,
  date,
  category,
  amount,
  type,
  currencySymbol = 'R$',
  onClick,
}) => {
  const isIncome = type === 'income';

  // Dynamic colors matching the screenshot palette
  const amountColor = isIncome ? '#10B981' : '#F87171'; // Neon Green vs Muted Red
  const iconBgColor = isIncome ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
  const iconColor = isIncome ? '#10B981' : '#F87171';

  // Format amount to standard Brazilian real / currency format (e.g., 12.000,00)
  const formattedAmount = Math.abs(amount).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background-color 0.15s ease-in-out',
        '&:last-child': {
          borderBottom: 'none',
        },
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
        },
      }}
    >
      {/* Left side: Icon + Title + Date */}
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: iconBgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: iconColor,
            flexShrink: 0,
          }}
        >
          {isIncome ? (
            <NorthEastIcon sx={{ fontSize: 18 }} />
          ) : (
            <SouthEastIcon sx={{ fontSize: 18 }} />
          )}
        </Box>

        <Stack spacing={0.3}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: '#F8FAFC',
              fontSize: '0.925rem',
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: '#64748B',
              fontSize: '0.75rem',
              fontWeight: 500,
            }}
          >
            {date}
          </Typography>
        </Stack>
      </Stack>

      {/* Right side: Category Badge + Amount */}
      <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
        <Chip
          label={category}
          size="small"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: '#94A3B8',
            fontSize: '0.75rem',
            fontWeight: 500,
            borderRadius: '6px',
            height: '24px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            '& .MuiChip-label': {
              px: 1.2,
            },
          }}
        />

        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            color: amountColor,
            fontFamily: 'monospace, monospace', // Terminal-like finance look matching design
            fontSize: '0.95rem',
            minWidth: '110px',
            textAlign: 'right',
          }}
        >
          {isIncome ? `+ ${currencySymbol}` : `- ${currencySymbol}`} {formattedAmount}
        </Typography>
      </Stack>
    </Box>
  );
};
