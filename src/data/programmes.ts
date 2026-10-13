/**
 * Programme pathways and learner segments.
 * Source: GET Academy company profile slide 4 (“Our Expertise & Programs”). All programmes are HRDC claimable;
 * terms and conditions apply.
 */
export interface Pathway {
  id: string;
  title: string;
  summary: string;
  /** Category id used by the catalogue filter on /courses. */
  category: string;
  facts: string[];
}

export const pathways: Pathway[] = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & E-Commerce',
    summary:
      'Certified Digital Marketing Strategist (CDMS): a 6-day programme for working professionals, with a SEGi certificate. A fully hands-on capstone project route adds an employment opportunity for students and job seekers.',
    category: 'digital-strategy',
    facts: ['6 days', 'SEGi certificate', 'Capstone project (fully hands-on)', 'Employment opportunity'],
  },
  {
    id: 'business-incubation',
    title: 'Business Incubation',
    summary:
      'Done For You (DFY): a 3-month programme for business owners where we teach and do it for clients, with a customised solution and a SEGi certificate.',
    category: 'business-incubation',
    facts: ['3-month programme', 'We teach & do it for clients', 'Customised solution', 'SEGi certificate'],
  },
  {
    id: 'it-certification',
    title: 'Global IT Certification',
    summary:
      'Seven CompTIA certification pathways (Security+, CySA+, CASP+, Network+, Server+, Cloud+ and Cloud Essentials+), including IT for non-IT people and cybersecurity, leading to international certification.',
    category: 'technical-it',
    facts: ['7 CompTIA pathways', 'IT for non-IT people', 'Cybersecurity', 'International certification'],
  },
  {
    id: 'professional-development',
    title: 'Professional Development',
    summary:
      'Leadership, customer experience, design thinking, sales, events and problem-solving programmes for teams, from corporate culture and team building to customer service for BPO.',
    category: 'workplace-performance',
    facts: ['Leadership & management', 'Customer experience', 'Problem-solving & analytical thinking', 'Sales & event management'],
  },
];

export interface Audience {
  id: string;
  title: string;
  text: string;
  href: string;
  cta: string;
}

export const audiences: Audience[] = [
  {
    id: 'organisations',
    title: 'Organisations & agencies',
    text: 'Customised in-house programmes for enterprises, government agencies and education institutions, delivered on-site or virtually.',
    href: '/corporate-solutions',
    cta: 'Corporate solutions',
  },
  {
    id: 'professionals',
    title: 'Working professionals',
    text: 'CDMS (6 days, SEGi certificate), CompTIA IT certifications and professional development courses.',
    href: '/courses',
    cta: 'Browse programmes',
  },
  {
    id: 'students',
    title: 'Students & job seekers',
    text: 'Hands-on CDMS with a capstone project, a SEGi certificate and an employment opportunity.',
    href: '/courses?category=digital-strategy',
    cta: 'See digital strategy',
  },
  {
    id: 'business-owners',
    title: 'Business owners',
    text: 'Done For You (DFY) business incubation: a 3-month programme where we teach and do it for you.',
    href: '/courses?category=business-incubation',
    cta: 'See business incubation',
  },
];
