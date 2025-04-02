'use client';

import { useMutation } from '@tanstack/react-query';

import { authClient } from '@zx/auth/client';
import { env } from '@/lib/env';

type SignUpPayload = {
  email: string;
  name: string;
  password: string;
  username: string;
};

export const useSignUpWithCredential = () => {
  return useMutation({
    mutationFn: async (payload: SignUpPayload) => {
      const { data, error } = await authClient.signUp.email({
        name: payload.name,
        email: payload.email,
        username: payload.username,
        password: payload.password,
        callbackURL: env.NEXT_PUBLIC_APP_URL,
      });

      if (error) throw new Error(error.code);
      return data.user;
    },
  });
};
