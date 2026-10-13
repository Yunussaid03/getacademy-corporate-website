import { validateEnquiryPayload, buildEnquiryEmailHtml, type EnquiryPayload } from '../src/utils/enquiry';

declare const process: {
  env: Record<string, string | undefined>;
};

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
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.ENQUIRY_RECIPIENT_EMAIL;
    const senderEmail = process.env.ENQUIRY_SENDER_EMAIL || 'GET Academy Website <onboarding@resend.dev>';

    // If configuration is missing, fail honestly with a 503 Service Unavailable
    if (!resendApiKey || !recipientEmail) {
      console.error(
        '[Enquiry Handler Error] Missing required server configuration: RESEND_API_KEY or ENQUIRY_RECIPIENT_EMAIL is not set.'
      );
      return res.status(503).json({
        success: false,
        error: 'The enquiry delivery service is not fully configured on the server. Please contact us directly at our official phone or email.',
      });
    }

    // 5. Construct email HTML and plain text fallback
    const emailHtml = buildEnquiryEmailHtml(payload);
    const emailSubject = `[Training Enquiry] ${payload.organisation} — ${payload.track}`;

    // 6. Dispatch to Resend REST API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'GETAcademy-Website/1.0',
      },
      body: JSON.stringify({
        from: senderEmail,
        to: [recipientEmail],
        reply_to: payload.email,
        subject: emailSubject,
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('[Resend API Error]', resendResponse.status, errorText);

      return res.status(502).json({
        success: false,
        error: 'Unable to deliver your enquiry at this time due to an upstream provider issue. Please try again shortly.',
      });
    }

    const result = await resendResponse.json();

    return res.status(200).json({
      success: true,
      message: 'Your training consultation enquiry has been delivered successfully.',
      id: result?.id,
    });
  } catch (error: any) {
    console.error('[Enquiry Handler Exception]', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected internal server error occurred while processing your enquiry. Please try again later.',
    });
  }
}
