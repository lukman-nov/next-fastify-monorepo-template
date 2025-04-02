import type { Metadata } from 'next/types';
import React from 'react';

import AuthHeader from '@/components/auth/auth-header';
import ForgetPasswordComponent from '@/components/auth/forget-password/components';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Forget Password`,
  };
}

export default function ForgetPasswordPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center space-y-3 p-6 md:p-10">
      <AuthHeader />
      <div className="w-md max-w-sm md:max-w-3xl">
        <ForgetPasswordComponent />
      </div>
    </main>
  );
}
