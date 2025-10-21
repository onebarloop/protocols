import 'server-only';

import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';
import { headers } from 'next/headers';
import { rolePlugin } from './plugins';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [rolePlugin()],
});

export const getSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
};
