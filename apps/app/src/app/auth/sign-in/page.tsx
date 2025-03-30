import React from 'react';

import AuthHeader from '@/components/auth/auth-header';
import SignInComponent from '@/components/auth/sign-in/sign-in-component';

export default function SignInPage() {
  return (
    <main className="bg-muted flex min-h-svh flex-col items-center justify-center space-y-3 p-6 md:p-10">
      <AuthHeader />
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignInComponent />
      </div>
    </main>
  );
}
