import 'server-only';

import { auth } from './auth';
import { headers } from 'next/headers';
import { cache } from 'react';

export const getSession = cache(async () => {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  return session;
});

export type Session = Awaited<ReturnType<typeof getSession>>;
