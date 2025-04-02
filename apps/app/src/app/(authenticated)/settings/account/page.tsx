import type { Metadata } from 'next/types';
import React from 'react';

import { SettingsAccountComponents } from '@/components/settings/account/components';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Your Account`,
  };
}

export default function SettingsAccountPage() {
  return <SettingsAccountComponents />;
}
