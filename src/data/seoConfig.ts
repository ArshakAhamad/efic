import { contact, orgName, orgAbbr } from './eficData';

const siteUrl = 'https://efic.lk';
const defaultImagePath = '/ogimage.png';
const defaultLogoPath = '/android-chrome-512x512.png';

const [primaryPhoneRaw] = contact.phones[0]?.split('/') ?? [''];
const primaryPhone = primaryPhoneRaw.trim();

const baseSchemas: Record<string, unknown>[] = [
  {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${siteUrl}#organization`,
    name: orgName,
    alternateName: orgAbbr,
    url: siteUrl,
    logo: `${siteUrl}${defaultLogoPath}`,
    image: `${siteUrl}${defaultImagePath}`,
    email: contact.email,
    telephone: primaryPhone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '54, Sahibu Road',
      addressLocality: 'Kalmunai',
      addressCountry: 'LK'
    },
    foundingDate: '2001-08-21'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    url: siteUrl,
    name: `${orgAbbr} | ${orgName}`,
    publisher: {
      '@id': `${siteUrl}#organization`
    },
    inLanguage: 'en-LK'
  }
];

const defaultKeywords = [
  'EFIC',
  'Effulgent Forum of Independent Committee',
  'Kalmunai education',
  'Sri Lanka NGO',
  'free education Sri Lanka',
  'community development',
  'EFIC Wings',
  'education charity'
];

export const seoConfig = {
  siteUrl,
  siteName: `${orgAbbr} | ${orgName}`,
  brand: orgName,
  shortName: orgAbbr,
  defaultTitle: `${orgAbbr} | Effulgent Forum of Independent Committee`,
  defaultDescription:
    'EFIC delivers free, high-quality education and community uplift programs for underprivileged families in Kalmunai, Sri Lanka.',
  defaultKeywords,
  defaultImage: defaultImagePath,
  logoPath: defaultLogoPath,
  locale: 'en_LK',
  contactEmail: contact.email,
  contactPhone: primaryPhone,
  colorPalette: {
    primary: '#0071BC',
    secondary: '#39B54A',
    accent: '#ED1C24'
  },
  baseSchemas
} as const;

export const buildCanonicalUrl = (path = '/'): string => {
  if (path === '/') {
    return siteUrl;
  }

  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${normalized}`;
};
