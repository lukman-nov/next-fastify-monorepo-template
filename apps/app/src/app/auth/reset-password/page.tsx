import type { Metadata } from 'next/types';
import React from 'react';
import { redirect } from 'next/navigation';

import AuthHeader from '@/components/auth/auth-header';
import ResetPasswordComponent from '@/components/auth/reset-password/components';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Reset Password`,
  };
}

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const params = await searchParams;
  if (!params.token) {
    redirect('/auth/sign-in');
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center space-y-3 p-6 md:p-10">
      <AuthHeader />
      <div className="w-md max-w-sm md:max-w-3xl">
        <ResetPasswordComponent />
      </div>
    </main>
  );
}
