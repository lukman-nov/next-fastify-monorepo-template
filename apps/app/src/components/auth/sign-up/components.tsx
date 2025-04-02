'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Separator } from '@zx/ui/components/separator';
import { cn } from '@zx/ui/lib/utils';

import AuthHeader from '../auth-header';
import { AuthGithubButton } from '../github-button';
import { AuthGoogleButton } from '../google-button';
import SignUpForm from './form';

export default function SignUpComponent({ className, ...props }: React.ComponentProps<'div'>) {
  const t = useTranslations('auth.sign-up');

  return (
    <div className={cn('grid min-h-svh w-full lg:grid-cols-2', className)} {...props}>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/static/login_asset.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          width={500}
          height={500}
          priority
        />
      </div>
      <div className="mx-auto my-auto grid flex-1 grid-cols-1 gap-3 p-6 md:max-w-2xl md:gap-5 md:p-10">
        <AuthHeader />
        <p className="text-muted-foreground text-center">{t('title')}</p>
        <Separator />
        <SignUpForm />
        <div className="grid w-full grid-cols-1 gap-2">
          <p className="text-muted-foreground text-center text-sm font-normal">
            {t.rich('have_account', {
              signin: (value) => (
                <Link href={'/auth/sign-in'} className="hover:text-link underline underline-offset-2">
                  {value}
                </Link>
              ),
            })}
          </p>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card text-muted-foreground px-2">{t('or_register_with')}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <AuthGoogleButton className="mx-auto w-full" variant={'secondary'} />
            <AuthGithubButton className="mx-auto w-full" variant={'secondary'} />
          </div>
        </div>
      </div>
    </div>
  );
}
