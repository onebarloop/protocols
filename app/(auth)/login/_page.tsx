// Not in use right now

'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useActionState, useState, useEffect } from 'react';
import { login } from '@/auth/server-actions';
import { toast } from 'sonner';

export default function SignInPage() {
  const [email, setEmail] = useState('test@test.de');
  const [message, formAction, isPending] = useActionState(login, {
    message: '',
    success: true,
  });

  useEffect(() => {
    if (message.message) {
      console.log(message);
      if (message.success) {
        toast.success(message.message);
      } else {
        toast.error(message.message);
      }
    }
  }, [message]);

  return (
    <form action={formAction}>
      <Input
        id="email"
        name="email"
        placeholder="Email"
        className="mb-4 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        id="password"
        name="password"
        placeholder="Password"
        className="mb-4 w-full"
        defaultValue="passwort123"
      />
      <Button disabled={isPending} type="submit">
        Sign In
      </Button>
      {!message.success ? <p>{message.message}</p> : null}
    </form>
  );
}
