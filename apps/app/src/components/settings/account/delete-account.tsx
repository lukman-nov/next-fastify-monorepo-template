'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { User } from '@zx/auth/types';
import type { DeleteAccountSchemaProp } from '@zx/shared';
import { useI18nZodErrors } from '@zx/i18n';
import { DeleteAccountSchema } from '@zx/shared';
import { Button } from '@zx/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@zx/ui/components/dialog';
import { Form } from '@zx/ui/components/form';
import { Separator } from '@zx/ui/components/separator';
import { cn } from '@zx/ui/lib/utils';
import { FormInfo, FormPassword, FormText } from '@/components/form-filed';
import { SubmitButton } from '@/components/submit-button';
import { useDeleteAccount } from '@/hooks/auth/delete-account';

interface DeleteAccountProp extends React.ComponentProps<'div'> {
  user: NonNullable<User>;
}

export default function DeleteAccount({ className, ...props }: DeleteAccountProp) {
  const t = useTranslations();
  useI18nZodErrors();

  const form = useForm<DeleteAccountSchemaProp>({
    resolver: zodResolver(DeleteAccountSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
      verify: '',
    },
  });

  const { mutate, isPending } = useDeleteAccount();

  const onSubmit = (values: DeleteAccountSchemaProp) => {
    if (!values.email || !values.password) return;

    mutate(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess(data) {
          toast.info(data.message);
        },
        onError(error) {
          toast.error(t(`auth.errors.${error.message}` as never));
        },
      }
    );
  };

  return (
    <div className={cn('', className)} {...props}>
      <p className="text-destructive-foreground text-lg font-medium">{t('settings.account.delete-account.title')}</p>
      <Separator className="mt-2 mb-5" />
      <FormInfo message={t('settings.account.delete-account.info-message')} variant={'destructive'} className="mb-5" />
      <Dialog onOpenChange={() => form.reset()}>
        <DialogTrigger asChild>
          <Button variant={'destructive'} className="text-destructive-foreground border-input border bg-transparent">
            {t('settings.account.delete-account.button')}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('settings.account.delete-account.dialog-title')}</DialogTitle>
            <FormInfo
              message={t('settings.account.delete-account.dialog-info-danger')}
              variant={'destructive'}
              className="bg-destructive-foreground/10 border-destructive-foreground border p-4"
            />
            <DialogDescription>{t('settings.account.delete-account.dialog-desc')}</DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormText name="email" title={t('forms.email')} autoComplete="off" autoFocus={false} />
                <FormPassword name="password" title={t('forms.password')} />
                <FormText name="verify" autoComplete="off" autoFocus={false}>
                  <p className="text-sm font-medium select-none">
                    {t.rich('settings.account.delete-account.label-verify', {
                      verify: (chunks) => <span className="font-normal italic">{chunks}</span>,
                    })}
                  </p>
                </FormText>

                <SubmitButton
                  text={t('settings.account.delete-account.submit-button')}
                  className="text-destructive-foreground w-full"
                  disabled={!form.formState.isValid || isPending}
                />
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
