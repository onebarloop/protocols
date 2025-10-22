'use client';
import { authClient } from '@/lib/auth/auth-client';
import { Button } from '@/components/ui/button';

export default function SignUpPage() {
  const handleSignup = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email: 'test@dfsakon.de',
        password: 'passwort123',
        name: 'Guest',
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          alert(
            'Signup successful! Please check your email to verify your account.',
          );
          //redirect to the dashboard or sign in page
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      },
    );
  };
  return <Button onClick={handleSignup}>Sign Up</Button>;
}
