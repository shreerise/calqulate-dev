import "server-only";
import nodemailer from "nodemailer";

/**
 * SMTP transport for the support@calqulate.net mailbox (weekly digests).
 * Set these in .env.local (you provide host/user/pass):
 *   SUPPORT_SMTP_HOST, SUPPORT_SMTP_PORT, SUPPORT_SMTP_USER, SUPPORT_SMTP_PASS
 *   SUPPORT_FROM_EMAIL=support@calqulate.net
 */
export function emailConfigured(): boolean {
  return !!(process.env.SUPPORT_SMTP_HOST && process.env.SUPPORT_SMTP_USER && process.env.SUPPORT_SMTP_PASS);
}

function transport() {
  const port = Number(process.env.SUPPORT_SMTP_PORT ?? 587);
  return nodemailer.createTransport({
    host: process.env.SUPPORT_SMTP_HOST,
    port,
    secure: port === 465, // 465 = implicit TLS; 587 = STARTTLS
    auth: { user: process.env.SUPPORT_SMTP_USER, pass: process.env.SUPPORT_SMTP_PASS },
  });
}

export async function sendEmail(opts: { to: string; subject: string; html: string; text?: string }) {
  if (!emailConfigured()) throw new Error("SMTP not configured (SUPPORT_SMTP_* env vars missing).");
  const from = process.env.SUPPORT_FROM_EMAIL ?? "support@calqulate.net";
  return transport().sendMail({
    from: `Calqulate Vitals <${from}>`,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
  });
}
