'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Card, CardContent } from '@zx/ui/components/card';
import { cn } from '@zx/ui/lib/utils';

import { AuthGithubButton } from '../github-button';
import { AuthGoogleButton } from '../google-button';
import SignInForm from './sign-in-form';

export default function SignInComponent({ className, ...props }: React.ComponentProps<'div'>) {
  const t = useTranslations('auth.sign-in');
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="flex flex-col gap-6 py-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-xl font-semibold">{t('title')}</h1>
              <p className="text-muted-foreground text-sm text-balance">{t('enter_to_your_account')}</p>
            </div>
            <SignInForm className="px-6 md:px-8" />
            <div className="space-y-3 px-6 md:px-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card text-muted-foreground px-2">{t('signin_with')}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <AuthGoogleButton className="w-full" variant={'secondary'} />
                <AuthGithubButton className="w-full" variant={'secondary'} />
              </div>
              <p className="text-muted-foreground text-center text-sm text-balance">
                {t.rich('register_here', {
                  registerhere: (chunks) => (
                    <Link href={'/auth/sign-up'} className="hover:text-primary underline underline-offset-4">
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            </div>
          </div>
          <div className="bg-muted relative hidden md:block">
            <Image
              src={'/static/login_asset.svg'}
              alt="login-asset"
              width={300}
              height={300}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
