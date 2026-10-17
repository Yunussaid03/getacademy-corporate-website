import nodemailer from 'nodemailer';
import {
  validateEnquiryPayload,
  buildEnquiryEmailHtml,
  buildEnquiryEmailText,
  type EnquiryPayload,
} from '../src/utils/enquiry.ts';

// Max body size: 64 KB
const MAX_BODY_SIZE = 64 * 1024;

export default async function handler(req: any, res: any) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Only POST requests are supported.',
    });
  }

  try {
    // 2. Validate request body presence and size
    let body = req.body;
    if (typeof body === 'string') {
      if (body.length > MAX_BODY_SIZE) {
        return res.status(413).json({
          success: false,
          error: 'Payload Too Large. Please shorten your submission details.',
        });
      }
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({
          success: false,
          error: 'Invalid JSON payload.',
        });
      }
    }

    // 3. Validate input payload and honeypot
    const validation = validateEnquiryPayload(body);
    if (!validation.valid) {
      // If honeypot triggered, silently return success without sending email
      if (validation.error === 'bot_detected') {
        return res.status(200).json({
          success: true,
          message: 'Enquiry received.',
        });
      }

      return res.status(400).json({
        success: false,
        error: validation.error || 'Invalid form submission.',
      });
    }

    const payload = body as EnquiryPayload;

    // 4. Read server environment variables
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpSecure = process.env.SMTP_SECURE !== 'false'; // Default to true for SSL/TLS (port 465)
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const recipientEmail = process.env.ENQUIRY_RECIPIENT_EMAIL;
    const senderEmail = process.env.ENQUIRY_SENDER_EMAIL || (smtpUser ? `"Korporatly Group Enquiries" <${smtpUser}>` : undefined);

    // If required SMTP credentials or recipient are missing, return 503 Service Unavailable
    if (!smtpUser || !smtpPass || !recipientEmail) {
      console.error(
        '[Enquiry Handler Error] Missing required server configuration: SMTP_USER, SMTP_PASS, or ENQUIRY_RECIPIENT_EMAIL is not set.'
      );
      return res.status(503).json({
        success: false,
        error: 'The enquiry delivery service is not fully configured on the server. Please contact us directly at our official phone or email.',
      });
    }

    // 5. Construct email HTML and plain-text fallback
    const emailHtml = buildEnquiryEmailHtml(payload);
    const emailText = buildEnquiryEmailText(payload);
    const emailSubject = `[Training Enquiry] ${payload.organisation} — ${payload.track}`;

    // 6. Configure Nodemailer transport with resilient timeouts for serverless environments
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 10000, // 10s connection timeout
      greetingTimeout: 10000,   // 10s greeting timeout
      socketTimeout: 10000,     // 10s socket activity timeout
    });

    // 7. Dispatch email via Google SMTP
    let info;
    try {
      info = await transporter.sendMail({
        from: senderEmail || `"Korporatly Group Enquiries" <${smtpUser}>`,
        to: recipientEmail,
        replyTo: `"${payload.name.replace(/["\r\n]/g, '')}" <${payload.email}>`,
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      });
    } catch (smtpErr: any) {
      // Log sanitized error message on server without exposing credentials or internal traces to user
      console.error('[SMTP Delivery Error]', smtpErr?.code || smtpErr?.message || 'Unknown SMTP error');
      return res.status(502).json({
        success: false,
        error: 'Unable to deliver your enquiry at this time due to an upstream mail service issue. Please try again shortly or contact us directly.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your training consultation enquiry has been delivered successfully.',
      id: info?.messageId,
    });
  } catch (error: any) {
    console.error('[Enquiry Handler Exception]', error?.message || 'Internal handler error');
    return res.status(500).json({
      success: false,
      error: 'An unexpected internal server error occurred while processing your enquiry. Please try again later.',
    });
  }
}

