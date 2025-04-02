import React from 'react';

import { Separator } from '@zx/ui/components/separator';
import SettingsHeader from '@/components/settings/settings-header';
import SidebarSettings from '@/components/settings/sidebar-settings';

interface SettingsLayoutProp {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: Readonly<SettingsLayoutProp>) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2 p-5">
        <div>
          <SettingsHeader />
          <Separator className="my-6" />
          <div className="mx-auto flex max-w-5xl flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
            <aside className="lg:w-1/5">
              <SidebarSettings />
            </aside>
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
