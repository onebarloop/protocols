import 'server-only';
import { auth } from './auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const getSession = async () => {
  const headersList = await headers();
  const referer = headersList.get('x-referer');

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) {
    if (referer) {
      redirect(`/login?callbackUrl=${encodeURIComponent(referer)}`);
    } else {
      redirect('/login');
    }
  }
  return session;
};
