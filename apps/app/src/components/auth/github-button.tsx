'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@zx/ui/components/button';
import { useSignInWithGithub } from '@/app/actions/auth/sign-in';

import { Icons } from '../icons';

export function AuthGithubButton({
  text,
  className,
  ...props
}: React.ComponentProps<typeof Button> & { text?: string }) {
  const router = useRouter();

  const { mutate, isPending } = useSignInWithGithub();

  const handleClick = async () => {
    mutate(undefined, {
      onSuccess: () => {
        router.push('/');
      },
      onError(error, _variables, _context) {
        console.log(' signInGithub ~ error:', error);
        if (error instanceof Error) {
          toast.error(error.message);
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
