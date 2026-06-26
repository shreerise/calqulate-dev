import nodemailer from "nodemailer";

/**
 * Dedicated SMTP transport for the feedback-popup welcome email.
 * Sender: meet.akabari@calqulate.net (Google Workspace / Gmail app password).
 *
 * Set these in .env.local — you provide the 16-digit app password:
 *   FEEDBACK_SMTP_HOST=smtp.gmail.com
 *   FEEDBACK_SMTP_PORT=465
 *   FEEDBACK_SMTP_USER=meet.akabari@calqulate.net
 *   FEEDBACK_SMTP_PASS=<16-digit app password>
 *   FEEDBACK_FROM_EMAIL=meet.akabari@calqulate.net   (optional; defaults to USER)
 */

const HOST = process.env.FEEDBACK_SMTP_HOST ?? "smtp.gmail.com";
const PORT = Number(process.env.FEEDBACK_SMTP_PORT ?? 465);
const USER = process.env.FEEDBACK_SMTP_USER ?? "meet.akabari@calqulate.net";
const PASS = process.env.FEEDBACK_SMTP_PASS;
const FROM = process.env.FEEDBACK_FROM_EMAIL ?? USER;

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://calqulate.net").replace(/\/$/, "");

export function welcomeEmailConfigured(): boolean {
  return !!(HOST && USER && PASS);
}

function transport() {
  return nodemailer.createTransport({
    host: HOST,
    port: PORT,
    secure: PORT === 465, // 465 = implicit TLS, 587 = STARTTLS
    auth: { user: USER, pass: PASS },
  });
}

/** Warm, high-CTR subject line — general across every Calqulate calculator. */
const SUBJECT = "Thank you for your feedback 🙏 (a free health check is waiting inside)";

