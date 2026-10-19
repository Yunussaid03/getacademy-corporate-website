/**
 * Client-side controller for Korporatly Group enquiry forms.
 *
 * Validates form input client-side and generates a pre-filled mailto draft addressed to
 * admin@korporatlygroup.com, with a copy-to-clipboard fallback.
 * No serverless backend or third-party services are invoked.
 */

import {
  validateEnquiryPayload,
  generateMailtoDraft,
  formatClipboardSummary,
  DEFAULT_ENQUIRY_RECIPIENT,
  type EnquiryPayload,
} from '@/utils/enquiry';

export type EnquiryFormSource = 'contact-page' | 'homepage-hero';

export interface EnquiryFormOptions {
  form: HTMLFormElement;
  /** Container (aria-live region) used to report the result. */
  status: HTMLElement;
  formSource: EnquiryFormSource;
  /** Primary enquiry recipient address. */
  fallbackEmail?: string;
  /** Quoted response time commitment. */
  responseTime?: string;
}

const FIELDS = ['name', 'email', 'phone', 'organisation', 'sector', 'track', 'participants', 'message'] as const;

function buildPayload(form: HTMLFormElement, formSource: EnquiryFormSource): EnquiryPayload {
  const data = new FormData(form);
  const payload: Record<string, string> = {
    formSource,
    honeypot: String(data.get('website_url') ?? ''),
  };

  for (const field of FIELDS) {
    const value = data.get(field);
    if (typeof value === 'string') {
      payload[field] = value.trim();
    }
  }
  return payload as unknown as EnquiryPayload;
}

function showManualCopyFallback(text: string, container: HTMLElement) {
  let existingArea = container.querySelector<HTMLTextAreaElement>('.manual-copy-area');
  if (!existingArea) {
    const wrapper = document.createElement('div');
    wrapper.className = 'mt-3 pt-3 border-t border-brand-border/60';

    const hint = document.createElement('p');
    hint.className = 'text-[11px] font-semibold text-brand-dark mb-1';
    hint.textContent = 'Clipboard access was unavailable. Please select and copy (Ctrl+C / Cmd+C) your enquiry below:';

    const textarea = document.createElement('textarea');
    textarea.className = 'manual-copy-area w-full h-40 p-2.5 text-xs font-mono bg-white border border-brand-border rounded-lg text-brand-dark focus:outline-none';
    textarea.readOnly = true;
    textarea.value = text;

    wrapper.append(hint, textarea);
    container.append(wrapper);
    existingArea = textarea;
  }
  existingArea.focus();
  existingArea.select();
}

