import { IAccountFormProps } from '@/features/accounts/AccountForm';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FinIconType } from '../components/UI/FinIcons.data';
import { useCreateAccount, useUpdateAccount } from './useAccounts';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountSchema } from '../schemas/accounts.schema';
import { AccountInsert } from '../lib/supabase/types/types';
import toast from 'react-hot-toast';

export function useAccountForm({ handleClose, entityToEdit }: IAccountFormProps) {
  const isEditing = Boolean(entityToEdit);

  const { mutate: createAccount, isPending: isCreating } = useCreateAccount();
  const { mutate: updateAccount, isPending: isUpdating } = useUpdateAccount();
  const isSubmitting = isCreating || isUpdating;

  const form = useForm({
    resolver: zodResolver(accountSchema),
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

  const { setValue, reset } = form;

  const handleReset = () => {
    reset();
    handleClose();
  };

  const onSubmit: SubmitHandler<Omit<AccountInsert, 'user_id'>> = (data) => {
    const payload = {
      ...data,
      initial_balance: Number(data.initial_balance),
    };

    const isUpdate = isEditing && entityToEdit?.id;

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
    if (isEditing && entityToEdit?.id) {
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
    setValue,
  };
}
