import { customSessionClient, inferAdditionalFields, usernameClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import type { AuthTypes } from '../../types';
import { env } from '../lib/env';

export const authClient = createAuthClient({
  baseURL: `${env.NEXT_PUBLIC_API_URL}/v1/auth`,
  plugins: [customSessionClient<AuthTypes>(), inferAdditionalFields<AuthTypes>(), usernameClient()],
});

export const { signUp, signIn, signOut, useSession } = authClient;
