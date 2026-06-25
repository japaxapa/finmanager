import { ForgotPasswordForm } from '@/features/auth/ForgotPasswordForm';
import PageContainer from '@/shared/components/PageContainer';

export default function Page() {
  return (
    <PageContainer>
      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </PageContainer>
  );
}
