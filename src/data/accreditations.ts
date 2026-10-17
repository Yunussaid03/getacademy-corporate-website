/**
 * Accreditations, appointments and professional affiliations.
 * Registration / appointment dates are intentionally not printed: certificates are renewed periodically,
 * so current documents are supplied on request (see `verificationNote`).
 */
export type AccreditationGroup = 'academia' | 'certification' | 'government' | 'industry';

export interface Accreditation {
  id: string;
  group: AccreditationGroup;
  name: string;
  badge: string;
  scope: string;
  /** Logo path; when absent the card shows `icon`. */
  logo?: string;
  icon?: 'mentor' | 'workshop' | 'membership';
}

export const accreditationGroups: { id: AccreditationGroup; label: string }[] = [
  { id: 'academia', label: 'Academia' },
  { id: 'certification', label: 'Certification Provider' },
  { id: 'government', label: 'Government' },
  { id: 'industry', label: 'Industry Experts' },
];

export const accreditations: Accreditation[] = [
  {
    id: 'segi',
    group: 'academia',
    name: 'SEGi University & Colleges',
    badge: 'Academic Franchisee',
    scope:
      'Franchisee of SEGi University and Colleges in Malaysia. Selected programmes, including CDMS and Business Incubation, carry a SEGi certificate.',
    logo: '/assets/partners/SEGI.png',
  },
  {
    id: 'comptia',
    group: 'certification',
    name: 'CompTIA',
    badge: 'Endorsed Training Provider',
    scope:
      'Endorsed training provider of the Computing Technology Industry Association (CompTIA), delivering seven global IT certification pathways.',
    logo: '/assets/partners/CompTIA.png',
  },
  {
    id: 'hrd-corp',
    group: 'government',
    name: 'HRD Corp',
    badge: 'Approved Training Provider',
    scope:
      'Approved training provider of the Human Resources Development Corporation (HRDC). All capability building programmes are HRDC claimable.',
    logo: '/assets/partners/hrd-corp.png',
  },
  {
    id: 'mdec',
    group: 'government',
    name: 'Malaysia Digital Economy Corporation (MDEC)',
    badge: 'Accredited Training Provider',
    scope:
      'Accredited MDEC training provider for MSMEs, SMEs, corporates and business owners. Appointed under Digital Up (2021) and Let’s Learn Digital (2022).',
    logo: '/assets/partners/mdec.png',
  },
  {
    id: 'mpc',
    group: 'government',
    name: 'Malaysia Productivity Corporation (MPC)',
    badge: 'Digital Solution Provider',
    scope:
      'Appointed Digital Solution Provider and Digital Transformation Partner of MPC. Our COO serves as a member of its Digitalization Committee.',
    logo: '/assets/partners/mpc-trim.png',
  },
  {
    id: 'matrade',
    group: 'government',
    name: 'MATRADE',
    badge: 'Member',
    scope:
      'Member of the Malaysia External Trade Development Corporation. Invited to the International Sourcing Programme (INSP 101: Sealing the Deal).',
    logo: '/assets/partners/matrade-logo.png',
  },
  {
    id: 'arise-plus',
    group: 'government',
    name: 'ARISE Plus Malaysia',
    badge: 'Invited Contributor',
    scope:
      'Contributor to the Public-Private Dialogue on “Regulatory Reforms to Support Digital MSMEs” (28 July 2023), an EU-funded project implemented by the International Trade Centre with MITI.',
    logo: '/assets/partners/arise-plus.png',
  },
  {
    id: 'futurelab',
    group: 'industry',
    name: 'FutureLab',
    badge: 'Appointed Mentor',
    scope:
      'Appointed as a mentor on FutureLab, the 2022 Best E-Brand of the Year in Mentoring and Education.',
    icon: 'mentor',
  },
  {
    id: 'talentcorp-iac',
    group: 'industry',
    name: 'TalentCorp Industry-Academia Collaboration',
    badge: 'Invited Participant',
    scope:
      'Invited to the Industry-Academia Collaboration (IAC) Workshop on Information and Communications Technology by TalentCorp (27 September 2022).',
    icon: 'workshop',
  },
  {
    id: 'prpsm',
    group: 'industry',
    name: 'Public Relation Practitioners Society of Malaysia',
    badge: 'Member',
    scope: 'Member of the Public Relation Practitioners Society of Malaysia (PRPSM).',
    icon: 'membership',
  },
];

export const verificationNote =
  'Current HRD Corp, SEGi and CompTIA certificates, together with MDEC and MPC appointment letters, are supplied to HR and procurement teams on request during proposal discussions.';
