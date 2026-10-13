import assert from 'node:assert/strict';
import { validateEnquiryPayload, escapeHtml, buildEnquiryEmailHtml } from '../src/utils/enquiry.ts';

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

console.log('All enquiry validation tests passed successfully!');
