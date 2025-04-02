import { LOGO_URL, SITE_NAME } from '@zx/shared';

export const fontFamily = `font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif`;

export const baseTemplate = ({ title, tBody }: { title: string; tBody: string }) => {
  return `
 <!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html dir="ltr" lang="en">

  <head>
    <link rel="preload" as="image"
      href="${LOGO_URL}" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>

  <body style="background-color:#fff;color:#212121">
    <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
      ${title}
    </div>
    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
      style="max-width:40em;padding:20px;margin:0 auto;background-color:#eee">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
              style="background-color:#fff">
              <tbody>
                <tr>
                  <td>
                    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
                      style="background-color:#13181f;padding:20px;width:100%">
                      <tbody>
                        <tr>
                          <td>
                            <img alt="${SITE_NAME}" height="60"
                              src="${LOGO_URL}"
                              style="display:block;outline:none;border:none;margin:0 auto;text-decoration:none"
                              width="60" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    ${tBody}
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style="text-align:center;font-size:12px;line-height:24px;margin:10px 0;color:#333;padding:0 20px;${fontFamily}">
              © 2025 ${SITE_NAME}. All rights reserved.
              <br />
              Script and Design by
              <a href="https://www.instagram.com/lukman_nov/"
                style="color:#2754C5;text-decoration-line:none;font-size:14px;text-decoration:underline;${fontFamily}"
                target="_blank">lukman_nov</a>.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>

  </html>
  `;
};
