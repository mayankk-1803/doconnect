import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Reusable SEO helmet component
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} [props.keywords] - Comma-separated keywords
 * @param {string} [props.path] - Relative path for canonical link
 * @param {string} [props.ogImage] - Social share image
 */
const SEO = ({ title, description, keywords, path = '', ogImage }) => {
  const defaultTitle = 'DoConnect | Premium Digital Insurance Marketplace';
  const defaultDesc = "Compare & buy health, motor, life, term, and travel insurance plans from India's leading insurers with instant quotes and expert guidance.";
  const defaultKeywords = 'health insurance, motor insurance, life insurance, term insurance, travel insurance, digital insurance marketplace, doconnect';
  const defaultImage = 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&auto=format&fit=crop&q=80';
  
  const siteUrl = 'https://doconnectservices.com';
  const canonicalUrl = `${siteUrl}${path}`;
  const displayTitle = title ? `${title} | DoConnect` : defaultTitle;

  return (
    <Helmet>
      {/* Basic Title & Meta */}
      <title>{displayTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="DoConnect" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={ogImage || defaultImage} />

      {/* Accessibility / Performance hints */}
      <meta name="theme-color" content="#0F4C81" />
    </Helmet>
  );
};

export default SEO;
