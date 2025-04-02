'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@zx/ui/components/card';
import { cn } from '@zx/ui/lib/utils';
import { Icons } from '@/components/icons';
import { getUser } from '@/lib/auth';

import { SignOutButton } from '../sign-out-button';
import CreatePasswordForm from './form';

interface CreatePasswordComponentProp extends React.ComponentProps<'div'> {
  accounts: {
    id: string;
    provider: string;
    createdAt: Date;
    updatedAt: Date;
    accountId: string;
    scopes: string[];
  }[];
}

export default function CreatePasswordComponent({ className, ...props }: CreatePasswordComponentProp) {
  const t = useTranslations('auth.create-password');
  const { data, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5,
  });

  if (isPending) {
    return (
      <div className={cn('flex flex-1 items-center justify-center', className)} {...props}>
        <Icons.spinner className="text-muted-foreground size-20 animate-spin" />
      </div>
    );
  }

  return (
    <div className={cn('', className)} {...props}>
      <Card>
        <CardHeader className="flex justify-between">
          <div>
            {data && <CardTitle>{t('card-title', { name: data?.user.name })}</CardTitle>}
            <CardDescription>{t('card-desc')}</CardDescription>
          </div>
          <SignOutButton size={'sm'} variant={'secondary'} />
        </CardHeader>
        <CardContent>
          <CreatePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
