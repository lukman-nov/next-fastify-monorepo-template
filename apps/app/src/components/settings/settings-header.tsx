'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { Avatar, AvatarFallback, AvatarImage } from '@zx/ui/components/avatar';
import { Skeleton } from '@zx/ui/components/skeleton';
import { cn } from '@zx/ui/lib/utils';
import { getUser } from '@/lib/auth';
import { getInitials } from '@/lib/utils';

interface SettingsHeaderProp extends React.ComponentProps<'div'> {
  text?: string;
}

export default function SettingsHeader({ text, className, ...props }: SettingsHeaderProp) {
  const { data, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5,
  });

  if (isPending || !data) {
    return (
      <div className={cn('', className)} {...props}>
        <div className="flex items-center gap-3 p-4">
          <Skeleton className="size-10 rounded-full md:size-14" />
          <div className="space-y-3">
            <Skeleton className="h-[20px] w-[200px]" />
            <Skeleton className="h-[15px] w-[300px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('', className)} {...props}>
      <div className="flex items-center gap-3 p-4">
        <Avatar className="size-10 md:size-14">
          <AvatarImage
            src={data.user.image ?? undefined}
            alt={data.user.name}
            width={50}
            height={50}
            className="object-cover object-center"
          />
          <AvatarFallback className="rounded-lg">{getInitials(data.user.name)}</AvatarFallback>
        </Avatar>
        <div className="leading-none">
          <p className="text-xl font-bold">
            {data.user.name}{' '}
            {data.user.username && <span className="text-muted-foreground text-base">({data.user.username})</span>}
          </p>
          <p className="text-muted-foreground text-sm leading-none">
            {text ? text : 'Manage your account settings and set e-mail preferences.'}
          </p>
        </div>
      </div>
    </div>
  );
}
