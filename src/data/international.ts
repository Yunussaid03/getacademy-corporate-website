/**
 * International projects and network.
 */
export interface MediaRef {
  src: string;
  alt: string;
}

export interface Story {
  id: string;
  region: string;
  title: string;
  when?: string;
  summary: string;
  details?: string[];
  images: MediaRef[];
  logos?: MediaRef[];
}

export const regions = [
  'United Nations',
  'UNESCO',
  'Uzbekistan',
  'United States',
  'United Kingdom',
  'India',
] as const;

export const stories: Story[] = [
  {
    id: 'un-ai-governance',
    region: 'United Nations',
    title: 'Global Dialogue on AI Governance',
    when: '2026',
    summary:
      'Contributed expert input to the United Nations Global Dialogue on AI Governance 2026, providing perspectives and recommendations to the global consultation process that informed the inaugural UN Dialogue in Geneva.',
    details: [
      'The process brought together governments and stakeholders worldwide to advance international cooperation on safe, inclusive and responsible AI governance.',
    ],
    images: [
      { src: '/assets/photos/un-ai-governance-dialogue.jpg', alt: 'Stakeholder consultation session on the UN Global Dialogue on AI Governance' },
      { src: '/assets/photos/unesco-consultation.jpg', alt: 'Delegates at a UNESCO table during the consultation' },
    ],
  },
  {
    id: 'unesco-ee-net',
    region: 'UNESCO · Uzbekistan',
    title: 'UNESCO Entrepreneurship Education Network (EE-Net)',
    summary:
      'Represented Malaysia at the UNESCO Entrepreneurship Education Network (EE-Net) regional engagement in Uzbekistan, contributing to Asia-Pacific dialogue on entrepreneurship education, future-ready skills and education transformation.',
    details: [
      'Invited to speak at the 10th UNESCO-APEID Meeting on Entrepreneurship Education in Tashkent, with the opportunity to network with representatives of 80 other countries and promote Malaysian medical tourism.',
    ],
    images: [
      { src: '/assets/photos/unesco-ee-net-tashkent.jpg', alt: 'Ganesh Kumar Manokara seated at the Malaysia nameplate at the UNESCO EE-Net meeting in Uzbekistan' },
      { src: '/assets/photos/unesco-ee-net-session.jpg', alt: 'Delegates in session at the UNESCO EE-Net regional engagement' },
    ],
  },
  {
    id: 'uzbekistan-startups',
    region: 'Uzbekistan',
    title: 'IT Park Syrdarya: Uzbek startup collaboration',
    summary:
      'Engaged with Uzbekistan’s startup ecosystem to explore international collaboration and entrepreneurship development, working with representatives from IT Park Syrdarya to identify opportunities to support local startups, incubators and rural entrepreneurs through mentorship, branding, market insights and access to international networks.',
    details: [
      'The initiative also explored stronger Malaysia–Uzbekistan business links, including pathways for Uzbek startups to access ASEAN markets and potential future collaboration through joint initiatives and formal partnerships.',
    ],
    images: [
      { src: '/assets/photos/uzbekistan-it-park-meeting.jpg', alt: 'Leadership meeting with IT Park Syrdarya representatives in Uzbekistan' },
      { src: '/assets/photos/uzbekistan-startup-delegation.jpg', alt: 'Korporatly Group COO with the Uzbek delegation' },
    ],
  },
  {
    id: 'new-york',
    region: 'United States',
    title: 'New York: Consulate General of Malaysia and MATRADE',
    when: 'January 2024',
    summary:
      'Our COO, Mr Ganesh Kumar, met Mr Amir, Consul General at the Consulate General of Malaysia in New York, to carve a path for Malaysian entrepreneurs to step into the US market.',
    details: [
      'In New York, we connected with education and trade leaders (MATRADE) to expand opportunities for US degrees and business collaborations, aiming to establish international presence and growth in America.',
    ],
    images: [
      { src: '/assets/photos/nyc-consulate-general.jpg', alt: 'Our COO with the Consul General at the Consulate General of Malaysia in New York' },
      { src: '/assets/photos/nyc-matrade-office.jpg', alt: 'Our COO at the MATRADE New York office' },
    ],
  },
  {
    id: 'uk-india',
    region: 'United Kingdom · India',
    title: 'Birmingham City University MoU and HERO Cycles India',
    summary:
      'A tripartite Memorandum of Understanding (MoU) was signed between GET Academy, MBCIE (represented by Dr. Prem Kumar, Executive Director), and Dr. Vijay Venkatesan of Birmingham City University, United Kingdom. This foundational engagement established a global academic bridge in both the university and startup spaces.',
    details: [
      'Korporatly Group COO, Mr. Ganesh, was also honoured as the esteemed guest of HERO Cycles India, hosted by Mr. Rai, the Senior Vice Chairman.',
    ],
    images: [
      { src: '/assets/photos/hero-cycles-india.jpg', alt: 'Korporatly Group COO with hosts during the visit to India' },
      { src: '/assets/photos/mbcie-verse.jpg', alt: 'Korporatly Group COO at the MBCIEverse venue' },
    ],
    logos: [
      { src: '/assets/partners/mbcie.png', alt: 'MBCIE, powered by Birmingham City University' },
      { src: '/assets/partners/birmingham-city-university.png', alt: 'Birmingham City University' },
    ],
  },
];

/** Immersion and U.S. market-entry formats (slides 5 and 33). */
export const usFormats = [
  {
    id: 'ny-immersion',
    title: '2024 US – New York Immersion Programme',
    detail:
      'Immersion programmes are one of our three training formats, alongside online and hands-on workshops. The 2024 US – New York Immersion Programme took learning overseas.',
  },
  {
    id: 'selectusa',
    title: 'SelectUSA',
    detail:
      'Building cross-border business pathways through engagements such as SelectUSA, enabling entrepreneurs and businesses to explore U.S. market entry, partnerships and expansion through our incubation ecosystem.',
  },
] as const;

/** Slides 19 and 30 */
export const moreEngagements = [
  {
    id: 'uk-trade-mission',
    region: 'United Kingdom',
    title: 'UK Trade Mission: Digital Tech & Fintech',
    when: '2022',
    detail: 'Invited to the UK Trade Mission on Digital Tech and Fintech.',
  },
  {
    id: 'global-growth-uk',
    region: 'United Kingdom',
    title: 'Global Growth Programme UK',
    when: '2022',
    detail: 'Invited to the Global Growth Programme UK.',
  },
  {
    id: 'uk-house-trade-visit',
    region: 'United Kingdom',
    title: 'UK HouseTradeVisit Programme',
    when: '2022',
    detail: 'Invited to the UK HouseTradeVisit Programme by the Department of International Trade (DIT).',
  },
  {
    id: 'west-midlands',
    region: 'United Kingdom',
    title: 'West Midlands Growth Company',
    detail: 'Fostered ties with the West Midlands Growth Company in Birmingham, UK.',
  },
  {
    id: 'goa',
    region: 'India',
    title: 'Chief Minister of Goa',
    when: '2019',
    detail:
      'Fostered ties with the Chief Minister of Goa on bilateral economic development, and represented Malaysia in a closed-door meeting exploring business collaboration opportunities.',
  },
] as const;
