import { EntityFormModal } from '@/shared/components/UI/EntityFormModal';
import { CategoryForm } from './CategoryForm';
import { CategoryUpdate } from '@/shared/lib/supabase/types/types';

interface ICategoryModalProps {
  title?: string;
  categoryToEdit?: CategoryUpdate;
  open?: boolean;
  handleClose?: () => void;
}

export default function CategoryModal(props: ICategoryModalProps) {
  return (
    <EntityFormModal
      title={props.title ?? 'Categoria'}
      buttonLabel="Nova Categoria"
      FormComponent={CategoryForm}
      entityToEdit={props.categoryToEdit}
      open={props.open}
      handleClose={props.handleClose}
    />
  );
}
