import { PRESET_COLORS } from '@/shared/constants/forms.constants';
import { Box, Typography, TextField } from '@mui/material';
import {
  Control,
  Path,
  PathValue,
  useWatch,
  UseFormRegister,
  UseFormSetValue,
  FieldValues,
} from 'react-hook-form';

interface ColorPickerProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  label?: string;
  disabled?: boolean;
}

export function ColorPicker<TFieldValues extends FieldValues>({
  name,
  control,
  register,
  setValue,
  label = 'Cor',
  disabled,
}: ColorPickerProps<TFieldValues>) {
  const selectedColor = useWatch({ control, name });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <TextField
          type="color"
          size="small"
          disabled={disabled}
          sx={{ width: 64, '& input': { cursor: 'pointer', height: 40, p: 0.5 } }}
          {...register(name, { required: true })}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {PRESET_COLORS.map((hex) => (
            <Box
              key={hex}
              onClick={() =>
                !disabled && setValue(name, hex as PathValue<TFieldValues, Path<TFieldValues>>)
              }
              sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                bgcolor: hex,
                cursor: disabled ? 'default' : 'pointer',
                border: selectedColor === hex ? '2px solid black' : '1px solid transparent',
                transition: 'transform 0.1s',
                '&:hover': { transform: disabled ? 'none' : 'scale(1.1)' },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
