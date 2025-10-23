'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth/auth-client';
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { LoginSchema } from '@/types/zod-schemas';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const callbackUrl = useSearchParams().get('callbackUrl') || '/';
  const router = useRouter();
  const [email, setEmail] = useState('guest@test.de');
  const [password, setPassword] = useState('password123');
  const [isPending, setIsPending] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = LoginSchema.safeParse({ email, password });
    if (!validation.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as 'email' | 'password';
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    await authClient.signIn.email(
      {
        email: validation.data.email,
        password: validation.data.password,
        rememberMe: false,
      },
      {
        onRequest: () => {
          setIsPending(true);
        },
        onSuccess: (ctx) => {
          toast.success(`Logged in as ${ctx.data.user.name}`, {
            description: 'Forwarding...',
          });
          setTimeout(() => {
            router.push(callbackUrl);
          }, 1500);
        },
        onError: (ctx) => {
          console.log(ctx.error);
          setIsPending(false);
          setPassword('');
          toast.error(ctx.error?.message || 'Login failed');
          if (passwordRef.current) {
            passwordRef.current.focus();
          }
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label className="mb-2" htmlFor="email">
        Email
      </Label>
      <Input
        id="email"
        name="email"
        placeholder="Email"
        className="mb-1 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <p className="mb-1 h-5 text-sm text-red-500">{errors.email}</p>

      <Label className="mb-2" htmlFor="password">
        Password
      </Label>
      <Input
        ref={passwordRef}
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        className="mb-1 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <p className="mb-1 h-5 text-sm text-red-500">{errors.password}</p>

      <Button disabled={isPending} type="submit">
        {isPending ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
}
