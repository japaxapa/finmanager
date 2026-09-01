'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler, Controller, useWatch } from 'react-hook-form';
import { Box, Button, MenuItem, TextField, InputAdornment } from '@mui/material';
import { useCreateTransaction, useUpdateTransaction } from '@/shared/hooks/useTransactions';
import {
  AccountWithBalance,
  Category,
  TransactionInsert,
  TransactionUpdate,
} from '@/shared/lib/supabase/types/types';
import { useCategories } from '@/shared/hooks/useCategories';
import { Enums } from '@/shared/lib/supabase/types/supabase';
import { useAccounts } from '@/shared/hooks/useAccounts';

type Inputs = {
  title: string;
  amount: number;
  type: string;
  transaction_date: string;
  category_id: string;
  account_id: string;
  description: string;
};

interface ITransactionFormProps {
  handleClose: () => void;
  entityToEdit?: TransactionUpdate | null;
  defaultAccountId?: string;
}

const TRANSACTION_TYPES = [
  { value: 'income', label: 'Receita' },
  { value: 'expense', label: 'Despesa' },
];

export function TransactionForm({
  handleClose,
  entityToEdit,
  defaultAccountId = '',
  ...props
}: ITransactionFormProps) {
  const isEditing = Boolean(entityToEdit?.id);

  const { mutate: createTransaction, isPending: isCreating } = useCreateTransaction();
  const { mutate: updateTransaction, isPending: isUpdating } = useUpdateTransaction();
  const isSubmitting = isCreating || isUpdating;
  // const isSubmitting = false;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: entityToEdit?.title ?? '',
      amount: entityToEdit?.amount ?? 0,
      type: entityToEdit?.type ?? 'expense',
      transaction_date: entityToEdit?.transaction_date
        ? new Date(entityToEdit.transaction_date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      category_id: entityToEdit?.category_id ?? '',
      account_id: entityToEdit?.account_id ?? defaultAccountId,
      description: entityToEdit?.description ?? '',
    },
  });

  // 1. Watch dynamic form values
  const selectedType = useWatch({ control, name: 'type' });
  const selectedAccountId = useWatch({ control, name: 'account_id' });
  const selectedCategoryId = useWatch({ control, name: 'category_id' });

  // 2. Fetch queries from hooks
  const { data: categoriesData, isLoading: isLoadingCategories } = useCategories(
    selectedType as Enums<'category_type'>,
  );
  const { data: accountsData, isLoading: isLoadingAccounts } = useAccounts();

  // 3. Sync account selection once accounts finish loading
  useEffect(() => {
    // Find only accounts with non-null IDs
    const validAccounts =
      accountsData?.filter((a): a is typeof a & { id: string } => Boolean(a.id)) ?? [];

    if (validAccounts.length > 0 && !selectedAccountId) {
      const hasDefault = defaultAccountId && validAccounts.some((a) => a.id === defaultAccountId);
      const fallbackAccount = hasDefault ? defaultAccountId : validAccounts[0].id;

      setValue('account_id', fallbackAccount);
    }
  }, [accountsData, selectedAccountId, defaultAccountId, setValue]);

  // 4. Reset or validate category selection whenever type or categories query changes
  useEffect(() => {
    if (categoriesData?.data && categoriesData?.data.length > 0 && selectedCategoryId) {
      const categoryExists = categoriesData?.data.some((c) => c.id === selectedCategoryId);
      if (!categoryExists) {
        setValue('category_id', '');
      }
    }
  }, [selectedType, categoriesData, selectedCategoryId, setValue]);

  const handleReset = () => {
    reset();
    handleClose();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const payload: TransactionInsert = {
      ...data,
      amount: Number(data.amount),
      category_id: data.category_id || null,
      description: data.description || null,
      user_id: '', // Handled server-side or via Supabase session
    };

    const options = { onSuccess: handleReset };

    console.log('payload', payload);
    console.log('options', options);

    if (isEditing && entityToEdit?.id) {
      updateTransaction({ id: entityToEdit.id, ...payload }, options);
    } else {
      createTransaction(payload, options);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, px: 6, py: 3 }} {...props}>
        {/* Title */}
        <TextField
          id="transaction-title"
          label="Título"
          placeholder="Ex: Compras do mês"
          disabled={isSubmitting}
          error={Boolean(errors.title)}
          helperText={errors.title ? 'Título é obrigatório' : ''}
          {...register('title', { required: true })}
        />

        {/* Transaction Type */}
        <Controller
          name="type"
          control={control}
          rules={{ required: 'Tipo é obrigatório' }}
          render={({ field }) => (
            <TextField
              {...field}
              id="transaction-type"
              select
              label="Tipo"
              disabled={isSubmitting}
              error={Boolean(errors.type)}
              helperText={errors.type?.message || 'Selecione o tipo de transação'}
            >
              {TRANSACTION_TYPES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* Amount */}
        <TextField
          id="transaction-amount"
          label="Valor"
          type="number"
          placeholder="0.00"
          disabled={isSubmitting}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            },
            htmlInput: { step: '0.01' },
          }}
          error={Boolean(errors.amount)}
          helperText={errors.amount ? errors.amount.message || 'Insira um valor válido' : ''}
          {...register('amount', {
            required: true,
            min: { value: 0.01, message: 'O valor deve ser maior que 0' },
            valueAsNumber: true,
          })}
        />

        {/* Transaction Date */}
        <TextField
          id="transaction-date"
          label="Data da Transação"
          type="date"
          disabled={isSubmitting}
          slotProps={{
            inputLabel: { shrink: true },
          }}
          error={Boolean(errors.transaction_date)}
          helperText={errors.transaction_date ? 'A data é obrigatória' : ''}
          {...register('transaction_date', { required: true })}
        />

        {/* Account Selection */}
        <Controller
          name="account_id"
          control={control}
          rules={{ required: 'Conta é obrigatória' }}
          render={({ field }) => {
            // Check if the current form value exists in the fetched accounts list
            const hasMatchingOption = accountsData?.some((acc) => acc.id === field.value);
            const selectValue = hasMatchingOption ? field.value : '';

            return (
              <TextField
                {...field}
                id="transaction-account"
                select
                label="Conta"
                disabled={isSubmitting || isLoadingAccounts}
                error={Boolean(errors.account_id)}
                helperText={errors.account_id?.message}
                value={selectValue} // Guarantees value matches an available option or ''
              >
                {isLoadingAccounts ? (
                  <MenuItem disabled value="">
                    Carregando contas...
                  </MenuItem>
                ) : (
                  accountsData
                    // Filter out items where critical fields are null
                    ?.filter((acc): acc is AccountWithBalance & { id: string; name: string } =>
                      Boolean(acc.id && acc.name),
                    )
                    .map((acc) => (
                      <MenuItem key={acc.id} value={acc.id}>
                        {acc.name}
                      </MenuItem>
                    ))
                )}
              </TextField>
            );
          }}
        />

        {/* Category Selection */}
        <Controller
          name="category_id"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="transaction-category"
              select
              label="Categoria"
              disabled={isSubmitting || isLoadingCategories}
              value={field.value || ''}
            >
              <MenuItem value="">
                <em>Sem Categoria</em>
              </MenuItem>
              {isLoadingCategories ? (
                <MenuItem disabled value="">
                  Carregando categorias...
                </MenuItem>
              ) : (
                categoriesData &&
                categoriesData.data &&
                categoriesData.data.map((cat: Category) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          )}
        />

        {/* Description */}
        <TextField
          id="transaction-description"
          label="Descrição"
          placeholder="Observações sobre esta transação..."
          multiline
          rows={3}
          disabled={isSubmitting}
          {...register('description')}
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
