'use client';

import { useMemo } from 'react';
import { useForm, SubmitHandler, Controller, useWatch, Control } from 'react-hook-form';
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  FormHelperText,
  InputAdornment,
} from '@mui/material';

import { useCreateCategory, useUpdateCategory } from '@/shared/hooks/useCategories';
import { FinIconType, finIcons } from '@/shared/components/UI/FinIcons.data';
import { Enums } from '@/shared/lib/supabase/types/supabase';
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
  categoryToEdit?: CategoryUpdate;
}

const CATEGORY_TYPES = [
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
  const isSubmitting = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: categoryToEdit
      ? {
          name: categoryToEdit.name ?? '',
          type: (categoryToEdit.type as Enums<'category_type'>) ?? 'expense',
          icon: (categoryToEdit.icon as FinIconType) ?? 'category',
          color: categoryToEdit.color ?? '#0088FE',
          budget_goal: categoryToEdit.budget_goal ?? 0,
        }
      : {
          name: '',
          type: 'expense',
          icon: 'category',
          color: '#0088FE',
          budget_goal: 0,
        },
  });

  const handleReset = () => {
    reset();
    handleClose();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const payload = {
      ...data,
      budget_goal: Number(data.budget_goal),
      user_id: '',
    };

    const options = {
      onSuccess: handleReset,
    };

    if (isEditing && categoryToEdit?.id) {
      updateCategory({ id: categoryToEdit.id, ...payload }, options);
    } else {
      createCategory(payload, options);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, px: 6, py: 3 }} {...props}>
        {/* Category Name */}
        <TextField
          id="category-name"
          label="Nome"
          placeholder="Nome da categoria"
          disabled={isSubmitting}
          error={Boolean(errors.name)}
          helperText={errors.name ? 'Nome é obrigatório' : ''}
          {...register('name', { required: true })}
        />

        {/* Category Type (Create only) */}
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
                disabled={isSubmitting}
                error={Boolean(errors.type)}
                helperText={errors.type?.message || 'Selecione o tipo de categoria'}
              >
                {CATEGORY_TYPES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        )}

        {/* Budget Goal */}
        <TextField
          id="category-budget-goal"
          label="Meta de Orçamento"
          type="number"
          placeholder="0.00"
          disabled={isSubmitting}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            },
          }}
          error={Boolean(errors.budget_goal)}
          helperText={errors.budget_goal ? 'Insira um valor válido' : ''}
          {...register('budget_goal', {
            required: true,
            min: { value: 0, message: 'O valor deve ser maior ou igual a 0' },
            valueAsNumber: true,
          })}
        />

        {/* Isolated Color Picker */}
        <ColorPicker
          control={control}
          register={register}
          setValue={setValue}
          disabled={isSubmitting}
        />

        {/* Isolated Icon Picker */}
        <IconPicker control={control} errors={errors} disabled={isSubmitting} />

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button type="button" color="inherit" onClick={handleReset} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : isEditing ? 'Atualizar' : 'Salvar'}
          </Button>
        </Box>
      </Box>
    </form>
  );
}

// TODO checar se é necessário fazer a abstração destes componentes para reutilizar em outros formulários
// --- Sub-Components ---

interface ColorPickerProps {
  control: Control<Inputs>;
  register: ReturnType<typeof useForm<Inputs>>['register'];
  setValue: ReturnType<typeof useForm<Inputs>>['setValue'];
  disabled?: boolean;
}

function ColorPicker({ control, register, setValue, disabled }: ColorPickerProps) {
  const selectedColor = useWatch({ control, name: 'color' });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
        Cor da Categoria
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <TextField
          type="color"
          size="small"
          disabled={disabled}
          sx={{ width: 64, '& input': { cursor: 'pointer', height: 40, p: 0.5 } }}
          {...register('color', { required: true })}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {PRESET_COLORS.map((hex) => (
            <Box
              key={hex}
              onClick={() => !disabled && setValue('color', hex)}
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

interface IconPickerProps {
  control: Control<Inputs>;
  errors: ReturnType<typeof useForm<Inputs>>['formState']['errors'];
  disabled?: boolean;
}

function IconPicker({ control, errors, disabled }: IconPickerProps) {
  const iconKeys = useMemo(() => Object.keys(finIcons) as FinIconType[], []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
            {errors.icon && <FormHelperText error>{errors.icon.message}</FormHelperText>}
          </Box>
        )}
      />
    </Box>
  );
}
