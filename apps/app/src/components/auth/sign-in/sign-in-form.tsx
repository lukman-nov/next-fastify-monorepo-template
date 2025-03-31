'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { SignInFormProp } from '@zx/shared';
import { useI18nZodErrors } from '@zx/i18n';
import { SignInFormSchema } from '@zx/shared';
import { Form, FormLabel } from '@zx/ui/components/form';
import { cn } from '@zx/ui/lib/utils';
import { useSignInWithPassword } from '@/actions/auth/sign-in';
import FormCheckbox from '@/components/form-field/form-checkbox';
import FormPassword from '@/components/form-field/form-password';
import FormText from '@/components/form-field/form-text';

import { AuthCredentialButton } from '../credential-button';

export default function SignInForm({ className, ...props }: React.ComponentProps<'form'>) {
  const t = useTranslations();
  useI18nZodErrors();
  const router = useRouter();
  const form = useForm<SignInFormProp>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      emailOrUsername: '',
      password: '',
      rememberMe: false,
    },
  });

  const { mutate, isPending, data } = useSignInWithPassword();

  function onSubmit(values: SignInFormProp) {
    if (!values.emailOrUsername || !values.password) return;

    mutate(values, {
      onSuccess() {
        router.push('/');
      },
      onError(error) {
        console.error(error);
      },
    });

    if (data && data.error) {
      toast.error(t(`auth.errors.${data.error.code}` as never));
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('max-w-3xl space-y-5', className)} {...props}>
        <FormText name="emailOrUsername" title={t('forms.email') + '/' + t('forms.username')} />
        <FormPassword name="password">
          <span className="inline-flex items-center justify-between">
            <FormLabel>{t('forms.password')}</FormLabel>
            <Link
              href={'/auth/forget-password'}
              className="hover:text-primary text-muted-foreground text-sm underline underline-offset-4"
            >
              {t('forms.forget-password')}
            </Link>
          </span>
        </FormPassword>
        <FormCheckbox name="rememberMe" title={t('forms.remember-me')} />
        <AuthCredentialButton isLoading={isPending} type="submit" className="w-full" />
      </form>
    </Form>
  );
}
