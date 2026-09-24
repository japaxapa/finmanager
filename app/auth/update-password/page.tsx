import { UpdatePasswordForm } from '@/features/auth/UpdatePasswordForm';
import PageContainer from '@/shared/components/Layout/PageContainer';

export default function Page() {
  return (
    <PageContainer>
      <div className="w-full max-w-sm">
        <UpdatePasswordForm />
      </div>
    </PageContainer>
  );
}
