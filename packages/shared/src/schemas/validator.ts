import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8)
  .max(128)
  .refine((password) => /[A-Z]/.test(password), {
    params: { i18n: 'password-must-uppercase' },
  })
  .refine((password) => /[a-z]/.test(password), {
    params: { i18n: 'password-must-lowercase' },
  })
  .refine((password) => /[0-9]/.test(password), {
    params: { i18n: 'password-must-number' },
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    params: { i18n: 'password-must-symbol' },
  });

export const usernameSchema = z
  .string()
  .min(4)
  .max(50)
  .refine((username) => !/[A-Z]/.test(username), {
    params: { i18n: 'username-must-not-uppercase' },
  })
  .refine((username) => !/\s/.test(username), {
    params: { i18n: 'username-must-not-spaces' },
  })
  .refine((username) => /^[a-z0-9_-]+$/.test(username), {
    params: { i18n: 'username-only-contain' },
  })
  .refine((username) => !/^admin$/i.test(username), {
    params: { i18n: 'username-include-admin' },
  });
