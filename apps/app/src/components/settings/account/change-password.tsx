'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { SaveIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { User } from '@zx/auth/types';
import type { ChangePasswordSchemaProp } from '@zx/shared';
import { authClient } from '@zx/auth/client';
import { useI18nZodErrors } from '@zx/i18n';
import { ChangePasswordSchema } from '@zx/shared';
import { Form } from '@zx/ui/components/form';
import { Separator } from '@zx/ui/components/separator';
import { cn } from '@zx/ui/lib/utils';
import { FormInfo, FormPassword, FormText } from '@/components/form-filed';
import InputDialog from '@/components/input-dialog';
import { SubmitButton } from '@/components/submit-button';
import { changePassword } from '@/lib/auth';
import { deleteSessionToken, getSessionToken } from '@/services/auth-cookiets';

interface ChangePasswordProp extends React.ComponentProps<'div'> {
  user: NonNullable<User>;
}

export default function ChangePassword({ user, className, ...props }: ChangePasswordProp) {
  const t = useTranslations();
  const router = useRouter();
  useI18nZodErrors();

  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const form = useForm<ChangePasswordSchemaProp>({
    mode: 'onSubmit',
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
      email: '',
      currentPassword: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: { newPassword: string; userId: string; currentPassword: string }) => {
      await changePassword(payload);
    },
  });

  const onSubmit = (values: ChangePasswordSchemaProp) => {
    if (values.email !== user.email) {
      return form.setError('email', {
        type: 'validate',
        message: t('auth.errors.INVALID_EMAIL'),
      });
    }

    setShowExitConfirmation(false);
    mutate(
      { newPassword: values.newPassword, userId: user.id, currentPassword: values.currentPassword },
      {
        onSuccess: async () => {
          toast.info(t('settings.account.change-password-success'));

          const token = await getSessionToken();
          const tokenSplitter = token?.split('.')[0];

          if (tokenSplitter) {
            await authClient.revokeSession({ token: tokenSplitter });
            await deleteSessionToken();
            router.refresh();
          }
        },
        onError(error) {
          console.log(' onError ~ error:', error);
          toast.error(error.message);
          form.reset();
        },
      }
    );
  };

  return (
    <div className={cn('', className)} {...props}>
      <p className="text-lg font-medium">
        {t('settings.account.change-password')}{' '}
        <span className="text-muted-foreground text-sm">({t('settings.account.ignore-if')})</span>
      </p>

      <Separator className="mt-2 mb-5" />
      <Form {...form}>
        <form className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <FormPassword name="newPassword" title={t('forms.newPassword')} placeholder="********" autoComplete="off" />
            <FormPassword
              name="confirmPassword"
              title={t('forms.confirmPassword')}
              placeholder="********"
              autoComplete="off"
            />
          </div>

          <FormInfo message={t('settings.account.password-info')} />

          <SubmitButton
            type="button"
            size={'sm'}
            onClick={() => setShowExitConfirmation(true)}
            disabled={isPending || !form.formState.isDirty}
            isLoading={isPending}
            text={
              <>
                {t('forms.save')} <SaveIcon />
              </>
            }
          />

          <InputDialog
            open={showExitConfirmation}
            setOpen={setShowExitConfirmation}
            confirmationAction={form.handleSubmit(onSubmit)}
            messageConfirm={t('settings.account.dialog.message-confirm')}
            title={t('settings.account.change-password')}
            description={t('settings.account.dialog.change-password-description')}
          >
            <div className="text-sm">
              <p className="text-destructive-foreground">
                {t('settings.account.dialog.change-password-dangers-message')}
              </p>
              <p>{t('settings.account.dialog.change-password-confirm-input')}</p>
              <div className="mt-3 space-y-4">
                <FormText
                  name="email"
                  type="email"
                  title={t('forms.email')}
                  placeholder={t('settings.account.dialog.change-password-input-placeholder')}
                  errorPosition="bottom"
                  autoFocus={false}
                  autoComplete="off"
                />
                <FormPassword
                  name="currentPassword"
                  title={t('forms.currentPassword')}
                  placeholder="********"
                  autoFocus={false}
                  autoComplete="off"
                />
              </div>
            </div>
          </InputDialog>
        </form>
      </Form>
    </div>
  );
}
