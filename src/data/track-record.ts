/**
 * Track record: projects, strategic contributions, engagements, ecosystem and media partners.
 * Source: GET Academy company profile. Slide numbers are noted per block so entries can be re-checked.
 */
export interface Project {
  id: string;
  title: string;
  organisation: string;
  category: string;
  summary: string;
  image?: string;
  imageAlt?: string;
  stat?: string;
  /** Shown on the homepage track-record preview. */
  home?: boolean;
}

export const highlightStats = [
  { value: '800,000+', label: 'Malaysians reached through the national AI skilling ecosystem (AINSI)' },
  { value: '30+', label: 'Chief Digital Officers of public universities briefed on AI transformation' },
  { value: '70+', label: 'Government agencies and agricultural entrepreneurs trained in AI' },
  { value: '50', label: 'B40 and M40 business owners trained in digital marketing with MITRA' },
] as const;

/** Slides 13–18, 26, 35 */
export const projects: Project[] = [
  {
    id: 'mohe-cdo-briefing',
    title: 'Strategic AI briefing for public-university Chief Digital Officers',
    organisation: 'Ministry of Higher Education (MOHE)',
    category: 'AI & Higher Education',
    summary:
      'By invitation of the Deputy Secretary-General of MOHE, presented strategic AI transformation and adoption pathways to 30+ Chief Digital Officers from Malaysia’s public universities, advancing institutional AI readiness, digital transformation and the future of higher education.',
    image: '/assets/photos/mohe-cdo-briefing.jpeg',
    imageAlt: 'Online briefing on AI transformation for Chief Digital Officers of Malaysia’s public universities',
    stat: '30+ Chief Digital Officers',
    home: true,
  },
  {
    id: 'ainsi',
    title: 'National AI Skilling Initiative (AINSI)',
    organisation: 'Parliament of Malaysia & national ecosystem',
    category: 'National AI Initiative',
    summary:
      'Advancing the national AI skilling agenda with government, education and industry leaders. Our leadership’s ecosystem-wide efforts under Microsoft Malaysia’s AI National Skilling Initiative contributed to equipping 800,000+ Malaysians with AI skills across ministries, agencies, education institutions, industry and communities.',
    image: '/assets/photos/parliament-ai-skilling.jpeg',
    imageAlt: 'Leaders at the Parliament of Malaysia event on the national AI skilling agenda',
    stat: '800,000+ Malaysians reached',
    home: true,
  },
  {
    id: 'jpn-ipg-tech-dome',
    title: 'AI-powered education transformation',
    organisation: 'JPN Pulau Pinang, Institut Pendidikan Guru (IPG) and Tech Dome Penang',
    category: 'AI & Education',
    summary:
      'Working with JPN Pulau Pinang, Institut Pendidikan Guru (IPG) and Tech Dome Penang to build educator AI capabilities and bring practical AI learning into classrooms for teachers and students.',
    image: '/assets/photos/jpn-penang-tech-dome-mou.jpg',
    imageAlt: 'Representatives of JPN Pulau Pinang, IPG and Tech Dome Penang holding signed documents at Tech Dome Penang',
    stat: 'Educator AI capability building',
    home: true,
  },
  {
    id: 'agritech-ai',
    title: 'Empowering Agritech with AI',
    organisation: 'Government agencies & agricultural entrepreneurs',
    category: 'AI Capacity Building',
    summary:
      'Empowered over 70 government agencies and agricultural entrepreneurs to bridge the gap between traditional farming and intelligent automation through high-impact AI capability training.',
    image: '/assets/photos/agritech-ai-empowerment.jpeg',
    imageAlt: 'Participants of the Agritech AI capability training with MDEC and TalentCorp banners',
    stat: '70+ agencies & entrepreneurs',
    home: true,
  },
  {
    id: 'moe-transformation',
    title: 'Organisational & leadership transformation',
    organisation: 'Ministry of Education',
    category: 'Federal Ministry',
    summary:
      'Successfully proposed a solution to the Ministry and was awarded the project to conduct a Gap Analysis, derive an improvement plan and champion its implementation. Also delivered an organisational transformation project for the Prime Minister’s Department and the Ministry of Education.',
    image: '/assets/photos/hero-training.jpg',
    imageAlt: 'GET Academy leadership workshop session',
    stat: 'Gap analysis & transformation',
    home: true,
  },
  {
    id: 'mhtc',
    title: 'Digital marketing in the healthcare industry',
    organisation: 'Malaysia Healthcare Travel Council (MHTC)',
    category: 'Statutory Body',
    summary:
      'On 29 November 2023, GET Academy trained the MHTC team on how to navigate digital marketing in the healthcare industry.',
    image: '/assets/photos/mhtc-healthcare-workshop.jpeg',
    imageAlt: 'GET Academy training session with the Malaysia Healthcare Travel Council team',
    stat: '29 November 2023',
    home: true,
  },
  {
    id: 'sedic-mitra',
    title: 'Entrepreneurship coaching for B40 & M40 communities',
    organisation: 'Unit Transformasi Masyarakat India Malaysia (SEDIC – MITRA)',
    category: 'Socio-Economic Development',
    summary:
      'Project recipient to design and execute an end-to-end coaching programme in entrepreneurship development and business strategy digitalisation. Hosted a Digital Marketing Programme, supported by MITRA, that trained 50 business owners from the B40 and M40 groups.',
    image: '/assets/photos/mitra-entrepreneurship-coaching.jpeg',
    imageAlt: 'Business owners in a coaching session supported by MITRA',
    stat: '50 business owners trained',
    home: true,
  },
  {
    id: 'employment-readiness',
    title: 'First-time employment readiness training',
    organisation: 'Local universities and private colleges, including Kings College, MMU and UNITEN',
    category: 'Education & Employability',
    summary:
      'Delivered first-time employment readiness training for local universities and private colleges.',
    image: '/assets/photos/staging-university-workshop.jpg',
    imageAlt: 'University workshop session led by GET Academy',
  },
  {
    id: 'aic-raise',
    title: 'Business incubation mentorship',
    organisation: 'AIC RAISE, supported by the Government of India (Atal Innovation Mission)',
    category: 'International Incubation',
    summary:
      'Our COO, Ganesh Kumar Manokara, mentored startups in the business incubation programme organised by the Government of India, leading mentor-led sessions on market research and customer development (Tech Catalyst Pre-Incubation Programme 2024) and on product-market fit.',
    image: '/assets/photos/aic-raise-mentor-session.jpg',
    imageAlt: 'AIC RAISE Tech Catalyst session poster featuring GET Academy’s COO as resource person',
  },
  {
    id: 'satu-sekolah-satu-industri',
    title: 'Satu Sekolah Satu Industri',
    organisation: 'TalentCorp',
    category: 'Education & Industry',
    summary:
      'Educational and community partnership in Malaysia where local industries adopt, partner with, or intervene in specific schools.',
    image: '/assets/photos/satu-sekolah-satu-industri.jpg',
    imageAlt: 'Group photo at the Satu Sekolah Satu Industri session organised with TalentCorp',
  },
];

