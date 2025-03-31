'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { HTTPError } from 'ky';
import { ChevronRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { SignUpSchemaProp } from '@zx/shared';
import { useI18nZodErrors } from '@zx/i18n';
import { SignUpSchema } from '@zx/shared';
import { Button } from '@zx/ui/components/button';
import { Form } from '@zx/ui/components/form';
import { cn } from '@zx/ui/lib/utils';
import { useSignUpWithCredential } from '@/actions/auth/sign-up';
import FormPassword from '@/components/form-field/form-password';
import FormText from '@/components/form-field/form-text';
import { Icons } from '@/components/icons';
import { checkAvailableEmail } from '@/services/http/check-email';
import { checkAvailableUsername } from '@/services/http/check-username';

export default function SignUpForm({ className, ...props }: React.ComponentProps<'form'>) {
  const t = useTranslations();
  useI18nZodErrors();
  const form = useForm<SignUpSchemaProp>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onBlur',
    defaultValues: {
      fistname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate, isPending } = useSignUpWithCredential();

  const onSubmit = async (data: SignUpSchemaProp) => {
    const fistname = data.fistname.charAt(0).toUpperCase() + data.fistname.slice(1);
    const lastname = data.lastname.charAt(0).toUpperCase() + data.lastname.slice(1);
    const name = fistname + ' ' + lastname;

    mutate(
      { name, email: data.email, password: data.password, username: data.username },
      {
        onSuccess: async (_data) => {
          toast.info(t('auth.sign-up.on_success'));
        },
        onError(error) {
          if (error instanceof Error) {
            toast.error(t(`auth.errors.${error.message}` as never));
          } else {
            toast.error('Internal Server Error');
          }
          console.log(' signUpWithCredential ~ error:', error);
        },
      }
    );
  };

  const availableCheck = async (action: 'username' | 'email') => {
    try {
      if (action === 'email') {
        const email = form.watch('email');
        if (email && email.includes('@') && email.length > 5) {
          const res = await checkAvailableEmail(email);
          if (res.email) {
            form.setError('email', {
              type: 'manual',
              message: t('forms.errors.email_exist'),
            });
          } else {
            form.clearErrors('email');
          }
        }
      }
      if (action === 'username') {
        const username = form.watch('username');
        if (username && username.length > 4) {
          const res = await checkAvailableUsername(username);
          if (res.username) {
            form.setError('username', {
              type: 'manual',
              message: t('forms.errors.username_exist'),
            });
          } else {
            form.clearErrors('username');
          }
        }
      }
    } catch (error) {
      if (error instanceof HTTPError) {
        const { message } = await error.response.json();
        toast.error(message);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-y-3', className)} {...props}>
        <div className="grid gap-5 md:grid-cols-2">
          <FormText
            name="fistname"
            title={t('forms.fistname')}
            placeholder="Zerox"
            description={t('forms.sign-up.fistname-description')}
            errorPosition="bottom"
          />
          <FormText
            name="lastname"
            title={t('forms.lastname')}
            placeholder="Project"
            description={t('forms.sign-up.lastname-description')}
            errorPosition="bottom"
          />
        </div>
        <FormText
          name="username"
          title={t('forms.username') + '*'}
          placeholder="zerox_project"
          description={t('forms.sign-up.username-description')}
          errorPosition="bottom"
          onBlur={() => availableCheck('username')}
        />
        <FormText
          name="email"
          type="email"
          title={t('forms.email') + '*'}
          placeholder="myemail@zerox.com"
          description={t('forms.sign-up.email-description')}
          errorPosition="bottom"
          onBlur={() => availableCheck('email')}
        />
        <div className="grid gap-5 md:grid-cols-2">
          <FormPassword
            name="password"
            title={t('forms.password') + '*'}
            placeholder="********"
            errorPosition="bottom"
            description={t('forms.sign-up.password-description')}
          />
          <FormPassword
            name="confirmPassword"
            title={t('forms.confirmPassword') + '*'}
            placeholder="********"
            errorPosition="bottom"
            description={t('forms.sign-up.confirmPassword-description')}
          />
        </div>

        <div className="mt-3 grid grid-cols-1">
          <Button type="submit" className="mx-auto w-full md:w-1/2" disabled={isPending || !form.formState.isValid}>
            {t('forms.continue')} {isPending ? <Icons.spinner className="animate-spin" /> : <ChevronRightIcon />}
          </Button>
        </div>
      </form>
    </Form>
  );
}
