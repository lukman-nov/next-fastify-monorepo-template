'use client';

import type { FocusEventHandler } from 'react';
import React from 'react';
import { InfoIcon, TriangleAlertIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@zx/ui/components/form';
import { Input } from '@zx/ui/components/input';
import { cn } from '@zx/ui/lib/utils';

interface Props extends React.ComponentProps<typeof FormItem> {
  title?: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  description?: string;
  readOnly?: boolean;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
  errorPosition?: 'top' | 'bottom';
}

export default function FormText({
  title,
  name,
  type,
  placeholder,
  description,
  readOnly,
  onBlur,
  errorPosition,
  className,
  autoComplete,
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
          {children}
          <div className="flex items-center justify-between">
            <FormLabel className={`text-sm`}>{title}</FormLabel>
            {errorPosition === 'top' && <FormMessage className="" />}
          </div>

          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              readOnly={readOnly}
              disabled={readOnly}
              value={field.value}
              autoComplete={autoComplete}
              onChange={(e) => field.onChange(e.target.value)}
              onBlur={(e) => {
                field.onBlur();
                if (onBlur) onBlur(e);
              }}
            />
          </FormControl>

          {description && (
            <FormDescription
              className={cn(
                'inline-flex items-center gap-2 leading-normal [&>svg]:size-4 [&>svg]:text-blue-400',
                form.formState.errors[name] && errorPosition === 'bottom' && 'hidden'
              )}
            >
              <InfoIcon /> {description}
            </FormDescription>
          )}
          {errorPosition === 'bottom' && form.formState.errors[name] && (
            <div className="[&>svg]:text-destructive inline-flex items-center gap-2 leading-normal [&>svg]:size-4">
              <TriangleAlertIcon /> <FormMessage />
            </div>
          )}
        </FormItem>
      )}
    />
  );
}
