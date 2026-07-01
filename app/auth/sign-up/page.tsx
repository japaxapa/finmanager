import { SignUpForm } from '@/features/auth/SignUpForm';
import PageContainer from '@/shared/components/PageContainer';

export default function Page() {
  return (
    <PageContainer>
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </PageContainer>
  );
}
