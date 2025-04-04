'use client';

import { IconCreditCard, IconDotsVertical, IconNotification, IconUserCircle } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

import { Avatar, AvatarFallback, AvatarImage } from '@zx/ui/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@zx/ui/components/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@zx/ui/components/sidebar';
import { Skeleton } from '@zx/ui/components/skeleton';
import { getUser } from '@/lib/auth';
import { getInitials } from '@/lib/utils';

import { SignOutButton } from '../auth/sign-out-button';

export function NavUser() {
  const { isLoading, data } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5,
  });
  const { isMobile } = useSidebar();

  if (isLoading || !data) {
    return <Skeleton className="h-[48px]" />;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={data.user.image || undefined} alt={data.user.name} />
                <AvatarFallback className="rounded-lg">{getInitials(data.user.name)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{data.user.name}</span>
                <span className="text-muted-foreground truncate text-xs">{data.user.email}</span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={data.user.image || undefined} alt={data.user.name} />
                  <AvatarFallback className="rounded-lg">{getInitials(data.user.name)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{data.user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">{data.user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              <SignOutButton variant={'ghost'} size={'sm'} className="w-full focus-visible:ring-0" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
