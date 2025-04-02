'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@zx/ui/components/card';
import { Separator } from '@zx/ui/components/separator';
import { cn } from '@zx/ui/lib/utils';

import ResetPasswordForm from './form';

export default function ResetPasswordComponent({ className, ...props }: React.ComponentProps<'div'>) {
  const t = useTranslations('auth.reset-password');
  return (
    <div className={cn('', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('card-title')}</CardTitle>
          <CardDescription>{t('card-desc')}</CardDescription>
        </CardHeader>
        <Separator />

        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
