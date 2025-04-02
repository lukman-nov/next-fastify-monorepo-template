import React from 'react';
import { SendIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@zx/ui/components/button';
import { cn } from '@zx/ui/lib/utils';

import { Icons } from './icons';

interface SubmitButtonProp extends React.ComponentProps<typeof Button> {
  text?: string | React.ReactElement;
  isLoading?: boolean;
}

export function SubmitButton({ text, isLoading, className, ...props }: SubmitButtonProp) {
  const t = useTranslations('forms');
  return (
    <Button type="submit" variant={'outline'} className={cn('ms-auto cursor-pointer', className)} {...props}>
      {isLoading ? (
        <>
          {t('loading')}
          <Icons.spinner className="animate-spin" />
        </>
      ) : (
        <>
          {text ? (
            text
          ) : (
            <>
              {t('submit')} <SendIcon />
            </>
          )}
        </>
      )}
    </Button>
  );
}
