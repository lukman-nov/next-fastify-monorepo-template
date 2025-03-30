import { SITE_NAME } from '@zx/shared';

import { env } from './env';

interface SendEmail {
  from?: string;
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ from, to, subject, html }: SendEmail) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: from ?? `${SITE_NAME} <noreply@kucluck.com>`,
      to,
      subject,
      html,
    }),
  });

  return response;
}
