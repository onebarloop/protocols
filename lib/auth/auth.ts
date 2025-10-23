import 'server-only';

import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';
import { headers } from 'next/headers';
import { rolePlugin } from './plugins';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies(), rolePlugin()],
});

export const getSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
};
