import type { Metadata } from 'next/types';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Your Profile`,
  };
}

export default function SettingsPage() {
  return <div className="">SettingsPage</div>;
}
