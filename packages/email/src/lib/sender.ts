import { nodeTranslations, resolveLocale } from '@zx/i18n';
import { SITE_NAME } from '@zx/shared';

import { forgetPasswordTemplate, verifyEmail } from '../template';
import { deleteAccountTemplate } from '../template/delete-account';
import { sendEmail } from './resend';

interface SendVerificationEmail {
  to: string;
  headers?: Headers;
  url: string;
}

export async function sendVerificationEmail({ to, url, headers }: SendVerificationEmail) {
  const locale = resolveLocale({ headers });
  const t = await nodeTranslations(locale);

  const response = await sendEmail({
    from: `${SITE_NAME} <noreply@kucluck.com>`,
    to,
    subject: t('services.verify-email.subject'),
    html: verifyEmail({ url, t }),
  });

  return response;
}

interface ForgetPassword {
  to: string;
  headers?: Headers;
  url: string;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined;
  };
}

export async function sendForgetPasswordEmail({ to, url, user, headers }: ForgetPassword) {
  const locale = resolveLocale({ headers });
  const t = await nodeTranslations(locale);

  const response = await sendEmail({
    from: `${SITE_NAME} <noreply@kucluck.com>`,
    to,
    subject: t('services.reset-password.subject'),
    html: forgetPasswordTemplate({ url, t, user }),
  });

  return response;
}

export async function sendDeleteAccountEmail({ to, url, user, headers }: ForgetPassword) {
  const locale = resolveLocale({ headers });
  const t = await nodeTranslations(locale);

  const response = await sendEmail({
    from: `${SITE_NAME} <noreply@kucluck.com>`,
    to,
    subject: t('services.delete-account.subject', { sitename: SITE_NAME }),
    html: deleteAccountTemplate({ url, t, user }),
  });

  return response;
}
