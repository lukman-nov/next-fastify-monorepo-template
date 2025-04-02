'use client';

import { useMutation } from '@tanstack/react-query';

import { authClient } from '@zx/auth/client';
import { env } from '@/lib/env';
import { checkAvailableEmail } from '@/services/http/check-email';

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const isUser = await checkAvailableEmail(email);
      if (!isUser.email) {
        throw new Error('USER_EMAIL_NOT_FOUND');
      }

      const { data, error } = await authClient.forgetPassword({
        email,
        redirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
      });
      if (error) throw new Error(error.code);
      return data.status;
    },
  });
};
