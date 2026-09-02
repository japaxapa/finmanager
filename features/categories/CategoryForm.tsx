'use client';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Box, Button, MenuItem, TextField, InputAdornment } from '@mui/material';

import { useCreateCategory, useUpdateCategory } from '@/shared/hooks/useCategories';
import { FinIconType } from '@/shared/components/UI/FinIcons.data';
import { Enums } from '@/shared/lib/supabase/types/supabase';
import { CategoryUpdate } from '@/shared/lib/supabase/types/types';
import { ColorPicker } from '@/shared/components/UI/ColorPicker';
import { IconPicker } from '@/shared/components/UI/IconPicker';

type Inputs = {
  name: string;
  type: Enums<'category_type'>;
  icon: FinIconType;
  color: string;
  budget_goal: number;
};

interface ICategoryFormProps {
  handleClose: () => void;
  entityToEdit?: CategoryUpdate;
}

const CATEGORY_TYPES = [
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
];

export function CategoryForm({ handleClose, entityToEdit, ...props }: ICategoryFormProps) {
  const isEditing = Boolean(entityToEdit);

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
    defaultValues: entityToEdit
      ? {
          name: entityToEdit.name ?? '',
          type: (entityToEdit.type as Enums<'category_type'>) ?? 'expense',
          icon: (entityToEdit.icon as FinIconType) ?? 'category',
          color: entityToEdit.color ?? '#0088FE',
          budget_goal: entityToEdit.budget_goal ?? 0,
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

    if (isEditing && entityToEdit?.id) {
      updateCategory({ id: entityToEdit.id, ...payload }, options);
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
          name={'color'}
          control={control}
          register={register}
          setValue={setValue}
          label="Cor da Categoria"
          disabled={isSubmitting}
        />

        {/* Isolated Icon Picker */}
        <IconPicker name={'icon'} control={control} errors={errors} disabled={isSubmitting} />

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
