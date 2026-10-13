/**
 * Client-side controller shared by the homepage and contact-page enquiry forms.
 *
 * It posts the enquiry as JSON to the serverless handler (api/send-enquiry.ts). Validation, the honeypot
 * check and email delivery all happen there; see src/utils/enquiry.ts.
 */

const ENDPOINT = '/api/send-enquiry';

export type EnquiryFormSource = 'contact-page' | 'homepage-hero';

interface EnquiryFormOptions {
  form: HTMLFormElement;
  /** Container (aria-live region) used to report the result. */
  status: HTMLElement;
  formSource: EnquiryFormSource;
  /** Address offered as a direct-contact fallback when delivery fails. */
  fallbackEmail: string;
  /** Reply time quoted in the success message, e.g. "1–2 business days". */
  responseTime: string;
}

/** Form fields forwarded to the handler when present on the form. */
const FIELDS = ['name', 'email', 'phone', 'organisation', 'sector', 'track', 'participants', 'message'] as const;

const SUCCESS_CLASSES = 'mt-4 p-4 rounded-lg border text-xs bg-emerald-50 border-emerald-200 text-emerald-900';
const ERROR_CLASSES = 'mt-4 p-4 rounded-lg border text-xs bg-red-50 border-red-200 text-red-900';

function show(status: HTMLElement, tone: 'success' | 'error', heading: string, body: string, fallbackEmail?: string) {
  status.className = tone === 'success' ? SUCCESS_CLASSES : ERROR_CLASSES;
  status.replaceChildren();

  const title = document.createElement('p');
  title.className = 'font-bold';
  title.textContent = heading;

  const text = document.createElement('p');
  text.className = 'mt-0.5';
  text.textContent = body;

  if (fallbackEmail) {
    const link = document.createElement('a');
    link.href = `mailto:${fallbackEmail}`;
    link.className = 'font-bold underline';
    link.textContent = fallbackEmail;
    text.append(' You can also email us directly at ', link, '.');
  }

  status.append(title, text);
  status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function buildPayload(form: HTMLFormElement, formSource: EnquiryFormSource) {
  const data = new FormData(form);
  const payload: Record<string, string> = { formSource, honeypot: String(data.get('website_url') ?? '') };

  for (const field of FIELDS) {
    const value = data.get(field);
    if (typeof value === 'string') payload[field] = value.trim();
  }
  return payload;
}

export function initEnquiryForm({ form, status, formSource, fallbackEmail, responseTime }: EnquiryFormOptions) {
  const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const submitLabel = submitButton?.querySelector('span') ?? null;
  const idleLabel = submitLabel?.textContent ?? '';
  let isSubmitting = false;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    isSubmitting = true;

    status.className = 'hidden';
    submitButton?.setAttribute('disabled', 'true');
    if (submitLabel) submitLabel.textContent = 'Submitting…';

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload(form, formSource)),
      });
      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        form.reset();
        show(
          status,
          'success',
          'Thank you. Your enquiry has been sent.',
          `Our training team will reply within ${responseTime}.`,
        );
      } else {
        const message =
          typeof result?.error === 'string' && result.error
            ? result.error
            : 'We could not submit your enquiry online right now. Please try again shortly.';
        show(status, 'error', 'Your enquiry could not be sent.', message, fallbackEmail);
      }
    } catch {
      show(
        status,
        'error',
        'Your enquiry could not be sent.',
        'A network error occurred. Please check your connection and try again.',
        fallbackEmail,
      );
    } finally {
      isSubmitting = false;
      submitButton?.removeAttribute('disabled');
      if (submitLabel) submitLabel.textContent = idleLabel;
    }
  });
}
