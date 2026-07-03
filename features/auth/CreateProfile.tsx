'use client';

import { createClient } from '@/shared/lib/supabase/client';
import { cn } from '@/shared/lib/utils';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateProfileForm({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: data.user.id, full_name: name }]);
      if (profileError) throw profileError;

      router.push('/dashboard');
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader title={'Login'} subheader={'Enter your email below to login to your account'} />
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <InputLabel htmlFor="name">Full Name</InputLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating profile...' : 'Create Profile'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
