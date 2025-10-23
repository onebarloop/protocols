import LoginForm from '@/components/custom/login-form';
import { headers } from 'next/headers';

export default async function SignInPage() {
  const headersList = await headers();
  const referer = headersList.get('x-referer');
  console.log('Referer (server):', referer);

  return <LoginForm />;
}
