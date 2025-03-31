'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { VerifySocialAccountProp } from '@zx/shared';
import { VerifySocialAccount } from '@zx/shared';
import { Button } from '@zx/ui/components/button';
import { Form } from '@zx/ui/components/form';
import { cn } from '@zx/ui/lib/utils';
import FormPassword from '@/components/form-field/form-password';
import FormText from '@/components/form-field/form-text';

export default function VerifySocialForm({ className, ...props }: React.ComponentProps<'form'>) {
  const form = useForm<VerifySocialAccountProp>({
    resolver: zodResolver(VerifySocialAccount),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: VerifySocialAccountProp) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('grid gap-3', className)} {...props}>
        <FormText
          name="username"
          title="Username"
          placeholder="zerox_project"
          description="This a public usename"
          errorPosition="bottom"
        />
        <FormPassword
          name="password"
          title="Password"
          placeholder="******"
          description="Use strong password"
          errorPosition="bottom"
        />
        <FormPassword
          name="confirmPassword"
          title="Re-Password"
          placeholder="******"
          description="Confirm your password"
          errorPosition="bottom"
        />
        <div className="grid">
          <Button variant={'outline'} className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
