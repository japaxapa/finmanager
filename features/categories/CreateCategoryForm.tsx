'use client';

import { useCreateCategory } from '@/shared/hooks/useCategories';
import { Enums } from '@/shared/lib/supabase/types/supabase';
import { cn } from '@/shared/lib/utils';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';

type Inputs = {
  name: string;
  type: Enums<'category_type'>;
};

interface ICreateCategoryForm extends React.ComponentPropsWithoutRef<'div'> {
  handleClose: () => void;
}

const types = [
  {
    value: 'income',
    label: 'Income',
  },
  {
    value: 'expense',
    label: 'Expense',
  },
];

export function CreateCategoryForm({ handleClose, className, ...props }: ICreateCategoryForm) {
  const { mutate, isPending, isSuccess } = useCreateCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { name: '', type: undefined } });
  const onSubmit: SubmitHandler<Inputs> = (inputData) => {
    mutate(inputData);
  };

  const handleReset = () => {
    reset();
    handleClose();
  };

  useEffect(() => {
    if (isSuccess) {
      handleReset();
    }
  }, [isSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isPending ? (
        <CircularProgress color="inherit" />
      ) : (
        <div className={cn('flex flex-col gap-6 p-6', className)} {...props}>
          <TextField
            id="new-category-name"
            label="Name"
            defaultValue=""
            placeholder="Category name"
            {...register('name', { required: true })}
          />
          {errors.name && <Typography color="error">Name is required</Typography>}

          <TextField
            id="new-category-type"
            select
            label="Select type"
            defaultValue={''}
            helperText="Selecione o tipo de categoria"
            {...register('type', { required: true })}
          >
            {types.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {errors.type && <Typography color="error">Type is required</Typography>}

          <Fab
            onClick={handleReset}
            sx={{ position: 'absolute', right: -18, top: -18 }}
            size="small"
          >
            X
          </Fab>
          <div className="flex flex-row gap-6">
            <Button type="button" onClick={handleReset}>
              Cancelar
            </Button>
            <Button variant="outlined" type="submit">
              Salvar
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