/** Slides 18, 26–30 */
export interface Contribution {
  id: string;
  organisation: string;
  period?: string;
  logo?: string;
  points: string[];
}

export const contributions: Contribution[] = [
  {
    id: 'mdec',
    organisation: 'Malaysia Digital Economy Corporation (MDEC)',
    period: '2021–2022',
    logo: '/assets/partners/mdec.png',
    points: [
      'Appointed as solution and training provider; participated in requests for proposals on capacity building and digital technology adoption initiatives nationwide.',
      'Appointed Digital Technology Training Provider (2021).',
      'Appointed Service Provider in Digital Up Programme 1 & 2 (2021).',
      'Appointed Digital Training Partner of Let’s Learn Digital (2022).',
      'Participation in MDEC De Dagang and MDEC De Rantau.',
    ],
  },
  {
    id: 'mpc',
    organisation: 'Malaysia Productivity Corporation (MPC)',
    logo: '/assets/partners/mpc-trim.png',
    points: [
      'Appointed Digital Transformation Partner and Digital Solution Provider; our COO serves as a member of the Digitalization Committee.',
      'Invited to contribute to initiative 2.1.6 under the National Anti-Corruption Plan (NACP): establishing a strong and effective mechanism for issuing permits and licences.',
    ],
  },
  {
    id: 'arise-plus',
    organisation: 'ARISE Plus Malaysia',
    period: '2023',
    logo: '/assets/partners/arise-plus.png',
    points: [
      'Invited to the “Malaysia: Trade Related Technical Assistance Project 2023” and its Public-Private Dialogue on “Regulatory Reforms to Support Digital MSMEs”.',
      'The project is funded by the EU and implemented by the International Trade Centre (ITC) with the Ministry of Investment, Trade and Industry (MITI).',
      'Helped Malaysian digital and e-commerce MSMEs identify and discuss with regulators the legal hurdles they face in daily operations.',
    ],
  },
  {
    id: 'mosti',
    organisation: 'Ministry of Science and Technology (TPM)',
    period: '2017',
    logo: '/assets/partners/mosti-trim.png',
    points: [
      'Invited to contribute to strategic development by designing and implementing a comprehensive Entrepreneur Incubation Programme, serving as mentor for startups.',
    ],
  },
  {
    id: 'mof',
    organisation: 'Ministry of Finance: 1Met Boot Camp',
    period: '2016',
    logo: '/assets/partners/mof.png',
    points: [
      'Invited as a mentor for startups in a series of intense, hands-on entrepreneurship and technology trainings designed to sensitise nascent startups to the basics of business.',
    ],
  },
  {
    id: 'eac',
    organisation: 'Economic Action Council: MyMUDAH',
    logo: '/assets/partners/mymudah.png',
    points: [
      'Invited to attend the Kedah State-level MyMUDAH conference chaired by the Prime Minister.',
      'Contributed to the establishment of MyMUDAH units in all government institutions and business associations to improve the business regulatory environment and boost national productivity and competitiveness.',
    ],
  },
  {
    id: 'matrade',
    organisation: 'MATRADE',
    logo: '/assets/partners/matrade-logo.png',
    points: [
      'Invited to the online International Sourcing Programme (INSP 101): Sealing the Deal, supporting demand-driven business matchmaking.',
      'The workshop prepares participants to connect with Malaysian exporters and foreign buyers for business meetings and export facilitation.',
    ],
  },
  {
    id: 'alibaba-10x1000',
    organisation: '10X1000 Tech for Inclusion (Alibaba Group)',
    period: '2021',
    points: [
      'Part of 10X1000 Tech for Inclusion, which aims to enable every learner to drive digital economic growth.',
      'Fintech Foundation Programme alumni (2021).',
    ],
  },
];

