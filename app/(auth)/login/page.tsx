import LoginForm from '@/components/custom/login-form';
import { Suspense } from 'react';

export default async function SignInPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
