'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@zx/ui/components/button';
import { cn } from '@zx/ui/lib/utils';

import { Icons } from '../icons';

type AuthCredentialButtonProp = {
  isLoading: boolean;
};

export function AuthCredentialButton({
  className,
  isLoading,
  ...props
}: React.ComponentProps<typeof Button> & AuthCredentialButtonProp) {
  const t = useTranslations('forms');
  return (
    <Button
      disabled={isLoading}
      className={cn(
        'bg-secondary-foreground hover:bg-secondary-foreground/70 dark:bg-secondary dark:hover:bg-secondary/70 font-medium dark:text-white',
        className
      )}
      {...props}
    >
      {isLoading && <Icons.spinner className="mr-2 h-4 w-4 motion-safe:animate-spin" />}
      {t('sign-in')}
    </Button>
  );
}
