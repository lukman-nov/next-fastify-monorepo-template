'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Button } from '@zx/ui/components/button';
import { useSignInWithGoogle } from '@/hooks/auth/sign-in';

import { Icons } from '../icons';

export function AuthGoogleButton({
  text,
  className,
  ...props
}: React.ComponentProps<typeof Button> & { text?: string }) {
  const t = useTranslations();
  const router = useRouter();

  const { mutate, isPending } = useSignInWithGoogle();

  const handleClick = async () => {
    mutate(undefined, {
      onSuccess: () => {
        router.push('/');
      },
      onError(error, _variables, _context) {
        console.log(' signInGoogle ~ error:', error);
        if (error instanceof Error) {
          toast.error(t(`auth.errors.${error.message}` as never));
        }
      },
    });
  };

  return (
    <Button className={className} onClick={handleClick} disabled={isPending} {...props}>
      {isPending ? (
        <Icons.spinner className="mr-2 h-5 w-5 motion-safe:animate-spin" />
      ) : (
        <Icons.google className="mr-2 h-5 w-5" />
      )}
      {text ? text : <p>Google</p>}
    </Button>
  );
}
