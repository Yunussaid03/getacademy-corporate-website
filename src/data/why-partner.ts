/**
 * “Why Partner With Us?” (company profile slide 6). Descriptions follow the profile wording.
 */
export interface Differentiator {
  number: string;
  title: string;
  tagline: string;
  desc: string;
  image?: string;
  imageAlt?: string;
  /** Logos shown on a white panel instead of a photo. */
  logos?: { src: string; alt: string }[];
  keyAspects: string[];
}

export const differentiators: Differentiator[] = [
  {
    number: '01',
    title: 'Flexibility',
    tagline: 'On-site or virtual',
    desc: 'Training sessions can be conducted on-site or virtually, accommodating your team’s preferences and schedules.',
    image: '/assets/photos/staging-team-collaboration.jpg',
    imageAlt: 'A team collaborating during an on-site training session',
    keyAspects: ['On-site delivery', 'Virtual delivery', 'Fits your schedule'],
  },
  {
    number: '02',
    title: 'Expertise',
    tagline: 'Industry-expert trainers',
    desc: 'Our trainers are industry experts with a deep understanding of the latest trends and best practices.',
    image: '/assets/photos/staging-executive-advisory.jpg',
    imageAlt: 'Senior practitioners delivering industry-aligned capability development',
    keyAspects: ['Industry experts', 'Latest trends', 'Best practices'],
  },
  {
    number: '03',
    title: 'Measurable',
    tagline: 'Tangible results',
    desc: 'We believe in delivering tangible results, and our training programmes are designed to boost productivity, efficiency and employee satisfaction.',
    image: '/assets/photos/broad-capability-skilling.jpg',
    imageAlt: 'Professional learners engaged in a skills workshop',
    keyAspects: ['Productivity', 'Efficiency', 'Employee satisfaction'],
  },
  {
    number: '04',
    title: 'Customization',
    tagline: 'Aligned to your goals',
    desc: 'We tailor our programmes to align with your company’s unique goals and objectives.',
    image: '/assets/photos/tailored-corporate-classroom.jpg',
    imageAlt: 'A corporate cohort in a tailored capability development session',
    keyAspects: ['Tailored programmes', 'Your goals', 'Your objectives'],
  },
  {
    number: '05',
    title: 'Accreditation',
    tagline: 'Globally recognised certifications',
    desc: 'Your employees will receive certifications that are globally recognised, and every programme is HRDC claimable.',
    logos: [
      { src: '/assets/partners/hrdc-claimable-seal.png', alt: 'HRD Corp claimable seal' },
      { src: '/assets/partners/SEGI.png', alt: 'SEGi University' },
      { src: '/assets/partners/CompTIA.png', alt: 'CompTIA' },
    ],
    keyAspects: ['SEGi certificate', 'CompTIA certification', 'HRDC claimable'],
  },
];
