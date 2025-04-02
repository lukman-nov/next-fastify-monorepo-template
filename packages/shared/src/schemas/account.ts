import { z } from 'zod';

import { passwordSchema, usernameSchema } from './validator';

export const ChangeUsernameSchema = z.object({
  username: usernameSchema,
});
export type ChangeUsernameSchemaProp = z.infer<typeof ChangeUsernameSchema>;

export const ChangePasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string(),
    email: z.string().email(),
    currentPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    params: { i18n: 'password-not-match' },
    path: ['confirmPassword'],
  });
export type ChangePasswordSchemaProp = z.infer<typeof ChangePasswordSchema>;

export const DeleteAccountSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  verify: z.string().refine((val) => /delete my account/i.test(val), {
    params: { i18n: 'verify-not-match' },
  }),
});
export type DeleteAccountSchemaProp = z.infer<typeof DeleteAccountSchema>;
