'use client';

import React from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { SignInFormProp } from '@zx/shared';
import { SignInFormSchema } from '@zx/shared';
import { Form, FormLabel } from '@zx/ui/components/form';
import { cn } from '@zx/ui/lib/utils';
import FormCheckbox from '@/components/form-field/form-checkbox';
import FormPassword from '@/components/form-field/form-password';
import FormText from '@/components/form-field/form-text';

import { AuthCredentialButton } from '../credential-button';

export default function SignInForm({ className, ...props }: React.ComponentProps<'form'>) {
  const t = useTranslations();
  const form = useForm<SignInFormProp>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      emailOrUsername: '',
      password: '',
      rememberMe: false,
    },
  });

  function onSubmit(values: SignInFormProp) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[300px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('max-w-3xl space-y-5', className)} {...props}>
        <FormText name="emailOrUsername" title="Email/Username" />
        <FormPassword name="password">
          <span className="mb-1 flex items-center justify-between">
            <FormLabel>{t('forms.password')}</FormLabel>
            <Link
              href={'/auth/forget-password'}
              className="hover:text-primary text-muted-foreground text-sm underline underline-offset-4"
            >
              {t('forms.forget-password')}
            </Link>
          </span>
        </FormPassword>
        <FormCheckbox name="rememberMe" title="Remember Me" className="mb-3" />
        <AuthCredentialButton isLoading={false} type="submit" className="w-full" />
      </form>
    </Form>
  );
}