/** Slides 10, 12, 29: recognitions and memberships. */
export const recognitions = [
  {
    id: 'futurelab',
    title: 'FutureLab mentor',
    detail: 'Appointed as a mentor on FutureLab, the 2022 Best E-Brand of the Year in Mentoring and Education.',
    year: '2022',
  },
  {
    id: 'talentcorp',
    title: 'TalentCorp IAC Workshop',
    detail: 'Invited to the Industry-Academia Collaboration (IAC) Workshop on Information and Communications Technology.',
    year: '27 Sept 2022',
  },
  {
    id: 'prpsm',
    title: 'PRPSM member',
    detail: 'Member of the Public Relation Practitioners Society of Malaysia.',
    year: 'Membership',
  },
] as const;

/** Slides 32–38 */
export interface Engagement {
  id: string;
  title: string;
  detail: string;
  image?: string;
  imageAlt?: string;
  logo?: string;
  when?: string;
}

export const engagements: Engagement[] = [
  {
    id: 'matrade-perak',
    title: 'MATRADE MTC-MSME Perak Benchmarking Programme',
    detail:
      'Met Mr. Kenny Lim (Executive Director of Spritzer) and Mr. Ferdaus Md Taib (Director of Century Greentech Co.) during the benchmarking programme.',
    image: '/assets/photos/matrade-perak-benchmarking.jpg',
    imageAlt: 'GET Academy’s COO with business leaders at the MATRADE MTC-MSME Perak Benchmarking Programme',
  },
  {
    id: 'selectusa',
    title: 'SelectUSA',
    detail:
      'Building cross-border business pathways through engagements such as SelectUSA, enabling entrepreneurs and businesses to explore U.S. market entry, partnerships and expansion through our incubation ecosystem.',
    image: '/assets/photos/cross-border-select-usa.jpeg',
    imageAlt: 'Speaker at the SelectUSA event',
  },
  {
    id: 'yb-kula',
    title: 'With YB Kula',
    detail: 'Former Human Resources Minister.',
    image: '/assets/photos/engagement-yb-kula.jpg',
    imageAlt: 'GET Academy with YB Kula, former Human Resources Minister',
  },
  {
    id: 'yb-ong-kian-ming',
    title: 'With YB Ong Kian Ming',
    detail: 'Former Deputy Minister of International Trade and Industry.',
    image: '/assets/photos/engagement-yb-ong-kian-ming.jpg',
    imageAlt: 'GET Academy with YB Ong Kian Ming, former Deputy Minister of International Trade and Industry',
  },
  {
    id: 'segi-apel',
    title: 'SEGi University: APEL Centre',
    detail: 'Meeting with SEGi University on the APEL Centre.',
    image: '/assets/photos/segi-apel-centre-meeting.jpg',
    imageAlt: 'Group photo at the SEGi University APEL Centre meeting',
    logo: '/assets/partners/SEGI.png',
  },
  {
    id: 'affin-bank',
    title: 'Affin Bank',
    detail: 'Meeting with Affin Bank on student financing.',
    image: '/assets/photos/affin-bank-meeting.jpg',
    imageAlt: 'Meeting with Affin Bank on student financing',
  },
  {
    id: 'pkns',
    title: 'PKNS Academy',
    detail: 'Meeting with PKNS Academy.',
    when: '17 April',
    image: '/assets/photos/pkns-academy-meeting.jpg',
    imageAlt: 'GET Academy team with PKNS Academy representatives',
    logo: '/assets/partners/pkns.png',
  },
  {
    id: 'mosti-minister',
    title: 'MOSTI Minister’s team',
    detail: 'Met with the team of the Minister of Science, Technology and Innovation, YB Chang Lih Kang.',
    when: '18 April',
    logo: '/assets/partners/mosti-trim.png',
  },
];

/** Slide 25 */
export const ecosystemPartners = [
  '25 Startups',
  'MDEC',
  'SAY Community',
  'Prasarana',
  'Cradle Fund',
  'Persokelly',
  'SEEd.Lab',
  'Dattel',
  'Digital Penang',
  'PLUS',
  'Insken',
  'MATRADE',
  'PSDC',
  'PUNB',
  'SME Corp',
  'Telekom',
  'Yayasan Peneraju',
] as const;

/** Slides 36, 39–40 */
export const mediaPartner = {
  title: 'Media agency partners: Dattel & REV Media',
  description:
    'Dattel and REV Media are our media agency partners. The REV Media network spans Malaysian media and entertainment brands; REV Media is 100% owned by Media Prima, and Dattel is its AI technology partner.',
  networkImage: '/assets/photos/rev-media-network.jpg',
  networkAlt: 'Media brands in the REV Media network, 100% owned by Media Prima, with Dattel as AI technology partner',
  platformImage: '/assets/photos/dattel-ohsem-ads.jpg',
  platformAlt: 'OHSEM Ads platform connecting REV Ad Manager with Meta, Instagram and TikTok',
} as const;
