import { EntityFormModal } from '@/shared/components/UI/EntityFormModal';
import { TransactionUpdate } from '@/shared/lib/supabase/types/types';
import { TransactionForm } from './TransactionForm';

interface ITransactionModalProps {
  title?: string;
  transactionToEdit?: TransactionUpdate;
  open?: boolean;
  handleClose?: () => void;
}

export default function TransactionModal(props: ITransactionModalProps) {
  return (
    <EntityFormModal
      title={props.title ?? 'Transação'}
      buttonLabel="Nova Transação"
      FormComponent={TransactionForm}
      entityToEdit={props.transactionToEdit}
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}
