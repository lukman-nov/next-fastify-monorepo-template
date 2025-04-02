'use client';

import { useMutation } from '@tanstack/react-query';

import { authClient } from '@zx/auth/client';
import { env } from '@/lib/env';
import { checkAvailableEmail } from '@/services/http/check-email';

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const isUser = await checkAvailableEmail(payload.email);
      if (!isUser.email) {
        throw new Error('USER_EMAIL_NOT_FOUND');
      }

      const { data, error } = await authClient.deleteUser({
        password: payload.password,
        callbackURL: `${env.NEXT_PUBLIC_APP_URL}`, // you can provide a callback URL to redirect after deletion
      });

      if (error) {
        throw new Error(error.code);
      }
      return data;
    },
  });
};
