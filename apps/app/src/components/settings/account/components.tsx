'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { Icons } from '@/components/icons';
import { getAccount, getUser } from '@/lib/auth';

import AccountLinking from './account-linking';
import ChangePassword from './change-password';
import ChangeUsername from './change-username';
import DeleteAccount from './delete-account';

export function SettingsAccountComponents() {
  const { data, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5,
  });

  const { data: accounts } = useQuery({
    queryKey: ['accounts'],
    queryFn: getAccount,
    staleTime: 1000 * 60 * 5,
  });

  if (isPending || !data || !accounts || !accounts.data) {
    return (
      <div className="text-muted-foreground flex flex-1 items-center justify-center">
        <Icons.spinner className="size-15 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      <ChangeUsername user={data.user} id="change-username" />
      <AccountLinking accounts={accounts.data} id="account-linking" />
      <ChangePassword user={data.user} id="change-password" />
      <DeleteAccount user={data.user} id="delete-account" />
    </div>
  );
}