function renderDraftReadyStatus(
  status: HTMLElement,
  recipient: string,
  subject: string,
  body: string,
  mailtoUrl: string,
  isTooLong: boolean
) {
  status.className = 'mt-4 p-5 rounded-xl border text-xs bg-slate-50 border-slate-200 text-slate-800 shadow-sm';
  status.replaceChildren();

  const header = document.createElement('div');
  const title = document.createElement('p');
  title.className = 'font-bold text-sm text-brand-dark flex items-center gap-1.5';
  title.textContent = isTooLong
    ? 'Enquiry Details Ready to Copy'
    : 'Opening Your Email App with a Pre-Filled Draft';

  const desc = document.createElement('p');
  desc.className = 'mt-1.5 text-xs text-brand-muted leading-relaxed';
  if (isTooLong) {
    desc.textContent = `Your message contains comprehensive details that exceed standard email link limits. To ensure no text is cut off, please copy your formatted enquiry below and send it directly to ${recipient}.`;
  } else {
    desc.textContent = `A draft addressed to ${recipient} has been prepared. Please review your details in your email client and press Send to deliver your enquiry.`;
  }

  const reviewNotice = document.createElement('p');
  reviewNotice.className = 'mt-1 text-xs font-semibold text-brand-dark';
  reviewNotice.textContent = isTooLong
    ? `Recipient: ${recipient}`
    : 'Action Required: You must click "Send" in your email application to complete submission.';

  header.append(title, desc, reviewNotice);

  // Fallback / Action toolbar
  const toolbar = document.createElement('div');
  toolbar.className = 'mt-3 pt-3 border-t border-slate-200/80 space-y-2';

  const toolbarHint = document.createElement('p');
  toolbarHint.className = 'text-[11px] text-slate-500';
  toolbarHint.textContent = isTooLong
    ? 'Click the button below to copy the complete formatted enquiry to your clipboard:'
    : "If your email app didn't open automatically, you can open it manually or copy the enquiry text:";

  const actionsRow = document.createElement('div');
  actionsRow.className = 'flex flex-wrap items-center gap-2 pt-1';

  // Copy button
  const copyBtn = document.createElement('button');
  copyBtn.type = 'button';
  copyBtn.className = 'px-3 py-1.5 rounded-lg bg-brand-sage text-white text-xs font-semibold hover:bg-brand-sage-dark transition-colors';
  copyBtn.textContent = 'Copy Enquiry Details';

  const clipboardSummary = formatClipboardSummary(recipient, subject, body);

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(clipboardSummary);
        copyBtn.textContent = '✓ Copied to Clipboard!';
        setTimeout(() => {
          copyBtn.textContent = 'Copy Enquiry Details';
        }, 3000);
        return;
      }
      showManualCopyFallback(clipboardSummary, status);
    } catch {
      showManualCopyFallback(clipboardSummary, status);
    }
  });

  actionsRow.append(copyBtn);

  // Direct mailto link (only if not too long)
  if (!isTooLong) {
    const mailLink = document.createElement('a');
    mailLink.href = mailtoUrl;
    mailLink.className = 'px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors';
    mailLink.textContent = 'Re-open in Mail App';
    actionsRow.append(mailLink);
  } else {
    const blankLink = document.createElement('a');
    blankLink.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}`;
    blankLink.className = 'px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors';
    blankLink.textContent = 'Open Blank Email';
    actionsRow.append(blankLink);
  }

  toolbar.append(toolbarHint, actionsRow);

  status.append(header, toolbar);
  status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderErrorStatus(status: HTMLElement, message: string) {
  status.className = 'mt-4 p-4 rounded-xl border text-xs bg-red-50 border-red-200 text-red-900 shadow-sm';
  status.replaceChildren();

  const title = document.createElement('p');
  title.className = 'font-bold';
  title.textContent = 'Please check your submission';

  const desc = document.createElement('p');
  desc.className = 'mt-1 text-red-800';
  desc.textContent = message;

  status.append(title, desc);
  status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

export function initEnquiryForm({
  form,
  status,
  formSource,
  fallbackEmail,
}: EnquiryFormOptions) {
  const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const submitLabel = submitButton?.querySelector('span') ?? null;
  const idleLabel = submitLabel?.textContent ?? '';
  let isThrottled = false;

  const recipient = fallbackEmail || DEFAULT_ENQUIRY_RECIPIENT;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (isThrottled) return;

    status.className = 'hidden';

    const payload = buildPayload(form, formSource);
    const validation = validateEnquiryPayload(payload);

    if (!validation.valid) {
      if (validation.error === 'bot_detected') {
        // Honeypot silently absorbs bot submissions
        status.className = 'mt-4 p-4 rounded-xl border text-xs bg-slate-50 border-slate-200 text-slate-800';
        status.textContent = 'Enquiry draft prepared.';
        return;
      }

      renderErrorStatus(status, validation.error || 'Please correct the highlighted form fields.');
      return;
    }

    // Generate client-side draft
    const draft = generateMailtoDraft(payload, recipient);

    isThrottled = true;
    if (submitButton) submitButton.disabled = true;
    if (submitLabel) submitLabel.textContent = 'Preparing Draft…';

    // Render honest feedback in UI
    renderDraftReadyStatus(
      status,
      draft.recipient,
      draft.subject,
      draft.body,
      draft.mailtoUrl,
      draft.isTooLong
    );

    // If URL is within limits, trigger mailto client
    if (!draft.isTooLong) {
      try {
        window.location.href = draft.mailtoUrl;
      } catch {
        // Handled by UI fallback buttons
      }
    }

    // Reset throttle after 2 seconds to allow re-trying
    setTimeout(() => {
      isThrottled = false;
      if (submitButton) submitButton.disabled = false;
      if (submitLabel) submitLabel.textContent = idleLabel;
    }, 2000);
  });
}

