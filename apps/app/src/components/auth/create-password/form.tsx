'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SaveIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { CreatePasswordSchemaProp } from '@zx/shared';
import { useI18nZodErrors } from '@zx/i18n';
import { CreatePasswordSchema } from '@zx/shared';
import { Button } from '@zx/ui/components/button';
import { Form } from '@zx/ui/components/form';
import { cn } from '@zx/ui/lib/utils';
import { FormPassword } from '@/components/form-filed';
import { Icons } from '@/components/icons';
import { setPassword } from '@/lib/auth';

export default function CreatePasswordForm({ className, ...props }: React.ComponentProps<'div'>) {
  const t = useTranslations();
  const router = useRouter();
  const queryClient = useQueryClient();

  useI18nZodErrors();

  const form = useForm<CreatePasswordSchemaProp>({
    resolver: zodResolver(CreatePasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (password: string) => {
      const { status } = await setPassword(password);

      if (!status) throw new Error('faild to set password');

      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      return status;
    },
  });

  const onSubmit = (values: CreatePasswordSchemaProp) => {
    mutate(values.password, {
      onSuccess() {
        toast.info(t('auth.create-password.success'));
        router.push('/');
      },
    });
  };

  return (
    <div className={cn('grid', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormPassword
            name="password"
            title={t('forms.password')}
            description={t('auth.create-password.password-desc')}
            errorPosition="bottom"
          />

          <FormPassword
            name="confirmPassword"
            title={t('forms.confirmPassword')}
            description={t('auth.create-password.cur-password-desc')}
            errorPosition="bottom"
          />

          <Button type="button" variant="secondary" className="w-full cursor-pointer">
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
        </form>
      </Form>
    </div>
  );
}
