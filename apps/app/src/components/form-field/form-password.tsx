'use client';

import type { FocusEventHandler } from 'react';
import React from 'react';
import { InfoIcon, TriangleAlertIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@zx/ui/components/form';
import { InputPassword } from '@zx/ui/components/input-password';
import { cn } from '@zx/ui/lib/utils';

interface Props extends React.ComponentProps<typeof FormItem> {
  title?: string;
  name: string;
  placeholder?: string;
  description?: string;
  readOnly?: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
  errorPosition?: 'top' | 'bottom';
}

export default function FormPassword({
  title,
  name,
  placeholder,
  description,
  readOnly,
  onBlur,
  errorPosition,
  className,
  children,
  ...props
}: Props) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)} {...props}>
          {children ?? (
            <div className="flex items-center justify-between">
              <FormLabel className={`text-sm`}>{title}</FormLabel>
              {errorPosition === 'top' && <FormMessage className="" />}
            </div>
          )}

          <FormControl>
            <InputPassword
              {...field}
              placeholder={placeholder}
              readOnly={readOnly}
              disabled={readOnly}
              value={field.value}
              autoComplete="off"
              onChange={(e) => field.onChange(e.target.value)}
              onBlur={(e) => {
                field.onBlur();
                if (onBlur) onBlur(e);
              }}
            />
          </FormControl>

          {description && (
            <div
              className={cn(
                'flex items-center justify-start gap-1',
                form.formState.errors[name] && errorPosition === 'bottom' && 'hidden'
              )}
            >
              <div>
                <InfoIcon className="size-4 text-blue-400" />
              </div>
              <FormDescription className="leading-normal">{description}</FormDescription>
            </div>
          )}
          {errorPosition === 'bottom' && form.formState.errors[name] && (
            <div className="[&>svg]:text-destructive inline-flex items-center gap-1 leading-normal">
              <TriangleAlertIcon className="h-4 w-4" /> <FormMessage />
            </div>
          )}
        </FormItem>
      )}
    />
  );
}
