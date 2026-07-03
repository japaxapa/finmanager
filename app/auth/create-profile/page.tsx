import CreateProfileForm from '@/features/auth/CreateProfile';
import PageContainer from '@/shared/components/PageContainer';

export default function CreateProfile() {
  return (
    <PageContainer>
      <div className="w-full max-w-sm">
        <CreateProfileForm />
      </div>
    </PageContainer>
  );
}
