'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SaveIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { User } from '@zx/auth/types';
import type { ChangeUsernameSchemaProp } from '@zx/shared';
import { authClient } from '@zx/auth/client';
import { useI18nZodErrors } from '@zx/i18n';
import { ChangeUsernameSchema } from '@zx/shared';
import { Form } from '@zx/ui/components/form';
import { Separator } from '@zx/ui/components/separator';
import { cn } from '@zx/ui/lib/utils';
import { AlertConfirmation } from '@/components/alert-confirmation';
import { FormInfo, FormText } from '@/components/form-filed';
import { SubmitButton } from '@/components/submit-button';
import { checkAvailableUsername } from '@/services/http/check-username';

interface ChangeUsernameProp extends React.ComponentProps<'div'> {
  user: NonNullable<User>;
}

export default function ChangeUsername({ user, className, ...props }: ChangeUsernameProp) {
  const queryClient = useQueryClient();
  const t = useTranslations();
  useI18nZodErrors();

  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  const form = useForm<ChangeUsernameSchemaProp>({
    resolver: zodResolver(ChangeUsernameSchema),
    mode: 'onSubmit',
    defaultValues: {
      username: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (username: string) => {
      const checker = await checkAvailableUsername(username);
      if (checker.username) {
        throw new Error('USERNAME_ALREADY_EXISTS');
      }

      const { data, error } = await authClient.updateUser({
        username: username,
      });

      if (error) throw new Error(error.code);
      return data.status;
    },
  });

  const onSubmit = async (values: ChangeUsernameSchemaProp) => {
    mutate(values.username, {
      onSuccess(status) {
        if (status) {
          form.reset();
          setShowExitConfirmation(false);
          toast.success(t('settings.account.change-username-success'));
          queryClient.invalidateQueries({ queryKey: ['user'] });
        }
      },
      onError(error) {
        toast.error(t(`auth.errors.${error.message}` as never));
      },
    });
  };

  return (
    <div className={cn('', className)} {...props}>
      <p className="text-lg font-medium">{t('settings.account.change-username')}</p>
      <Separator className="mt-2 mb-5" />
      <Form {...form}>
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <FormText name="username" title={t('forms.username')} placeholder={user.username ?? 'example_username'} />
          <FormInfo message={t('settings.account.username-info')} />
          <SubmitButton
            type="button"
            size={'sm'}
            isLoading={isPending}
            disabled={isPending || !form.formState.isDirty}
            onClick={() => setShowExitConfirmation(true)}
            text={
              <>
                {t('forms.save')} <SaveIcon />
              </>
            }
          />

          <AlertConfirmation
            open={showExitConfirmation}
            setOpen={setShowExitConfirmation}
            confirmationAction={form.handleSubmit(onSubmit)}
            messageCancel={t('settings.account.dialog.cancel')}
            messageConfirm={t('settings.account.dialog.message-confirm')}
            title={t('settings.account.change-username')}
            message={t('settings.account.dialog.username-confirm')}
          />
        </form>
      </Form>
    </div>
  );
}
