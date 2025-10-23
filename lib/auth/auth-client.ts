import { createAuthClient } from 'better-auth/react';
import { rolePluginClient } from './plugins';

export const authClient = createAuthClient({
  plugins: [rolePluginClient()],
});
