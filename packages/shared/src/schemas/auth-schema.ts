import { z } from 'zod';

import { passwordSchema, usernameSchema } from './validator';

export const SignInFormSchema = z.object({
  emailOrUsername: z.string(),
  password: z.string(),
  rememberMe: z.boolean().default(false),
});
export type SignInFormProp = z.infer<typeof SignInFormSchema>;

export const SignUpSchema = z
  .object({
    fistname: z.string().transform((val) => val.charAt(0).toUpperCase() + val.slice(1)),
    lastname: z.string().transform((val) => val.charAt(0).toUpperCase() + val.slice(1)),
    username: usernameSchema,
    email: z.string().email(),
    password: passwordSchema,
    confirmPassword: z.string().min(8).max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    params: { i18n: 'password-not-match' },
    path: ['confirmPassword'],
  });

export type SignUpSchemaProp = z.infer<typeof SignUpSchema>;
