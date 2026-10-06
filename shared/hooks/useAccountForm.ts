import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { IAccountFormProps } from '@/features/accounts/AccountForm';
import { FinIconType } from '../components/UI/FinIcons.data';
import { useCreateAccount, useUpdateAccount } from './useAccounts';
import { accountSchema } from '../schemas/accounts.schema';
import { AccountInsert } from '../lib/supabase/types/types';

const DEFAULT_ACCOUNT_VALUES = {
  name: '',
  type: 'Corrente',
  initial_balance: 0,
  icon: 'wallet' as FinIconType,
  color: '#0088FE',
} as const;

export function useAccountForm({ handleClose, entityToEdit }: IAccountFormProps) {
  const isEditing = Boolean(entityToEdit);

  const { mutate: createAccount, isPending: isCreating } = useCreateAccount();
  const { mutate: updateAccount, isPending: isUpdating } = useUpdateAccount();
  const isSubmitting = isCreating || isUpdating;

  const defaultValues = entityToEdit
    ? {
        name: entityToEdit.name ?? DEFAULT_ACCOUNT_VALUES.name,
        type: entityToEdit.type ?? DEFAULT_ACCOUNT_VALUES.type,
        initial_balance: entityToEdit.initial_balance ?? DEFAULT_ACCOUNT_VALUES.initial_balance,
        icon: (entityToEdit.icon as FinIconType) ?? DEFAULT_ACCOUNT_VALUES.icon,
        color: entityToEdit.color ?? DEFAULT_ACCOUNT_VALUES.color,
      }
    : DEFAULT_ACCOUNT_VALUES;

  const form = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues,
  });

  const { reset } = form;

  const handleReset = () => {
    reset();
    handleClose();
  };

  const onSubmit: SubmitHandler<Omit<AccountInsert, 'user_id'>> = (data) => {
    const payload = {
      ...data,
      initial_balance: Number(data.initial_balance),
    };

    const isUpdate = isEditing && Boolean(entityToEdit?.id);
    const toastId = toast.loading(isUpdate ? 'Atualizando conta...' : 'Criando conta...');

    const options = {
      onSuccess: () => {
        toast.success(isUpdate ? 'Conta atualizada com sucesso!' : 'Conta criada com sucesso!', {
          id: toastId,
        });
        handleReset();
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Ocorreu um erro ao salvar.', { id: toastId });
      },
    };

    if (isUpdate && entityToEdit?.id) {
      updateAccount({ id: entityToEdit.id, ...payload }, options);
    } else {
      createAccount(payload, options);
    }
  };

  return {
    form,
    isEditing,
    isSubmitting,
    handleReset,
    onSubmit,
  };
}
