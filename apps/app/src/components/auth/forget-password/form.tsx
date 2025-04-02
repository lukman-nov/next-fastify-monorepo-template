'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeftIcon, ChevronRightIcon, InfoIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { ForgetPasswordSchemaProp } from '@zx/shared';
import { useI18nZodErrors } from '@zx/i18n';
import { ForgetPasswordSchema } from '@zx/shared';
import { Button, buttonVariants } from '@zx/ui/components/button';
import { Form } from '@zx/ui/components/form';
import { cn } from '@zx/ui/lib/utils';
import { FormText } from '@/components/form-filed';
import { Icons } from '@/components/icons';
import { useForgetPassword } from '@/hooks/auth/forget-password';

export default function ForgetPasswordForm({ className, ...props }: React.ComponentProps<'div'>) {
  const t = useTranslations();
  useI18nZodErrors();
  const [isSuccess, setSuccess] = useState(false);

  const form = useForm<ForgetPasswordSchemaProp>({
    mode: 'onSubmit',
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const { mutate, isPending } = useForgetPassword();

  const onSubmit = async (values: ForgetPasswordSchemaProp) => {
    mutate(values.email, {
      onSuccess(data) {
        if (data) {
          setSuccess(true);
          toast.info(t('auth.forget-password.success'));
        }
      },
      onError(error) {
        toast.error(t(`auth.errors.${error.message}` as never));
      },
    });
  };

  return (
    <div className={cn('space-y-5', className)} {...props}>
      {isSuccess && (
        <div className="flex items-center gap-1.5 rounded-lg border border-sky-500 p-3 shadow">
          <InfoIcon className="size-6 text-sky-500" />
          <p className="text-sm">{t('auth.forget-password.success')}</p>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormText
            name="email"
            type="email"
            title={t('forms.email') + '*'}
            placeholder="arrohmah@example.com"
            errorPosition="bottom"
            autoComplete="off"
          />

          <div className="flex items-center justify-between">
            <Link href={'/'} className={cn(buttonVariants({ variant: 'ghost' }))}>
              <ChevronLeftIcon />
              {t('back-to-login')}
            </Link>
            <Button
              type="submit"
              variant={'outline'}
              className={cn('ms-auto cursor-pointer', className)}
              disabled={isPending || !form.formState.isDirty}
            >
              {isPending ? (
                <>
                  {t('forms.loading')}
                  <Icons.spinner className="animate-spin" />
                </>
              ) : (
                <>
                  {t('forms.continue')} <ChevronRightIcon />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
