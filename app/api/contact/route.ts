import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { name, email, subject, phone, country, message } = await req.json()

    // Setup mail transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Send email
    await transporter.sendMail({
      from: `"Calqulate.net" <${process.env.SMTP_USER}>`,
      to: "shreerise@gmail.com",
      subject: `New Contact Form: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Country: ${country}
Message:
${message}
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
