import type { BetterAuthClientPlugin, BetterAuthPlugin } from 'better-auth';

const rolePlugin = () => {
  return {
    id: 'role-plugin',
    schema: {
      user: {
        fields: {
          role: {
            type: ['admin', 'editor', 'guest'],
            required: true,
          },
        },
      },
    },
  } satisfies BetterAuthPlugin;
};

const rolePluginClient = () => {
  return {
    id: 'role-plugin-client',
    $InferServerPlugin: {} as ReturnType<typeof rolePlugin>,
  } satisfies BetterAuthClientPlugin;
};

export { rolePlugin, rolePluginClient };
