'use server';

import { cookies } from 'next/headers';

import { AUTH_COOKIE } from '@zx/auth/config';

export const setSessionToken = async (value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, value, {
    sameSite: 'lax',
    httpOnly: true,
  });
};

export const deleteSessionToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
};

export const getSessionToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  return token;
};
