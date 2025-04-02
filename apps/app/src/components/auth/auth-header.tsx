'use client';

import React from 'react';

import { SITE_NAME } from '@zx/shared';

import { Icons } from '../icons';

export default function AuthHeader() {
  return (
    <div className="border-border flex items-center justify-center gap-5 border-b border-dashed p-3">
      <Icons.logo className="size-10" />
      <p className="p-0 text-xl font-bold md:text-2xl">{SITE_NAME}</p>
      <Icons.logo className="size-10" />
    </div>
  );
}
