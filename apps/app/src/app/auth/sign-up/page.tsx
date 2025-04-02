import type { Metadata } from 'next/types';
import React from 'react';

import SignUpComponent from '@/components/auth/sign-up/components';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Sign Up`,
  };
}

export default function SignUpPage() {
  return (
    <main className="flex min-h-svh flex-1 flex-col items-center justify-center space-y-5">
      <SignUpComponent />
    </main>
  );
}
