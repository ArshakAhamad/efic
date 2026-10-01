import { Helmet } from 'react-helmet-async';
import { buildCanonicalUrl, seoConfig } from '@/data/seoConfig';

export type StructuredData = Record<string, unknown>;

export interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: string;
  noIndex?: boolean;
  structuredData?: StructuredData | StructuredData[];
}

const makeAbsoluteUrl = (value: string): string => {
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  const normalized = value.startsWith('/') ? value : `/${value}`;
  return `${seoConfig.siteUrl}${normalized}`;
};

const ensurePath = (path?: string): string => {
  if (!path) {
    return '/';
  }
  if (path === '/') {
    return path;
  }
  return path.startsWith('/') ? path : `/${path}`;
};

const SEO = ({
  title,
  description,
  path = '/',
  image,
  keywords,
  type = 'website',
  noIndex = false,
  structuredData
}: SEOProps) => {
  const resolvedTitle = title ? `${title} | ${seoConfig.brand}` : seoConfig.defaultTitle;
  const resolvedDescription = description ?? seoConfig.defaultDescription;
  const resolvedPath = ensurePath(path);
  const canonicalUrl = buildCanonicalUrl(resolvedPath);
  const ogImage = makeAbsoluteUrl(image ?? seoConfig.defaultImage);
  const keywordsContent = (keywords ?? seoConfig.defaultKeywords).join(', ');
  const robotsValue = noIndex ? 'noindex, nofollow' : 'index, follow';

  const additionalSchemas: StructuredData[] = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  const schemas = [...seoConfig.baseSchemas, ...additionalSchemas];

  return (
    <Helmet>
      <title>{resolvedTitle}</title>

      <meta name="description" content={resolvedDescription} />
      <meta name="keywords" content={keywordsContent} />
      <meta name="author" content={seoConfig.brand} />
      <meta name="publisher" content={seoConfig.brand} />
      <meta name="robots" content={robotsValue} />
      <meta name="googlebot" content={robotsValue} />

      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en-LK" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:locale" content={seoConfig.locale} />
      <meta property="og:site_name" content={seoConfig.siteName} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={ogImage} />

      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Helmet>
  );
};

export default SEO;
