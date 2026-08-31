import { useMemo } from 'react';
import { Box, Typography, IconButton, FormHelperText } from '@mui/material';
import { Control, Controller, FieldErrors, Path, FieldValues } from 'react-hook-form';
import { finIcons, FinIconType } from './FinIcons.data';

interface IconPickerProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  label?: string;
  disabled?: boolean;
}

export function IconPicker<TFieldValues extends FieldValues>({
  name,
  control,
  errors,
  label = 'Ícone',
  disabled,
}: IconPickerProps<TFieldValues>) {
  const iconKeys = useMemo(() => Object.keys(finIcons) as FinIconType[], []);
  const fieldError = errors[name];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        rules={{ required: 'Selecione um ícone' }}
        render={({ field }) => (
          <Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: 1,
                maxHeight: 180,
                overflowY: 'auto',
                p: 1,
                border: '1px solid',
                borderColor: fieldError ? 'error.main' : 'divider',
                borderRadius: 1,
              }}
            >
              {iconKeys.map((key) => {
                const isSelected = field.value === key;
                return (
                  <IconButton
                    key={key}
                    disabled={disabled}
                    onClick={() => field.onChange(key)}
                    sx={{
                      borderRadius: 2,
                      bgcolor: isSelected ? 'action.selected' : 'transparent',
                      border: isSelected ? '2px solid' : '1px solid transparent',
                      borderColor: isSelected ? 'primary.main' : 'transparent',
                      color: isSelected ? 'primary.main' : 'text.secondary',
                    }}
                  >
                    {finIcons[key]}
                  </IconButton>
                );
              })}
            </Box>
            {fieldError && <FormHelperText error>{fieldError.message as string}</FormHelperText>}
          </Box>
        )}
      />
    </Box>
  );
}
