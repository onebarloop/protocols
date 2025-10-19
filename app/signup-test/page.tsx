'use client';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';

export default function SignupTestPage() {
  const { data: session, isPending, error, refetch } = authClient.useSession();

  console.log('Current session:', session);
  const handleSignup = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email: 'test@test.de',
        password: 'passwort123',
        name: 'Test',
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
      <h1>Signup Test Page</h1>
      <p>This is a test page for signup functionality.</p>
      <div className="flex gap-2">
        <Button onClick={handleSignup}>Sign up</Button>
        <Button onClick={handleSignIn}>Sign in</Button>
        <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </div>
    </div>
  );
}
