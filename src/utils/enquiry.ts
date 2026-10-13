export interface EnquiryPayload {
  formSource: 'contact-page' | 'homepage-hero';
  name: string;
  email: string;
  phone?: string;
  organisation: string;
  sector: string;
  track: string;
  participants?: string;
  message?: string;
  honeypot?: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function validateEnquiryPayload(data: unknown): ValidationResult {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid submission payload.' };
  }

  const p = data as Record<string, unknown>;

  // Check Honeypot: if populated, mark as bot submission
  if (typeof p.honeypot === 'string' && p.honeypot.trim().length > 0) {
    return { valid: false, error: 'bot_detected' };
  }

  // Validate required string fields
  const name = typeof p.name === 'string' ? p.name.trim() : '';
  const email = typeof p.email === 'string' ? p.email.trim() : '';
  const organisation = typeof p.organisation === 'string' ? p.organisation.trim() : '';
  const sector = typeof p.sector === 'string' ? p.sector.trim() : '';
  const track = typeof p.track === 'string' ? p.track.trim() : '';

  if (!name || name.length < 2 || name.length > 120) {
    return { valid: false, error: 'Please provide a valid full name (2–120 characters).' };
  }

  // Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email) || email.length > 254) {
    return { valid: false, error: 'Please provide a valid corporate or work email address.' };
  }

  if (!organisation || organisation.length < 2 || organisation.length > 200) {
    return { valid: false, error: 'Please provide a valid organisation or company name.' };
  }

  if (!sector || sector.length < 2 || sector.length > 100) {
    return { valid: false, error: 'Please select a valid sector type.' };
  }

  if (!track || track.length < 2 || track.length > 120) {
    return { valid: false, error: 'Please select a primary capability track or training category.' };
  }

  // Optional fields length check
  if (typeof p.phone === 'string' && p.phone.trim().length > 50) {
    return { valid: false, error: 'Phone number exceeds maximum length.' };
  }

  if (typeof p.participants === 'string' && p.participants.trim().length > 50) {
    return { valid: false, error: 'Participant count value is invalid.' };
  }

  if (typeof p.message === 'string' && p.message.trim().length > 3000) {
    return { valid: false, error: 'Message content exceeds maximum allowed length of 3000 characters.' };
  }

  return { valid: true };
}

export function buildEnquiryEmailHtml(payload: EnquiryPayload): string {
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safePhone = payload.phone ? escapeHtml(payload.phone) : 'Not specified';
  const safeOrg = escapeHtml(payload.organisation);
  const safeSector = escapeHtml(payload.sector);
  const safeTrack = escapeHtml(payload.track);
  const safeParticipants = payload.participants ? escapeHtml(payload.participants) : 'Not specified';
  const safeMessage = payload.message ? escapeHtml(payload.message).replace(/\n/g, '<br/>') : 'None provided';
  const safeFormSource = escapeHtml(payload.formSource === 'homepage-hero' ? 'Homepage Quick Consultation Form' : 'Dedicated Contact & Enquiry Page (/contact)');
  const dateStr = new Date().toUTCString();

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Corporate Training Enquiry</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9f8; color: #1e2925; margin: 0; padding: 24px; }
    .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8e5; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
    .header { background: #2D5444; color: #ffffff; padding: 24px 32px; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
    .header p { margin: 4px 0 0 0; font-size: 13px; color: #E7DEBE; }
    .body-content { padding: 32px; }
    .field-group { margin-bottom: 20px; }
    .label { font-size: 11px; text-transform: uppercase; font-weight: 700; color: #5a7368; letter-spacing: 0.5px; margin-bottom: 4px; }
    .value { font-size: 15px; color: #1e2925; font-weight: 500; }
    .message-box { background: #f7f9f8; border: 1px solid #e2e8e5; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #2d3748; margin-top: 6px; }
    .grid { display: table; width: 100%; }
    .col { display: table-cell; width: 50%; vertical-align: top; }
    .footer { background: #f1f5f3; padding: 16px 32px; border-top: 1px solid #e2e8e5; font-size: 12px; color: #718096; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; background: #E7DEBE; color: #2D5444; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>New Corporate Training Enquiry</h1>
      <p>Submitted via GET Academy Corporate Website &bull; ${dateStr}</p>
    </div>
    <div class="body-content">
      <div class="field-group">
        <div class="label">Submission Origin</div>
        <div class="value"><span class="badge">${safeFormSource}</span></div>
      </div>
      
      <div class="grid">
        <div class="col" style="padding-right: 12px;">
          <div class="field-group">
            <div class="label">Contact Name</div>
            <div class="value">${safeName}</div>
          </div>
        </div>
        <div class="col" style="padding-left: 12px;">
          <div class="field-group">
            <div class="label">Corporate Email</div>
            <div class="value"><a href="mailto:${safeEmail}" style="color: #2D5444; text-decoration: none; font-weight: bold;">${safeEmail}</a></div>
          </div>
        </div>
      </div>

      <div class="grid">
        <div class="col" style="padding-right: 12px;">
          <div class="field-group">
            <div class="label">Phone / WhatsApp</div>
            <div class="value">${safePhone}</div>
          </div>
        </div>
        <div class="col" style="padding-left: 12px;">
          <div class="field-group">
            <div class="label">Organisation / Entity</div>
            <div class="value"><strong>${safeOrg}</strong></div>
          </div>
        </div>
      </div>

      <div class="grid">
        <div class="col" style="padding-right: 12px;">
          <div class="field-group">
            <div class="label">Sector Type</div>
            <div class="value">${safeSector}</div>
          </div>
        </div>
        <div class="col" style="padding-left: 12px;">
          <div class="field-group">
            <div class="label">Estimated Participants</div>
            <div class="value">${safeParticipants}</div>
          </div>
        </div>
      </div>

      <div class="field-group">
        <div class="label">Training Category of Interest</div>
        <div class="value" style="color: #2D5444; font-weight: 700; font-size: 16px;">${safeTrack}</div>
      </div>

      <div class="field-group">
        <div class="label">Specific Objectives or Requirements</div>
        <div class="message-box">${safeMessage}</div>
      </div>
    </div>
    <div class="footer">
      This notification was generated automatically by GET Academy's corporate website enquiry dispatch handler.
    </div>
  </div>
</body>
</html>
  `.trim();
}
