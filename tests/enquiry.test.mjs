import assert from 'node:assert/strict';
import {
  validateEnquiryPayload,
  escapeHtml,
  buildEnquiryEmailText,
  buildEnquirySubject,
  generateMailtoDraft,
  formatClipboardSummary,
  DEFAULT_ENQUIRY_RECIPIENT,
  MAX_MAILTO_URL_LENGTH,
} from '../src/utils/enquiry.ts';

console.log('Running static enquiry validation, formatting & mailto draft unit tests...');

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
  honeypot: 'http://spam-bot.ru',
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

// 4. Missing required fields test (name, organisation, sector, track)
assert.equal(validateEnquiryPayload({ ...validPayload, name: ' ' }).valid, false, 'Missing name must fail');
assert.equal(validateEnquiryPayload({ ...validPayload, organisation: '' }).valid, false, 'Missing organisation must fail');
assert.equal(validateEnquiryPayload({ ...validPayload, sector: '' }).valid, false, 'Missing sector must fail');
assert.equal(validateEnquiryPayload({ ...validPayload, track: '' }).valid, false, 'Missing track must fail');

// 5. HTML escaping test
const rawInput = '<script>alert("xss")</script> & "quotes"';
const escaped = escapeHtml(rawInput);
assert.equal(escaped.includes('<script>'), false, 'HTML tags must be escaped');
assert.equal(escaped.includes('&lt;script&gt;'), true, 'HTML tags should be safely entity-encoded');

// 6. Build email plain-text test & Honeypot exclusion
const emailText = buildEnquiryEmailText(validPayload);
assert.equal(emailText.includes('Sarah Jenkins'), true, 'Email text contains user name');
assert.equal(emailText.includes('Apex Logistics Sdn Bhd'), true, 'Email text contains organisation');
assert.equal(emailText.includes('Leadership & Management'), true, 'Email text contains track');
assert.equal(emailText.includes('Dedicated Contact & Enquiry Page'), true, 'Email text indicates form origin');
assert.equal(emailText.includes('honeypot'), false, 'Email body must never mention honeypot');
assert.equal(emailText.includes('spam-bot'), false, 'Email body must never include honeypot value');

// 7. Subject line generation
const subject = buildEnquirySubject(validPayload);
assert.equal(subject, '[Training Enquiry] Apex Logistics Sdn Bhd — Leadership & Management');

// 8. Mailto draft generation and recipient routing
const draft = generateMailtoDraft(validPayload);
assert.equal(draft.recipient, DEFAULT_ENQUIRY_RECIPIENT);
assert.equal(draft.recipient, 'admin@korporatlygroup.com');
assert.equal(draft.isTooLong, false, 'Standard draft should be under 2000 chars');
assert.ok(draft.mailtoUrl.startsWith('mailto:admin@korporatlygroup.com?subject='));
assert.ok(draft.mailtoUrl.includes('body='));

// 9. URL encoding test: spaces, punctuation, multiline, Unicode
const complexPayload = {
  ...validPayload,
  organisation: 'Müller & Söhne (Asia-Pacific) Sdn. Bhd.',
  track: 'AI Strategy / Data & Analytics',
  message: 'Line 1: Hello World!\nLine 2: Special chars: & = ? # %\nLine 3: Unicode: 日本語 / Bahasa / 中文 ✨',
};
const complexDraft = generateMailtoDraft(complexPayload);
// Verify that URL does not have raw literal spaces or raw newlines
assert.equal(complexDraft.mailtoUrl.includes(' '), false, 'URL must not contain raw spaces');
assert.equal(complexDraft.mailtoUrl.includes('\n'), false, 'URL must not contain raw newlines');
assert.equal(complexDraft.mailtoUrl.includes('\r'), false, 'URL must not contain raw carriage returns');
// Verify encoded ampersands, percent signs, and Unicode characters exist in encoded string
assert.ok(complexDraft.mailtoUrl.includes(encodeURIComponent('Müller & Söhne')));
assert.ok(complexDraft.mailtoUrl.includes(encodeURIComponent('日本語 / Bahasa / 中文 ✨')));

// 10. Long message URL length limitation test (> 2000 characters)
const longMessage = 'A'.repeat(2500);
const longPayload = {
  ...validPayload,
  message: longMessage,
};
const longDraft = generateMailtoDraft(longPayload);
assert.ok(longDraft.length > MAX_MAILTO_URL_LENGTH, 'Length should exceed 2000 chars');
assert.equal(longDraft.isTooLong, true, 'isTooLong flag must be set to true when exceeding threshold');

// 11. Clipboard summary formatting test
const summary = formatClipboardSummary(draft.recipient, draft.subject, draft.body);
assert.ok(summary.startsWith('To: admin@korporatlygroup.com'));
assert.ok(summary.includes('Subject: [Training Enquiry] Apex Logistics Sdn Bhd — Leadership & Management'));
assert.ok(summary.includes('Contact Name: Sarah Jenkins'));
assert.ok(summary.includes('Seeking customized cohort training.'));

console.log('All static enquiry validation, URL encoding, mailto generation & clipboard tests passed successfully!');


