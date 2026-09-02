import { EntityFormModal } from '@/shared/components/UI/EntityFormModal';
import { AccountUpdate } from '@/shared/lib/supabase/types/types';
import { AccountForm } from './AccountFrom';

interface IAccountModalProps {
  title?: string;
  accountToEdit?: AccountUpdate;
  open?: boolean;
  handleClose?: () => void;
}

export default function AccountModal(props: IAccountModalProps) {
  return (
    <EntityFormModal
      title={props.title ?? 'Conta'}
      buttonLabel="Nova Conta"
      FormComponent={AccountForm}
      entityToEdit={props.accountToEdit}
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}
