'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authClient } from '@zx/auth/client';
import { env } from '@/lib/env';

export const useLinkedAccount = () => {
  return useMutation({
    mutationFn: async (payload: { provider: 'github' | 'google' }) => {
      const { data, error } = await authClient.linkSocial({
        provider: payload.provider,
        callbackURL: `${env.NEXT_PUBLIC_APP_URL}/settings/account`,
      });

      if (error) throw new Error(error.code);
      return data;
    },
  });
};

export const useUnlinkAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { provider: 'github' | 'google'; accountId: string }) => {
      const { data, error } = await authClient.unlinkAccount({
        providerId: payload.provider,
        accountId: payload.accountId,
      });

      if (data?.status) queryClient.invalidateQueries({ queryKey: ['accounts'] });

      if (error) throw new Error(error.code);
      return data;
    },
  });
};
