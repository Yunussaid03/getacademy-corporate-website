/**
 * Organisations and institutional partners engaged with.
 */
export interface LogoItem {
  name: string;
  file: string;
  /** Shown in the compact homepage grid. */
  featured?: boolean;
}

const p = (file: string) => `/assets/partners/${file}`;
const c = (file: string) => `/assets/clients/${file}`;

/** Government, statutory bodies, institutions and academic partners. */
export const institutionLogos: LogoItem[] = [
  { name: 'MDEC', file: p('mdec.png'), featured: true },
  { name: 'HRD Corp', file: p('hrd-corp.png'), featured: true },
  { name: 'Malaysia Productivity Corporation', file: p('mpc-trim.png'), featured: true },
  { name: 'MATRADE', file: p('matrade-logo.png'), featured: true },
  { name: 'Ministry of Education Malaysia', file: p('moe.png'), featured: true },
  { name: 'Ministry of Science, Technology and Innovation', file: p('mosti-trim.png'), featured: true },
  { name: 'Ministry of Finance Malaysia', file: p('mof.png') },
  { name: 'MyMUDAH', file: p('mymudah.png') },
  { name: 'Malaysia Healthcare Travel Council', file: p('mhtc.png') },
  { name: 'SEDIC', file: p('sedic-trim.png') },
  { name: 'MITRA, Jabatan Perdana Menteri', file: p('mitra.png') },
  { name: 'PKNS', file: p('pkns.png') },
  { name: 'ARISE Plus Malaysia', file: p('arise-plus.png') },
  { name: 'SEGi University', file: p('segi-trim.png'), featured: true },
  { name: 'Kings College', file: p('kings-college-trim.png'), featured: true },
  { name: 'Birmingham City University', file: p('birmingham-city-university.png') },
  { name: 'MBCIE', file: p('mbcie.png') },
];

/** Corporate clients and ecosystem partners from the profile's logo wall. */
export const corporateLogos: LogoItem[] = [
  { name: 'Atos', file: c('atos.png'), featured: true },
  { name: 'Digi', file: c('digi.png'), featured: true },
  { name: 'Shopee', file: c('shopee.png'), featured: true },
  { name: 'Lazada', file: c('lazada.png'), featured: true },
  { name: 'Malaysia Airlines', file: c('malaysia-airlines.png'), featured: true },
  { name: 'DXC Technology', file: c('dxc-technology.png'), featured: true },
  { name: 'PARKROYAL Hotels & Resorts', file: c('parkroyal.png'), featured: true },
  { name: 'Billplz', file: c('billplz.png'), featured: true },
  { name: 'TikTok', file: c('tiktok.png'), featured: true },
  { name: 'Funding Societies', file: c('funding-societies.png'), featured: true },
  { name: 'Lazada University', file: c('lazada-university.png') },
  { name: 'PGMall', file: c('pgmall.png') },
  { name: 'Rtist', file: c('rtist.png') },
  { name: 'Wowshop', file: c('wowshop.png') },
  { name: 'SiteGiant', file: c('sitegiant.png') },
  { name: 'Lokéin', file: c('lokein.png') },
  { name: 'Kumoten', file: c('kumoten.png') },
  { name: 'Bizapp', file: c('bizapp.png') },
  { name: 'Riipay', file: c('riipay.png') },
  { name: 'IOUpay', file: c('ioupay.png') },
  { name: 'Dropee', file: c('dropee.png') },
  { name: 'eRomman', file: c('eromman.png') },
  { name: 'Instant E-Store', file: c('instant-e-store.png') },
  { name: 'microLEAP', file: c('microleap.png') },
  { name: 'Al-Ikhsan', file: c('al-ikhsan.png') },
  { name: 'Envo', file: c('envo.png') },
  { name: 'Vigilant Asia', file: c('vigilant-asia.png') },
  { name: 'QHC', file: c('qhc.png') },
  { name: 'Evenesis', file: c('evenesis.png') },
  { name: 'Maruwa', file: c('maruwa.png') },
  { name: 'Jaya Enterprise', file: c('jaya-enterprise.png') },
  { name: 'MS Jaya Enterprise Sdn Bhd', file: c('ms-jaya-enterprise.png') },
  { name: 'Seven Star Gym', file: c('seven-star-gym.png') },
  { name: 'Datamicron', file: c('datamicron.png') },
  { name: 'DRUM', file: c('drum.png') },
  { name: 'Splenday', file: c('splenday.png') },
];

export const featuredLogos: LogoItem[] = [...institutionLogos, ...corporateLogos].filter((l) => l.featured);