function buildHtml(toEmail: string): string {
  const unsubscribe = `${SITE}/unsubscribe?email=${encodeURIComponent(toEmail)}`;
  const heartAge = `${SITE}/health/heart-age-calculator`;
  const glp1 = `${SITE}/signup`;
  const dashboard = `${SITE}/signup`;

  // Inline styles only + table layout = reliable rendering across mail clients.
  // No remote images = better deliverability while the sender warms up.
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="light only" />
<title>Thanks from Calqulate Vitals</title>
</head>
<body style="margin:0;padding:0;background-color:#f7f8fa;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your feedback just shaped what we build next — plus a free health check inside.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f8fa;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

          <!-- Header -->
          <tr>
            <td style="background-color:#0b0f0e;padding:24px 28px;">
              <span style="font-size:18px;font-weight:700;color:#ffffff;">Calqulate <span style="color:#10b981;">Vitals</span></span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 28px 8px 28px;">
              <h1 style="margin:0 0 16px 0;font-size:22px;line-height:1.3;font-weight:700;color:#0b0f0e;">Thank you — we really mean it 💚</h1>
              <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#374151;">
                Hi there,
              </p>
              <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#374151;">
                Thank you so much for taking a moment to share your feedback with us. We read <strong>every single response</strong>, and yours is now part of how we decide what to build next. We're genuinely committed to improving — and the changes you suggested will be reviewed and rolled into an upcoming update.
              </p>
              <p style="margin:0 0 24px 0;font-size:16px;line-height:1.6;color:#374151;">
                While you're here, let us show you what <strong>Calqulate Vitals</strong> can already do for you today.
              </p>
            </td>
          </tr>

          <!-- Feature card -->
          <tr>
            <td style="padding:0 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f8fa;border-radius:12px;border:1px solid #e5e7eb;">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="margin:0 0 12px 0;font-size:15px;line-height:1.6;color:#111827;font-weight:600;">One dashboard for your whole health story:</p>
                    <p style="margin:0 0 8px 0;font-size:15px;line-height:1.6;color:#374151;">✓ Your <strong>metabolic health score</strong> &amp; <strong>heart-age tracker</strong></p>
                    <p style="margin:0 0 8px 0;font-size:15px;line-height:1.6;color:#374151;">✓ A <strong>GLP-1 tracker</strong> to follow your progress in real time</p>
                    <p style="margin:0 0 8px 0;font-size:15px;line-height:1.6;color:#374151;">✓ Real-time insights — all in one place, no spreadsheets</p>
                    <p style="margin:0;font-size:15px;line-height:1.6;color:#374151;">✓ A clean, <strong>doctor-sharable report</strong> you can bring to any appointment</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA buttons -->
          <tr>
            <td style="padding:28px 28px 8px 28px;" align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
                <tr>
                  <td align="center" style="padding-bottom:12px;">
                    <a href="${heartAge}" style="display:block;background-color:#10b981;color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;padding:14px 24px;border-radius:10px;text-align:center;">Check your heart age — free →</a>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <a href="${glp1}" style="display:block;background-color:#ffffff;color:#0b0f0e;text-decoration:none;font-size:16px;font-weight:600;padding:13px 24px;border-radius:10px;text-align:center;border:1.5px solid #d1d5db;">Try the GLP-1 tracker →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 28px 8px 28px;">
              <p style="margin:0;font-size:15px;line-height:1.6;color:#374151;">
                Prefer the full picture? <a href="${dashboard}" style="color:#059669;font-weight:600;text-decoration:underline;">Create your free dashboard</a> and see all of it in one place.
              </p>
            </td>
          </tr>

          <!-- Sign-off -->
          <tr>
            <td style="padding:20px 28px 4px 28px;">
              <p style="margin:0 0 4px 0;font-size:16px;line-height:1.6;color:#374151;">Warmly,</p>
              <p style="margin:0;font-size:16px;line-height:1.5;color:#0b0f0e;font-weight:600;">Meet Akabari</p>
              <p style="margin:0;font-size:14px;line-height:1.5;color:#6b7280;">Calqulate Vitals · calqulate.net</p>
            </td>
          </tr>

          <!-- PS line (reply driver) -->
          <tr>
            <td style="padding:16px 28px 24px 28px;">
              <p style="margin:0;font-size:15px;line-height:1.6;color:#374151;font-style:italic;">
                P.S. Just hit <strong>reply</strong> and tell me the one health number you wish you understood better — I read and answer every email personally. 💬
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f7f8fa;padding:20px 28px;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 6px 0;font-size:12px;line-height:1.5;color:#9ca3af;">
                You received this email because you submitted feedback and subscribed to updates at calqulate.net.
              </p>
              <p style="margin:0;font-size:12px;line-height:1.5;color:#9ca3af;">
                Don't want updates? <a href="${unsubscribe}" style="color:#6b7280;text-decoration:underline;">Unsubscribe here</a>. · © Calqulate.net
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildText(toEmail: string): string {
  const unsubscribe = `${SITE}/unsubscribe?email=${encodeURIComponent(toEmail)}`;
  return [
    "Thank you — we really mean it.",
    "",
    "Thank you so much for sharing your feedback. We read every single response, and yours is now part of how we decide what to build next. The changes you suggested will be reviewed and rolled into an upcoming update.",
    "",
    "While you're here, here's what Calqulate Vitals can do for you today — one dashboard for your whole health story:",
    "- Your metabolic health score & heart-age tracker",
    "- A GLP-1 tracker to follow your progress in real time",
    "- Real-time insights, all in one place",
    "- A clean, doctor-sharable report for any appointment",
    "",
    `Check your heart age (free): ${SITE}/health/heart-age-calculator`,
    `Try the GLP-1 tracker: ${SITE}/signup`,
    `Create your free dashboard: ${SITE}/signup`,
    "",
    "Warmly,",
    "Meet Akabari",
    "Calqulate Vitals · calqulate.net",
    "",
    "P.S. Just hit reply and tell me the one health number you wish you understood better — I read and answer every email personally.",
    "",
    "You received this email because you submitted feedback and subscribed to updates at calqulate.net.",
    `Unsubscribe: ${unsubscribe}`,
  ].join("\n");
}

/** Send the automated welcome / feedback-confirmation email to the submitter. */
export async function sendWelcomeEmail(to: string) {
  if (!welcomeEmailConfigured()) {
    throw new Error("FEEDBACK_SMTP_* env vars are not configured.");
  }
  return transport().sendMail({
    from: `Meet Akabari · Calqulate Vitals <${FROM}>`,
    to,
    subject: SUBJECT,
    html: buildHtml(to),
    text: buildText(to),
    replyTo: FROM,
    headers: {
      "List-Unsubscribe": `<${SITE}/api/unsubscribe?email=${encodeURIComponent(to)}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  });
}
