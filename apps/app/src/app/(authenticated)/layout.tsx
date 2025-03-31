import React from 'react';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export default async function AuthenticatedLayout({ children }: Readonly<AuthenticatedLayoutProps>) {
  return <>{children}</>;
}
