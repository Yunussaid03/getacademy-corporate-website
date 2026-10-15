/**
 * Company facts shared across the site.
 * Source: GET Academy company profile (contact slide), so every page prints the same details.
 */
export const site = {
  name: 'Korporatly Group',
  legalName: 'Korporatly Group',
  /** LLP registration number as printed on corporate profile. */
  llpNumber: 'LLP0019343-LGN',
  tagline: 'Digital Transformation Centre — Consulting, Implementation & Training',
  domain: 'geta.com.my',
  email: 'ask@geta.com.my',
  phone: { display: '+60 16-328 8684', tel: '+60163288684' },
  address: {
    lines: ['Level 33, Ilham Tower', 'No. 8, Jalan Binjai', '50450 Kuala Lumpur', 'Malaysia'],
    singleLine: 'Level 33, Ilham Tower, No. 8, Jalan Binjai, 50450 Kuala Lumpur, Malaysia',
  },
  pic: { name: 'Ganesh Kumar Manokara', role: 'Chief Operating Officer (COO)' },
  responseTime: '1–2 business days',
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.singleLine)}`;
