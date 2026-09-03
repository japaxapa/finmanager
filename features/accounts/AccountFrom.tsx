'use client';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Box, Button, MenuItem, TextField, InputAdornment } from '@mui/material';

import { useCreateAccount, useUpdateAccount } from '@/shared/hooks/useAccounts';
import { FinIconType } from '@/shared/components/UI/FinIcons.data';
import { ColorPicker } from '@/shared/components/UI/ColorPicker';
import { IconPicker } from '@/shared/components/UI/IconPicker';
import { Account, AccountUpdate } from '@/shared/lib/supabase/types/types';
import { ACCOUNT_TYPES } from '@/shared/constants/forms.constants';

type Inputs = {
  name: string;
  type: string;
  initial_balance: number;
  icon: FinIconType;
  color: string;
};

interface IAccountFormProps {
  handleClose: () => void;
  entityToEdit?: Account | AccountUpdate;
}

export function AccountForm({ handleClose, entityToEdit, ...props }: IAccountFormProps) {
  const isEditing = Boolean(entityToEdit);

  const { mutate: createAccount, isPending: isCreating } = useCreateAccount();
  const { mutate: updateAccount, isPending: isUpdating } = useUpdateAccount();
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
          type: entityToEdit.type ?? 'Corrente',
          initial_balance: entityToEdit.initial_balance ?? 0,
          icon: (entityToEdit.icon as FinIconType) ?? 'wallet',
          color: entityToEdit.color ?? '#0088FE',
        }
      : {
          name: '',
          type: 'Corrente',
          initial_balance: 0,
          icon: 'wallet',
          color: '#0088FE',
        },
  });

  const handleReset = () => {
    reset();
    handleClose();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const payload = {
      ...data,
      initial_balance: Number(data.initial_balance),
    };

    const options = {
      onSuccess: handleReset,
    };

    if (isEditing && entityToEdit?.id) {
      updateAccount({ id: entityToEdit.id, ...payload }, options);
    } else {
      createAccount(payload, options);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, px: 6, py: 3 }} {...props}>
        {/* Account Name */}
        <TextField
          id="account-name"
          label="Nome da Conta"
          placeholder="Ex: Nubank, Cartão C6, Carteira"
          disabled={isSubmitting}
          error={Boolean(errors.name)}
          helperText={errors.name ? 'Nome é obrigatório' : ''}
          {...register('name', { required: true })}
        />

        {/* Account Type */}
        <Controller
          name="type"
          control={control}
          rules={{ required: 'Tipo de conta é obrigatório' }}
          render={({ field }) => (
            <TextField
              {...field}
              id="account-type"
              select
              label="Tipo de Conta"
              disabled={isSubmitting}
              error={Boolean(errors.type)}
              helperText={errors.type?.message || 'Selecione o tipo da conta'}
            >
              {ACCOUNT_TYPES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* Initial Balance */}
        <TextField
          id="account-initial-balance"
          label="Saldo Inicial"
          type="number"
          placeholder="0.00"
          disabled={isSubmitting}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            },
          }}
          error={Boolean(errors.initial_balance)}
          helperText={errors.initial_balance ? 'Insira um valor válido' : ''}
          {...register('initial_balance', {
            required: true,
            valueAsNumber: true,
          })}
        />

        {/* Isolated Color Picker */}
        <ColorPicker
          name="color"
          control={control}
          register={register}
          setValue={setValue}
          label="Cor da Conta"
          disabled={isSubmitting}
        />

        {/* Isolated Icon Picker */}
        <IconPicker
          name="icon"
          control={control}
          errors={errors}
          label="Ícone da Conta"
          disabled={isSubmitting}
        />

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
