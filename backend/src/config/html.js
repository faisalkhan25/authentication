export const getOtpHtml = ({ email, otp }) => {
  const appName = process.env.APP_NAME || "Authentication App";

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>${appName} Verification Code</title>
    <style>
      html, body {
        margin: 0;
        padding: 0;
      }
      body {
        background: #f6f7fb;
        color: #111111;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
      }
      table {
        border-collapse: collapse;
      }
      img {
        border: 0;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        display: block;
        max-width: 100%;
        height: auto;
      }
      .wrapper {
        width: 100%;
        background: #f6f7fb;
      }
      .container {
        width: 600px;
        max-width: 600px;
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid #e9ecf3;
      }
      .p-24 {
        padding: 24px;
      }
      .p-32 {
        padding: 32px;
      }
      .header {
        background: #111827;
        padding: 18px 24px;
        text-align: center;
      }
      .brand {
        display: inline-block;
        color: #ffffff;
        font-weight: 700;
        font-size: 16px;
        letter-spacing: 0.3px;
        text-decoration: none;
      }
      .title {
        margin: 0 0 12px 0;
        font-size: 22px;
        line-height: 1.3;
        color: #111111;
        font-weight: 700;
      }
      .text {
        margin: 0 0 16px 0;
        font-size: 15px;
        line-height: 1.6;
        color: #444444;
      }
      .muted {
        color: #555555;
        font-size: 14px;
        line-height: 1.6;
        margin: 0 0 12px 0;
      }
      .otp-wrap {
        margin: 20px 0;
        width: 100%;
      }
      .otp {
        display: inline-block;
        background: #f3f4f6;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        padding: 14px 18px;
        font-size: 32px;
        letter-spacing: 10px;
        font-weight: 700;
        color: #111111;
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      }
      .footer {
        text-align: center;
        color: #6b7280;
        font-size: 12px;
        line-height: 1.6;
        padding: 16px 24px 0 24px;
      }
      @media only screen and (max-width: 600px) {
        .container {
          width: 100% !important;
        }
        .p-32 {
          padding: 24px !important;
        }
        .otp {
          font-size: 28px !important;
          letter-spacing: 6px !important;
        }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; background: #f6f7fb; color: #111111; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table role="presentation" class="wrapper" width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 100%; background: #f6f7fb; border-collapse: collapse;">
      <tr>
        <td align="center" class="p-24" style="padding: 24px;">
          <table role="presentation" class="container" width="600" border="0" cellspacing="0" cellpadding="0" style="width: 600px; max-width: 600px; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e9ecf3; border-collapse: collapse;">
            <!-- Header -->
            <tr>
              <td class="header" align="center" style="background: #111827; padding: 18px 24px; text-align: center;">
                <span class="brand" style="display: inline-block; color: #ffffff; font-weight: 700; font-size: 16px; letter-spacing: 0.3px; text-decoration: none;">${appName}</span>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td class="p-32" style="padding: 32px;">
                <h1 class="title" style="margin: 0 0 12px 0; font-size: 22px; line-height: 1.3; color: #111111; font-weight: 700;">Verify your email - ${email}</h1>
                <p class="text" style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #444444;">
                  Use the verification code below to complete your sign-in to ${appName}.
                </p>

                <!-- OTP -->
                <table role="presentation" class="otp-wrap" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 20px 0; width: 100%; border-collapse: collapse;">
                  <tr>
                    <td align="center">
                      <div class="otp" style="display: inline-block; background: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px 18px; font-size: 32px; letter-spacing: 10px; font-weight: 700; color: #111111; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">${otp}</div>
                    </td>
                  </tr>
                </table>

                <p class="muted" style="color: #555555; font-size: 14px; line-height: 1.6; margin: 0 0 12px 0;">This code will expire in <strong>5 minutes</strong>.</p>
                <p class="muted" style="color: #555555; font-size: 14px; line-height: 1.6; margin: 0 0 12px 0;">If this wasn’t initiated, this email can be safely ignored.</p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td class="footer" align="center" style="text-align: center; color: #6b7280; font-size: 12px; line-height: 1.6; padding: 16px 24px 0 24px;">
                © ${new Date().getFullYear()} ${appName}. All rights reserved.
              </td>
            </tr>
            <tr>
              <td height="16" aria-hidden="true" style="height: 16px; line-height: 16px; font-size: 0;">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return html;
};

export const getVerifyEmailHtml = ({ email, token }) => {
  const appName = process.env.APP_NAME || "Authentication App";
  const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";

  const verifyUrl = `${baseUrl.replace(/\/+$/, "")}/token/${encodeURIComponent(token)}`;

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>${appName} Verify Your Account</title>
    <style>
      html, body {
        margin: 0;
        padding: 0;
      }
      body {
        background: #f6f7fb;
        color: #111111;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
      }
      table {
        border-collapse: collapse;
      }
      img {
        border: 0;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        display: block;
        max-width: 100%;
        height: auto;
      }
      .wrapper {
        width: 100%;
        background: #f6f7fb;
      }
      .container {
        width: 600px;
        max-width: 600px;
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid #e9ecf3;
      }
      .p-24 {
        padding: 24px;
      }
      .p-32 {
        padding: 32px;
      }
      .header {
        background: #111827;
        padding: 18px 24px;
        text-align: center;
      }
      .brand {
        display: inline-block;
        color: #ffffff;
        font-weight: 700;
        font-size: 16px;
        letter-spacing: 0.3px;
        text-decoration: none;
      }
      .title {
        margin: 0 0 12px 0;
        font-size: 22px;
        line-height: 1.3;
        color: #111111;
        font-weight: 700;
      }
      .text {
        margin: 0 0 16px 0;
        font-size: 15px;
        line-height: 1.6;
        color: #444444;
      }
      .muted {
        color: #555555;
        font-size: 14px;
        line-height: 1.6;
        margin: 0 0 12px 0;
      }
      .btn {
        display: inline-block;
        background: #111827;
        color: #ffffff !important;
        text-decoration: none;
        padding: 12px 18px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
      }
      .footer {
        text-align: center;
        color: #6b7280;
        font-size: 12px;
        line-height: 1.6;
        padding: 16px 24px 0 24px;
      }
      .link {
        color: #111827;
        text-decoration: underline;
        word-break: break-all;
      }
      @media only screen and (max-width: 600px) {
        .container {
          width: 100% !important;
        }
        .p-32 {
          padding: 24px !important;
        }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; background: #f6f7fb; color: #111111; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table role="presentation" class="wrapper" width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 100%; background: #f6f7fb; border-collapse: collapse;">
      <tr>
        <td align="center" class="p-24" style="padding: 24px;">
          <table role="presentation" class="container" width="600" border="0" cellspacing="0" cellpadding="0" style="width: 600px; max-width: 600px; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e9ecf3; border-collapse: collapse;">
            <!-- Header -->
            <tr>
              <td class="header" align="center" style="background: #111827; padding: 18px 24px; text-align: center;">
                <span class="brand" style="display: inline-block; color: #ffffff; font-weight: 700; font-size: 16px; letter-spacing: 0.3px; text-decoration: none;">${appName}</span>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td class="p-32" style="padding: 32px;">
                <h1 class="title" style="margin: 0 0 12px 0; font-size: 22px; line-height: 1.3; color: #111111; font-weight: 700;">Verify your account - ${email}</h1>
                <p class="text" style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #444444;">
                  Thanks for registering with ${appName}. Click the button below to verify your account.
                </p>

                <!-- Button -->
                <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 16px 0 20px 0; border-collapse: collapse;">
                  <tr>
                    <td align="center" style="border-radius: 8px; background: #111827;">
                      <a class="btn" href="${verifyUrl}" target="_blank" rel="noopener" style="display: inline-block; background: #111827; color: #ffffff; text-decoration: none; padding: 12px 18px; border-radius: 8px; font-weight: 600; font-size: 14px;">Verify account</a>
                    </td>
                  </tr>
                </table>

                <p class="muted" style="color: #555555; font-size: 14px; line-height: 1.6; margin: 0 0 12px 0;">
                  If the button doesn’t work, copy and paste this link into your browser:
                </p>
                <p class="muted" style="color: #555555; font-size: 14px; line-height: 1.6; margin: 0 0 12px 0;">
                  <a class="link" href="${verifyUrl}" target="_blank" rel="noopener" style="color: #111827; text-decoration: underline; word-break: break-all;">${verifyUrl}</a>
                </p>

                <p class="muted" style="color: #555555; font-size: 14px; line-height: 1.6; margin: 0 0 12px 0;">
                  If this wasn’t you, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td class="footer" align="center" style="text-align: center; color: #6b7280; font-size: 12px; line-height: 1.6; padding: 16px 24px 0 24px;">
                © ${new Date().getFullYear()} ${appName}. All rights reserved.
              </td>
            </tr>
            <tr>
              <td height="16" aria-hidden="true" style="height: 16px; line-height: 16px; font-size: 0;">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return html;
};

