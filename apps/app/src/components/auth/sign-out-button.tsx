'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LogOutIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { signOut } from '@zx/auth/client';
import { Button } from '@zx/ui/components/button';

import { Icons } from '../icons';

export function SignOutButton({ text, className, ...props }: React.ComponentProps<typeof Button> & { text?: string }) {
  const t = useTranslations('auth');
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleClick = async () => {
    setIsLoading(true);
    await signOut({
      fetchOptions: {
        onResponse: () => {
          setIsLoading(false);
        },
        onSuccess: async () => {
          router.push('/auth/sign-in');
        },
        onError() {
          setIsLoading(false);
        },
      },
    });
  };

  return (
    <Button className={className} onClick={handleClick} disabled={isLoading} {...props}>
      {text ? text : <p>{t('sign-out')}</p>}
      {isLoading ? (
        <Icons.spinner className="mr-2 h-5 w-5 motion-safe:animate-spin" />
      ) : (
        <LogOutIcon className="h-5 w-5" />
      )}
    </Button>
  );
}
