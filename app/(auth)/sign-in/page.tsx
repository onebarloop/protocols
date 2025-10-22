'use client';

import { authClient } from '@/lib/auth/auth-client';
import { Button } from '@/components/ui/button';

export default function SignInPage() {
  const handleSignIn = async () => {
    const { data, error } = await authClient.signIn.email(
      {
        email: 'test@test.de',
        password: 'passwort123',
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          alert('SignIn successful!');
          //redirect to the dashboard
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      },
    );
  };

  return (
    <div>
      Sign In Page
      <Button onClick={handleSignIn}>Sign in</Button>
    </div>
  );
}
