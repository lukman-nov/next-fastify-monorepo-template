'use client';

import { useMutation } from '@tanstack/react-query';

import { signIn } from '@zx/auth/client';
import { env } from '@/lib/env';

export const useSignInWithGoogle = () => {
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await signIn.social({
        provider: 'google',
        requestSignUp: true,
        callbackURL: env.NEXT_PUBLIC_APP_URL,
        newUserCallbackURL: `${env.NEXT_PUBLIC_APP_URL}/verification/social-account`,
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
      const { data, error } = await signIn.social({
        provider: 'github',
        requestSignUp: true,
        callbackURL: env.NEXT_PUBLIC_APP_URL,
        newUserCallbackURL: `${env.NEXT_PUBLIC_APP_URL}/verification/social-account`,
        errorCallbackURL: `${env.NEXT_PUBLIC_APP_URL}/auth/error`,
      });

      if (error) throw new Error(error.code);
      return data;
    },
  });
};

interface SignInWithPasswordPayload {
  emailOrUsername: string;
  password: string;
  rememberMe: boolean;
}

export const useSignInWithPassword = () => {
  return useMutation({
    mutationFn: async ({ emailOrUsername, password, rememberMe }: SignInWithPasswordPayload) => {
      const email = emailOrUsername.includes('@') && emailOrUsername;
      const username = emailOrUsername;
      if (email) {
        return await signIn.email({
          email,
          password,
          rememberMe,
        });
      }

      return await signIn.username({
        username,
        password: password,
        rememberMe: false,
      });
    },
  });
};
