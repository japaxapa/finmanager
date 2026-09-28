'use client';

import { Controller } from 'react-hook-form';
import { Box, Button, MenuItem, TextField, InputAdornment } from '@mui/material';
import { Category, TransactionUpdate } from '@/shared/lib/supabase/types/types';
import { useTransactionForm } from '@/shared/hooks/useTransactionForm';

export interface ITransactionFormProps {
  handleClose: () => void;
  entityToEdit?: TransactionUpdate | null;
  defaultAccountId?: string;
}

const TRANSACTION_TYPES = [
  { value: 'income', label: 'Receita' },
  { value: 'expense', label: 'Despesa' },
] as const;

export function TransactionForm({
  handleClose,
  entityToEdit,
  defaultAccountId,
  ...props
}: ITransactionFormProps) {
  const {
    form,
    isEditing,
    isSubmitting,
    isLoadingAccounts,
    isLoadingCategories,
    validAccounts,
    validCategories,
    handleReset,
    onSubmit,
  } = useTransactionForm({ entityToEdit, defaultAccountId, handleClose });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

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
          helperText={errors.title?.message}
          {...register('title')}
        />

        {/* Transaction Type */}
        <Controller
          name="type"
          control={control}
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
          helperText={errors.amount?.message}
          {...register('amount', {
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
          {...register('transaction_date')}
        />

        {/* Account Selection */}
        <Controller
          name="account_id"
          control={control}
          render={({ field }) => {
            const hasMatchingOption = validAccounts.some((acc) => acc.id === field.value);
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
                value={selectValue}
              >
                {isLoadingAccounts ? (
                  <MenuItem disabled value="">
                    Carregando contas...
                  </MenuItem>
                ) : (
                  validAccounts.map((acc) => (
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
          render={({ field }) => {
            const hasMatchingOption = validCategories.some((cat) => cat.id === field.value);
            const selectValue = hasMatchingOption ? field.value : '';

            return (
              <TextField
                {...field}
                id="transaction-category"
                select
                label="Categoria"
                disabled={isSubmitting || isLoadingCategories}
                value={selectValue}
                error={Boolean(errors.category_id)}
                helperText={errors.category_id?.message}
              >
                <MenuItem value="">
                  <em>Sem Categoria</em>
                </MenuItem>
                {isLoadingCategories ? (
                  <MenuItem disabled value="">
                    Carregando categorias...
                  </MenuItem>
                ) : (
                  validCategories.map((cat: Category) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))
                )}
              </TextField>
            );
          }}
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
            {isSubmitting ? 'Salvando...' : isEditing ? 'Atualizando...' : 'Salvar'}
          </Button>
        </Box>
      </Box>
    </form>
  );
}
