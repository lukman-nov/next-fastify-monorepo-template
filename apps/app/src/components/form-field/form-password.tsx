'use client';

import type { FocusEventHandler } from 'react';
import React from 'react';
import { InfoIcon } from 'lucide-react';
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
          <div className="flex items-center justify-between">
            <FormLabel className={`text-sm`}>{title}</FormLabel>
            {errorPosition === 'top' && <FormMessage className="-mt-2" />}
          </div>
          {children}

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
            <FormDescription className="inline-flex items-center gap-2 leading-normal [&>svg]:size-5 [&>svg]:text-blue-400">
              <InfoIcon /> {description}
            </FormDescription>
          )}
          {errorPosition === 'bottom' && (
            <span className="relative">
              <FormMessage className="absolute -mt-1 leading-4" />
            </span>
          )}
        </FormItem>
      )}
    />
  );
}
