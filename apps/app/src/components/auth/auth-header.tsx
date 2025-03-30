'use client';

import React from 'react';

import { SITE_NAME } from '@zx/shared';

import { Icons } from '../icons';

export default function AuthHeader() {
  return (
    <div className="border-border flex items-center justify-center gap-5 border-b border-dashed p-3">
      <Icons.logo className="size-10" />
      <h2 className="p-0">{SITE_NAME}</h2>
      <Icons.logo className="size-10" />
    </div>
  );
}
