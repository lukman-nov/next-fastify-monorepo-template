import React from 'react';

import AuthHeader from '@/components/auth/auth-header';
import VerifySocialComponents from '@/components/verify/social-account/verify-social-component';

export default function VerifySocialAccountPage() {
  return (
    <main className="flex min-h-svh flex-1 flex-col items-center justify-center space-y-5">
      <AuthHeader />
      <VerifySocialComponents />
    </main>
  );
}
