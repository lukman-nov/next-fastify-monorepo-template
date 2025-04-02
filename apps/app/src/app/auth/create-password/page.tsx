import type { Metadata } from 'next/types';
import React from 'react';
import { redirect } from 'next/navigation';

import AuthHeader from '@/components/auth/auth-header';
import CreatePasswordComponent from '@/components/auth/create-password/components';
import { getAccount } from '@/lib/auth';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Create Password`,
  };
}

export default async function CreatePasswordPage() {
  const { data: accounts } = await getAccount();

  if (!accounts) {
    redirect('/auth/sign-in');
  }

  const isCredentialActive = accounts
    .filter((account) => account.provider === 'credential')
    .map((credential) => (credential.id ? true : false))[0];
  if (isCredentialActive) {
    redirect('/');
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center space-y-3 p-6 md:p-10">
      <AuthHeader />
      <div className="w-md max-w-sm md:max-w-3xl">
        <CreatePasswordComponent accounts={accounts} />
      </div>
    </main>
  );
}
