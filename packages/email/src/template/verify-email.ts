import type { createTranslator } from 'use-intl';

import { baseTemplate, fontFamily } from './base';

interface VerifyEmail {
  url: string;
  t: ReturnType<typeof createTranslator>;
}

export const verifyEmail = ({ url, t }: VerifyEmail) => {
  const tBody = `
    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
      style="padding:25px 35px">
      <tbody>
        <tr>
          <td>
            <h1
              style="color:#333;font-size:20px;font-weight:bold;margin-bottom:15px;${fontFamily}">
              ${t('services.verify-email.subject')}
            </h1>
            <p
              style="font-size:14px;line-height:24px;margin:24px 0;color:#333;margin-bottom:25px;${fontFamily}">
              ${t('services.verify-email.main-text')}
            </p>

            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
              role="presentation"
              style="max-width:37.5em;margin-left:auto;margin-right:auto;box-sizing:border-box;padding-top:1rem;padding-bottom:1rem;">
              <tbody>
                <tr style="width:100%">
                  <td>
                    <a href="${url}"
                      style="line-height:100%;text-decoration:none;display:inline-block;max-width:100%;mso-padding-alt:0px;width:100%;box-sizing:border-box;padding:12px 12px 12px 12px;font-weight:600;border-radius:8px;text-align:center;background-color:rgb(0, 102, 9);color:rgb(255,255,255);${fontFamily}" target="_blank">
                      <span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">
                        ${t('services.verify-email.button')}
                      </span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  `;

  return baseTemplate({ title: t('services.verify-email.subject'), tBody });
};
