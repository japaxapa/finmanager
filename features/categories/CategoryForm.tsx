'use client';

import { useCreateCategory, useUpdateCategory } from '@/shared/hooks/useCategories';
import { Enums } from '@/shared/lib/supabase/types/supabase';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import { FinIconType, finIcons } from '@/shared/components/UI/FinIcons.data';
import { CategoryUpdate } from '@/shared/lib/supabase/types/types';

type Inputs = {
  name: string;
  type: Enums<'category_type'>;
  icon: FinIconType;
  color: string;
  budget_goal: number;
};

interface ICategoryFormProps {
  handleClose: () => void;
  categoryToEdit?: CategoryUpdate | undefined;
}

const types = [
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
];

const PRESET_COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884d8',
  '#E91E63',
  '#9C27B0',
  '#4CAF50',
];

export function CategoryForm({ handleClose, categoryToEdit, ...props }: ICategoryFormProps) {
  const isEditing = Boolean(categoryToEdit);

  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();

  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: categoryToEdit
      ? {
          ...categoryToEdit,
          type: categoryToEdit?.type as Enums<'category_type'>,
          icon: categoryToEdit?.icon as FinIconType,
          color: categoryToEdit?.color || '#0088FE',
          budget_goal: categoryToEdit?.budget_goal || 0,
        }
      : {
          name: '',
          type: 'expense',
          icon: 'category',
          color: '#0088FE',
          budget_goal: 0,
        },
  });

  const selectedColor = watch('color');

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const payload = {
      ...data,
      budget_goal: Number(data.budget_goal),
      user_id: '',
    };

    if (isEditing && categoryToEdit) {
      updateCategory(
        { id: categoryToEdit.id, ...payload },
        {
          onSuccess: () => {
            {
              handleReset();
            }
          },
        },
      );
    } else {
      createCategory(payload, {
        onSuccess: () => {
          {
            handleReset();
          }
        },
      });
    }
  };

  const handleReset = () => {
    reset();
    handleClose();
  };

  if (isCreating || isUpdating) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, px: 6, py: 3 }} {...props}>
        {/* Name Field */}
        <TextField
          id="category-name"
          label="Nome"
          placeholder="Nome da categoria"
          error={!!errors.name}
          helperText={errors.name ? 'Nome é obrigatório' : ''}
          {...register('name', { required: true })}
        />

        {/* Type Field */}
        {!isEditing && (
          <Controller
            name="type"
            control={control}
            rules={{ required: 'Tipo é obrigatório' }}
            render={({ field }) => (
              <TextField
                {...field}
                id="category-type"
                select
                label="Tipo"
                error={!!errors.type}
                helperText={errors.type ? errors.type.message : 'Selecione o tipo de categoria'}
              >
                {types.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        )}

        {/* Budget Goal Field */}
        <TextField
          id="category-budget-goal"
          label="Meta de Orçamento"
          type="number"
          placeholder="0.00"
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            },
          }}
          error={!!errors.budget_goal}
          helperText={errors.budget_goal ? 'Insira um valor válido' : ''}
          {...register('budget_goal', {
            required: true,
            min: { value: 0, message: 'O valor deve ser maior ou igual a 0' },
            valueAsNumber: true,
          })}
        />

        {/* Color Picker Field */}
        <Box className="flex flex-col gap-2">
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
            Cor da Categoria
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {/* Color Input */}
            <TextField
              type="color"
              size="small"
              sx={{ width: 64, '& input': { cursor: 'pointer', height: 40, p: 0.5 } }}
              {...register('color', { required: true })}
            />
            {/* Quick Color Presets */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {PRESET_COLORS.map((hex) => (
                <Box
                  key={hex}
                  onClick={() => setValue('color', hex)}
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: hex,
                    cursor: 'pointer',
                    border: selectedColor === hex ? '2px solid black' : '1px solid transparent',
                    transition: 'transform 0.1s',
                    '&:hover': { transform: 'scale(1.1)' },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Icon Selector */}
        <Box className="flex flex-col gap-2">
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
            Ícone
          </Typography>
          <Controller
            name="icon"
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
                    borderColor: errors.icon ? 'error.main' : 'divider',
                    borderRadius: 1,
                  }}
                >
                  {(Object.keys(finIcons) as FinIconType[]).map((key) => {
                    const isSelected = field.value === key;
                    return (
                      <IconButton
                        key={key}
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
                {errors.icon && <FormHelperText error>{errors.icon.message}</FormHelperText>}
              </Box>
            )}
          />
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 3 }}>
          <Button type="button" color="inherit" onClick={handleReset}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
            {isEditing ? 'Atualizar' : 'Salvar'}
          </Button>
        </Box>
      </Box>
    </form>
  );
}
