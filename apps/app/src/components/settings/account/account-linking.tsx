'use client';

import React from 'react';
import { ArrowUpRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { Account } from '@zx/auth/types';
import { useI18nZodErrors } from '@zx/i18n';
import { Button } from '@zx/ui/components/button';
import { Separator } from '@zx/ui/components/separator';
import { cn } from '@zx/ui/lib/utils';
import { FormInfo } from '@/components/form-filed';
import { Icons } from '@/components/icons';
import { useLinkedAccount, useUnlinkAccount } from '@/hooks/auth/link-account';

interface AccountLinkingProp extends React.ComponentProps<'div'> {
  accounts: Account[];
}

export default function AccountLinking({ accounts, className, ...props }: AccountLinkingProp) {
  const t = useTranslations();
  useI18nZodErrors();

  const githubActive = accounts.filter((account) => account.provider === 'github')[0];
  const googleActive = accounts.filter((account) => account.provider === 'google')[0];

  const linked = useLinkedAccount();
  const unlink = useUnlinkAccount();

  const handleClick = async ({
    provider,
    action,
    accountId,
  }: {
    provider: 'github' | 'google';
    action: 'link' | 'unlink';
    accountId?: string;
  }) => {
    if (action === 'link') {
      linked.mutate({ provider });
    } else if (action === 'unlink' && accountId) {
      unlink.mutate({ provider, accountId });
    }
  };

  return (
    <div className={cn('', className)} {...props}>
      <p className="text-lg font-medium">{t('settings.account.link-account')}</p>
      <Separator className="mt-2 mb-5" />
      <div className="mb-5 grid gap-5 md:grid-cols-2 lg:max-w-lg">
        <Button
          className={cn('relative cursor-pointer')}
          variant={googleActive ? 'secondary' : 'default'}
          size={'lg'}
          onClick={() =>
            handleClick({
              provider: 'google',
              action: googleActive ? 'unlink' : 'link',
              accountId: googleActive?.accountId,
            })
          }
          disabled={accounts.length < 1}
        >
          {googleActive ? (
            <span className="inline-flex items-center gap-3">
              {t('settings.account.unlink', { provider: 'Google' })} <Icons.google />
            </span>
          ) : (
            <span className="inline-flex items-center gap-3">
              {t('settings.account.link-to', { provider: 'Google' })} <Icons.google />
              <ArrowUpRightIcon className="absolute top-0 right-0 size-3" />
            </span>
          )}
        </Button>
        <Button
          className="relative cursor-pointer"
          variant={githubActive ? 'secondary' : 'default'}
          size={'lg'}
          onClick={() =>
            handleClick({
              provider: 'github',
              action: githubActive ? 'unlink' : 'link',
              accountId: githubActive?.accountId,
            })
          }
          disabled={accounts.length < 1}
        >
          {githubActive ? (
            <span className="inline-flex items-center gap-3">
              {t('settings.account.unlink', { provider: 'Github' })} <Icons.github />
            </span>
          ) : (
            <span className="inline-flex items-center gap-3">
              {t('settings.account.link-to', { provider: 'Github' })} <Icons.github />
              <ArrowUpRightIcon className="absolute top-0 right-0 size-3" />
            </span>
          )}
        </Button>
      </div>
      <FormInfo message={t('settings.account.connecting-info')} />
    </div>
  );
}
