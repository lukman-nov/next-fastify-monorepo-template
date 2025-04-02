'use server';

import { headers } from 'next/headers';

import { authClient } from '@zx/auth/client';
import { auth } from '@zx/auth/server';

export const getUser = async () => {
  const headerList = await headers();
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: Object.fromEntries(headerList.entries()),
    },
  });
  return session;
};

export const getAccount = async () => {
  const headerList = await headers();

  const accounts = await authClient.listAccounts({
    fetchOptions: {
      headers: Object.fromEntries(headerList.entries()),
    },
  });
  return accounts;
};

export const setPassword = async (password: string) => {
  const headerList = await headers();
  return await auth.api.setPassword({
    headers: Object.fromEntries(headerList.entries()),
    body: { newPassword: password },
  });
};

export const resetPassword = async (payload: { token: string; newPassword: string }) => {
  return await authClient.resetPassword({
    newPassword: payload.newPassword,
    token: payload.token,
  });
};

export const changePassword = async (payload: { userId: string; newPassword: string; currentPassword: string }) => {
  try {
    const ctx = await auth.$context;
    const hash = await ctx.password.hash(payload.newPassword);
    await ctx.internalAdapter.updatePassword(payload.userId, hash);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
