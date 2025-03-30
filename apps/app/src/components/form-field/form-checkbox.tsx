'use client';

import React from 'react';
import { InfoIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Checkbox } from '@zx/ui/components/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@zx/ui/components/form';
import { cn } from '@zx/ui/lib/utils';

interface Props extends React.ComponentProps<typeof FormItem> {
  title?: string;
  name: string;
  description?: string;
  readOnly?: boolean;
}

export default function FormCheckbox({ title, name, description, readOnly, className, ...props }: Props) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex items-center', className)} {...props}>
          <FormControl>
            <Checkbox
              {...field}
              disabled={readOnly}
              value={field.value}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>

          <div className="space-y-1 leading-none">
            <FormLabel className={`text-sm`}>{title}</FormLabel>
            {description && (
              <FormDescription className="inline-flex items-center gap-2 leading-normal [&>svg]:size-5 [&>svg]:text-blue-400">
                <InfoIcon /> {description}
              </FormDescription>
            )}
          </div>
        </FormItem>
      )}
    />
  );
}
