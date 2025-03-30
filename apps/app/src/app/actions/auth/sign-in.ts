'use client';

import { useMutation } from '@tanstack/react-query';

import { authClient } from '@zx/auth/client';
import { env } from '@/lib/env';

export const useSignInWithGoogle = () => {
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await authClient.signIn.social({
        provider: 'google',
        requestSignUp: true,
        callbackURL: env.NEXT_PUBLIC_APP_URL,
        errorCallbackURL: `${env.NEXT_PUBLIC_APP_URL}/auth/error`,
      });

      if (error) throw new Error(error.code);

      return data;
    },
  });
};

export const useSignInWithGithub = () => {
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await authClient.signIn.social({
        provider: 'github',
        requestSignUp: true,
        callbackURL: env.NEXT_PUBLIC_APP_URL,
        errorCallbackURL: `${env.NEXT_PUBLIC_APP_URL}/auth/error`,
      });

      if (error) throw new Error(error.code);

      return data;
    },
  });
};
