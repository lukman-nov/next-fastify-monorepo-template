'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import { SidebarInset, SidebarProvider } from '@zx/ui/components/sidebar';
import { SiteHeader } from '@/components/site-header';

const AppSidebar = dynamic(() => import(`@/components/sidebar/app-sidebar`));

export default function AuthProfiders({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
