import { nodeTranslations, resolveLocale } from '@zx/i18n';
import { SITE_NAME } from '@zx/shared';

import { verifyEmail } from '../template';
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
    to: to,
    subject: t('services.verify-email.subject'),
    html: verifyEmail({ url, t }),
  });

  return response;
}
