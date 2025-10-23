import type { BetterAuthClientPlugin, BetterAuthPlugin } from 'better-auth';

const rolePlugin = () => {
  return {
    id: 'my-plugin',
    schema: {
      user: {
        fields: {
          role: {
            type: ['admin', 'editor', 'guest'],
            required: false,
          },
        },
      },
    },
  } satisfies BetterAuthPlugin;
};

const rolePluginClient = () => {
  return {
    id: 'my-plugin-client',
    $InferServerPlugin: {} as ReturnType<typeof rolePlugin>,
  } satisfies BetterAuthClientPlugin;
};

export { rolePlugin, rolePluginClient };
