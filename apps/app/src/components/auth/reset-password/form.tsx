'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ChevronLeftIcon, SaveIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { ResetPasswordSchemaProp } from '@zx/shared';
import { useI18nZodErrors } from '@zx/i18n';
import { ResetPasswordSchema } from '@zx/shared';
import { Button, buttonVariants } from '@zx/ui/components/button';
import { Form } from '@zx/ui/components/form';
import { cn } from '@zx/ui/lib/utils';
import { FormPassword } from '@/components/form-filed';
import { Icons } from '@/components/icons';
import { resetPassword } from '@/lib/auth';

export default function ResetPasswordForm({ className, ...props }: React.ComponentProps<'div'>) {
  const t = useTranslations();
  useI18nZodErrors();
  const router = useRouter();

  const searchParams = useSearchParams();

  const form = useForm<ResetPasswordSchemaProp>({
    mode: 'onBlur',
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: { password: string; token: string }) => {
      const { data, error } = await resetPassword({ newPassword: payload.password, token: payload.token });

      if (error) throw new Error(error.code);
      return data;
    },
  });

  const onSubmit = (values: ResetPasswordSchemaProp) => {
    const token = searchParams.get('token');
    if (!token) {
      return toast.error(t('auth.errors.INVALID_TOKEN'));
    }
    mutate(
      { password: values.password, token },
      {
        onError(error) {
          toast.error(t(`auth.errors.${error.message}` as never));
        },
        onSuccess() {
          toast.info(t('auth.reset-password.success'));
          router.push('/auth/sign-in');
        },
      }
    );
  };

  return (
    <div className={cn('', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormPassword
            name="password"
            title={t('forms.password') + '*'}
            errorPosition="bottom"
            description={t('forms.sign-up.password-description')}
          />
          <FormPassword
            name="confirmPassword"
            title={t('forms.confirmPassword') + '*'}
            errorPosition="bottom"
            description={t('forms.sign-up.confirmPassword-description')}
          />

          <div className="flex items-center justify-between">
            <Link href={'/'} className={cn(buttonVariants({ variant: 'ghost' }))}>
              <ChevronLeftIcon />
              {t('back-to-login')}
            </Link>

            <Button type="submit" variant="secondary" className="cursor-pointer">
              {isPending ? (
                <>
                  {t('forms.loading')}
                  <Icons.spinner className="animate-spin" />
                </>
              ) : (
                <>
                  {t('forms.submit')} <SaveIcon />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
