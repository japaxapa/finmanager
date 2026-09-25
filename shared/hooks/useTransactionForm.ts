import { ITransactionFormProps } from '@/features/transactions/TransactionForm';
import { useCreateTransaction, useUpdateTransaction } from './useTransactions';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { Enums } from '../lib/supabase/types/supabase';
import { useAccounts } from './useAccounts';
import { useCategories } from './useCategories';
import { useEffect, useMemo } from 'react';
import { AccountWithBalance, TransactionInsert } from '../lib/supabase/types/types';

type Inputs = {
  title: string;
  amount: number;
  type: string;
  transaction_date: string;
  category_id: string;
  account_id: string;
  description: string;
};

/**
 * Hook to manage the Data logic from TransactionForm
 */
export function useTransactionForm({
  entityToEdit,
  defaultAccountId = '',
  handleClose,
}: ITransactionFormProps) {
  const isEditing = Boolean(entityToEdit?.id);

  const { mutate: createTransaction, isPending: isCreating } = useCreateTransaction();
  const { mutate: updateTransaction, isPending: isUpdating } = useUpdateTransaction();
  const isSubmitting = isCreating || isUpdating;

  const form = useForm<Inputs>({
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

  const { control, setValue, reset } = form;

  const {
    type: selectedType,
    account_id: selectedAccountId,
    category_id: selectedCategoryId,
  } = useWatch({ control });

  const { data: categoriesData, isLoading: isLoadingCategories } = useCategories(
    selectedType as Enums<'category_type'>,
  );
  const { data: accountsData, isLoading: isLoadingAccounts } = useAccounts();

  const validAccounts = useMemo(() => {
    return (
      accountsData?.filter((acc): acc is AccountWithBalance & { id: string; name: string } =>
        Boolean(acc.id && acc.name),
      ) ?? []
    );
  }, [accountsData]);

  const validCategories = useMemo(() => {
    return categoriesData?.data ?? [];
  }, [categoriesData?.data]);

  useEffect(() => {
    if (validAccounts.length > 0 && !selectedAccountId) {
      const hasDefault = defaultAccountId && validAccounts.some((a) => a.id === defaultAccountId);
      const fallbackAccount = hasDefault ? defaultAccountId : validAccounts[0].id;

      setValue('account_id', fallbackAccount);
    }
  }, [validAccounts, selectedAccountId, defaultAccountId, setValue]);

  useEffect(() => {
    if (validCategories.length > 0 && selectedCategoryId) {
      const categoryExists = validCategories.some((c) => c.id === selectedCategoryId);
      if (!categoryExists) {
        setValue('category_id', '');
      }
    }
  }, [validCategories, selectedCategoryId, setValue]);

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
      user_id: '',
    };

    const options = { onSuccess: handleReset };

    if (isEditing && entityToEdit?.id) {
      updateTransaction({ id: entityToEdit.id, ...payload }, options);
    } else {
      createTransaction(payload, options);
    }
  };

  return {
    form,
    isEditing,
    isSubmitting,
    isLoadingAccounts,
    isLoadingCategories,
    validAccounts,
    validCategories,
    handleReset,
    onSubmit,
  };
}
