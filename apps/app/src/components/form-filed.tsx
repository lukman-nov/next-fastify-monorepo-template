'use client';

import type { FocusEventHandler, JSX } from 'react';
import React from 'react';
import { InfoIcon, TriangleAlertIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Checkbox } from '@zx/ui/components/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@zx/ui/components/form';
import { Input } from '@zx/ui/components/input';
import { InputPassword } from '@zx/ui/components/input-password';
import { Textarea } from '@zx/ui/components/textarea';
import { cn } from '@zx/ui/lib/utils';

interface FormFieldsBase extends React.ComponentProps<typeof FormItem> {
  title?: string;
  name: string;
  placeholder?: string;
  description?: string;
  readOnly?: boolean;
  errorPosition?: 'top' | 'bottom';
}

interface FormCheckboxProp extends React.ComponentProps<typeof FormItem> {
  title?: string;
  name: string;
  description?: string;
  readOnly?: boolean;
}

function FormCheckbox({ title, name, description, readOnly, className, ...props }: FormCheckboxProp) {
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
            <FormLabel className={`text-sm font-normal`}>{title}</FormLabel>
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

interface FormIconLabelProp {
  icons?: JSX.Element;
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

function FormIconLabel({
  icons,
  name,
  type,
  placeholder,
  description,
  readOnly,
  onBlur,
  errorPosition = 'bottom',
  className,
  autoComplete,
  ...props
}: FormIconLabelProp & FormFieldsBase) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex items-center', className)} {...props}>
          <FormLabel className="mb-1">{icons}</FormLabel>
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
            <div className="[&>svg]:text-destructive inline-flex items-center gap-1 leading-normal [&>svg]:size-4">
              <TriangleAlertIcon /> <FormMessage />
            </div>
          )}
        </FormItem>
      )}
    />
  );
}

interface FormPasswordProp {
  onBlur?: FocusEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
}

function FormPassword({
  title,
  name,
  placeholder,
  description,
  readOnly,
  onBlur,
  errorPosition = 'bottom',
  className,
  children,
  autoComplete,
  ...props
}: FormPasswordProp & FormFieldsBase) {
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
              autoComplete={autoComplete}
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

interface FormTextProp {
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
}

function FormText({
  title,
  name,
  type,
  placeholder,
  description,
  readOnly,
  onBlur,
  errorPosition = 'bottom',
  className,
  autoComplete,
  children,
  ...props
}: FormTextProp & FormFieldsBase) {
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
            <div className="[&>svg]:text-destructive inline-flex items-center gap-1 leading-normal [&>svg]:size-4">
              <TriangleAlertIcon /> <FormMessage />
            </div>
          )}
        </FormItem>
      )}
    />
  );
}

function FormTextarea({
  title,
  name,
  placeholder,
  description,
  readOnly,
  errorPosition = 'bottom',
  className,
  children,
  ...props
}: FormTextProp & FormFieldsBase) {
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
            <Textarea
              {...field}
              placeholder={placeholder}
              readOnly={readOnly}
              disabled={readOnly}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              className="min-h-[150px]"
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
            <div className="[&>svg]:text-destructive inline-flex items-center gap-1 leading-normal [&>svg]:size-4">
              <TriangleAlertIcon /> <FormMessage />
            </div>
          )}
        </FormItem>
      )}
    />
  );
}

interface FormInfoProp extends React.ComponentProps<'div'> {
  variant?: 'default' | 'destructive' | 'waring';
  message: string;
}

function FormInfo({ variant = 'default', message, className, ...props }: FormInfoProp) {
  return (
    <div className={cn('text-muted-foreground flex items-center gap-2 text-sm', className)} {...props}>
      {variant === 'default' && (
        <>
          <span className="[&>svg]:size-4 [&>svg]:text-blue-400">
            <InfoIcon />
          </span>
          <p>{message}</p>
        </>
      )}
      {variant === 'destructive' && (
        <>
          <span className="[&>svg]:text-destructive-foreground [&>svg]:size-4">
            <TriangleAlertIcon />
          </span>
          <p>{message}</p>
        </>
      )}
      {variant === 'waring' && (
        <>
          <span className="[&>svg]:size-4 [&>svg]:text-yellow-400">
            <TriangleAlertIcon />
          </span>
          <p>{message}</p>
        </>
      )}
    </div>
  );
}

export { FormCheckbox, FormIconLabel, FormPassword, FormText, FormInfo, FormTextarea };
