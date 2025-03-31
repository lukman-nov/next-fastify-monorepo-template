'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { Card, CardContent } from '@zx/ui/components/card';
import { Separator } from '@zx/ui/components/separator';
import { cn } from '@zx/ui/lib/utils';
import { getUser } from '@/lib/auth';

import VerifySocialForm from './verify-social-form';

export default function VerifySocialComponents({ className, ...props }: React.ComponentProps<'div'>) {
  const router = useRouter();
  const { status, data } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5,
  });

  if (status === 'pending') {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (data && data.user.username) {
    router.push('/');
    return;
  }

  return (
    <div className={cn('', className)} {...props}>
      <Card>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h4 className="">Welcome {data?.user.name}</h4>
              <p className="text-muted-foreground text-balance">Please complete your account details below.</p>
            </div>
          </div>
          <Separator className="my-5" />
          <VerifySocialForm />
        </CardContent>
      </Card>
    </div>
  );
}
