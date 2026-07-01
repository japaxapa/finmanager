import LoginForm from '@/features/auth/LoginForm';
import PageContainer from '@/shared/components/PageContainer';

export default function Page() {
  return (
    <PageContainer>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </PageContainer>
  );
}
