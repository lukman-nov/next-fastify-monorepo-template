import React from 'react';

import AuthProfiders from './auth-providers';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export default async function AuthenticatedLayout({ children }: Readonly<AuthenticatedLayoutProps>) {
  return <AuthProfiders>{children}</AuthProfiders>;
}
