import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import {
  validateEnquiryPayload,
  escapeHtml,
  buildEnquiryEmailHtml,
  buildEnquiryEmailText,
} from '../src/utils/enquiry.ts';
import handler from '../api/send-enquiry.ts';

console.log('Running enquiry validation & formatting unit tests...');

// 1. Valid payload test
const validPayload = {
  formSource: 'contact-page',
  name: 'Sarah Jenkins',
  email: 'sarah.jenkins@company.com.my',
  phone: '+60 12-345 6789',
  organisation: 'Apex Logistics Sdn Bhd',
  sector: 'Private Enterprise / Corporation',
  track: 'Leadership & Management',
  participants: '6-15',
  message: 'Seeking customized cohort training.',
  honeypot: '',
};

const res1 = validateEnquiryPayload(validPayload);
assert.equal(res1.valid, true, 'Valid payload should pass validation');

// 2. Honeypot bot detection test
const botPayload = {
  ...validPayload,
  honeypot: 'http://spam-link.ru',
};
const res2 = validateEnquiryPayload(botPayload);
assert.equal(res2.valid, false);
assert.equal(res2.error, 'bot_detected', 'Honeypot should trigger bot_detected');

// 3. Invalid email test
const invalidEmailPayload = {
  ...validPayload,
  email: 'not-an-email',
};
const res3 = validateEnquiryPayload(invalidEmailPayload);
assert.equal(res3.valid, false, 'Invalid email format should fail');

// 4. Missing required name test
const missingNamePayload = {
  ...validPayload,
  name: ' ',
};
const res4 = validateEnquiryPayload(missingNamePayload);
assert.equal(res4.valid, false, 'Missing name should fail');

// 5. HTML escaping test
const rawInput = '<script>alert("xss")</script> & "quotes"';
const escaped = escapeHtml(rawInput);
assert.equal(escaped.includes('<script>'), false, 'HTML tags must be escaped');
assert.equal(escaped.includes('&lt;script&gt;'), true, 'HTML tags should be safely entity-encoded');

// 6. Build email HTML test
const emailHtml = buildEnquiryEmailHtml(validPayload);
assert.equal(emailHtml.includes('Sarah Jenkins'), true, 'Email HTML contains user name');
assert.equal(emailHtml.includes('Apex Logistics Sdn Bhd'), true, 'Email HTML contains organisation');
assert.equal(emailHtml.includes('Dedicated Contact &amp; Enquiry Page'), true, 'Email HTML indicates form origin');

// 7. Build email plain-text test
const emailText = buildEnquiryEmailText(validPayload);
assert.equal(emailText.includes('Sarah Jenkins'), true, 'Email plain text contains user name');
assert.equal(emailText.includes('Apex Logistics Sdn Bhd'), true, 'Email plain text contains organisation');
assert.equal(emailText.includes('Leadership & Management'), true, 'Email plain text contains track');
assert.equal(emailText.includes('Dedicated Contact & Enquiry Page'), true, 'Email plain text indicates form origin');

console.log('Running API handler unit tests (api/send-enquiry.ts)...');

function createMockRes() {
  const res = {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(key, val) {
      res.headers[key] = val;
      return res;
    },
    status(code) {
      res.statusCode = code;
      return res;
    },
    json(data) {
      res.body = data;
      return res;
    },
  };
  return res;
}

// 8. Handler: Rejects non-POST requests with 405 Method Not Allowed
{
  const mockRes = createMockRes();
  await handler({ method: 'GET' }, mockRes);
  assert.equal(mockRes.statusCode, 405, 'Non-POST should return 405');
  assert.equal(mockRes.body.success, false);
}

// 9. Handler: Rejects malformed JSON string with 400
{
  const mockRes = createMockRes();
  await handler({ method: 'POST', body: '{malformed_json:' }, mockRes);
  assert.equal(mockRes.statusCode, 400, 'Malformed JSON string should return 400');
  assert.equal(mockRes.body.error, 'Invalid JSON payload.');
}

// 10. Handler: Rejects payload exceeding MAX_BODY_SIZE with 413
{
  const mockRes = createMockRes();
  const oversized = 'x'.repeat(65 * 1024);
  await handler({ method: 'POST', body: oversized }, mockRes);
  assert.equal(mockRes.statusCode, 413, 'Oversized payload should return 413');
}

