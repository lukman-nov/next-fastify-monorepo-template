'use server';

import { headers } from 'next/headers';

import { authClient } from '@zx/auth/client';

export const getUser = async () => {
  const headerList = await headers();
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: Object.fromEntries(headerList.entries()),
    },
  });
  return session;
};
