'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Button } from '@zx/ui/components/button';
import { useSignInWithGithub } from '@/hooks/auth/sign-in';

import { Icons } from '../icons';

export function AuthGithubButton({
  text,
  className,
  ...props
}: React.ComponentProps<typeof Button> & { text?: string }) {
  const router = useRouter();
  const t = useTranslations();

  const { mutate, isPending } = useSignInWithGithub();

  const handleClick = async () => {
    mutate(undefined, {
      onSuccess: () => {
        router.push('/');
      },
      onError(error, _variables, _context) {
        console.log(' signInGithub ~ error:', error);
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
        <Icons.github className="mr-2 h-5 w-5" />
      )}
      {text ? text : <p>Github</p>}
    </Button>
  );
}