// 11. Handler: Silently absorbs honeypot bot submissions with 200
{
  const mockRes = createMockRes();
  await handler({ method: 'POST', body: botPayload }, mockRes);
  assert.equal(mockRes.statusCode, 200, 'Honeypot submission should return 200');
  assert.equal(mockRes.body.success, true);
  assert.equal(mockRes.body.message, 'Enquiry received.');
}

// 12. Handler: Returns 400 on invalid payload
{
  const mockRes = createMockRes();
  await handler({ method: 'POST', body: missingNamePayload }, mockRes);
  assert.equal(mockRes.statusCode, 400, 'Invalid payload should return 400');
  assert.equal(mockRes.body.success, false);
}

// 13. Handler: Returns 503 when SMTP credentials or recipient are missing
{
  const originalUser = process.env.SMTP_USER;
  const originalPass = process.env.SMTP_PASS;
  const originalRecipient = process.env.ENQUIRY_RECIPIENT_EMAIL;

  delete process.env.SMTP_USER;
  delete process.env.SMTP_PASS;
  delete process.env.ENQUIRY_RECIPIENT_EMAIL;

  const mockRes = createMockRes();
  await handler({ method: 'POST', body: validPayload }, mockRes);
  assert.equal(mockRes.statusCode, 503, 'Missing credentials should return 503');
  assert.equal(mockRes.body.success, false);

  process.env.SMTP_USER = originalUser;
  process.env.SMTP_PASS = originalPass;
  process.env.ENQUIRY_RECIPIENT_EMAIL = originalRecipient;
}

// 14. Handler: Successfully delivers email with mocked Nodemailer
{
  const originalCreateTransport = nodemailer.createTransport;
  let sentMailOptions = null;

  nodemailer.createTransport = (config) => {
    assert.equal(config.host, 'smtp.gmail.com');
    assert.equal(config.port, 465);
    assert.equal(config.secure, true);
    assert.equal(config.connectionTimeout, 10000);
    return {
      sendMail: async (options) => {
        sentMailOptions = options;
        return { messageId: '<test-message-id-123@korporatlygroup.com>' };
      },
    };
  };

  process.env.SMTP_USER = 'corporatewellness@korporatlygroup.com';
  process.env.SMTP_PASS = 'mock-password';
  process.env.ENQUIRY_RECIPIENT_EMAIL = 'corporatewellness@korporatlygroup.com';

  const mockRes = createMockRes();
  await handler({ method: 'POST', body: validPayload }, mockRes);

  assert.equal(mockRes.statusCode, 200, 'Mocked SMTP dispatch should return 200');
  assert.equal(mockRes.body.success, true);
  assert.equal(mockRes.body.id, '<test-message-id-123@korporatlygroup.com>');
  assert.equal(sentMailOptions.to, 'corporatewellness@korporatlygroup.com');
  assert.ok(sentMailOptions.replyTo.includes('sarah.jenkins@company.com.my'));
  assert.ok(sentMailOptions.subject.includes('Apex Logistics Sdn Bhd'));

  nodemailer.createTransport = originalCreateTransport;
}

// 15. Handler: Safely returns 502 Bad Gateway when SMTP transport throws
{
  const originalCreateTransport = nodemailer.createTransport;

  nodemailer.createTransport = () => {
    return {
      sendMail: async () => {
        const error = new Error('Invalid login: 535-5.7.8 Username and Password not accepted');
        error.code = 'EAUTH';
        throw error;
      },
    };
  };

  process.env.SMTP_USER = 'corporatewellness@korporatlygroup.com';
  process.env.SMTP_PASS = 'wrong-password';
  process.env.ENQUIRY_RECIPIENT_EMAIL = 'corporatewellness@korporatlygroup.com';

  const mockRes = createMockRes();
  await handler({ method: 'POST', body: validPayload }, mockRes);

  assert.equal(mockRes.statusCode, 502, 'SMTP failure should return 502 Bad Gateway');
  assert.equal(mockRes.body.success, false);
  // Ensure sensitive error message / credentials were NOT leaked in the response body
  assert.equal(mockRes.body.error.includes('535-5.7.8'), false, 'Credentials/internal SMTP trace should not leak');

  nodemailer.createTransport = originalCreateTransport;
}

console.log('All enquiry validation, plain-text formatting, and API handler tests passed successfully!');

