import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { site as sitePropType } from '../proptypes';

const buildStructuredData = ({ siteUrl, siteTitle }) =>
  JSON.stringify([
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: siteUrl,
      name: siteTitle,
      alternateName: siteTitle,
    },
    // TODO: more things for article https://developers.google.com/search/docs/data-types/article#non-amp
  ]);

function HeadComponent({
  description,
  structuredData,
  url,
  title,
  isPost,
}) {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      <script type="application/ld+json">{structuredData}</script>

      <meta property="og:url" content={url} />
      {isPost ? (
        <meta property="og:type" content="article" />
      ) : (
        <meta property="og:type" content="website" />
      )}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <link rel="shortcut icon" href="/favicons/favicon.ico" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
  );
}

HeadComponent.propTypes = {
  description: PropTypes.string.isRequired,
  structuredData: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isPost: PropTypes.bool.isRequired,
};

export default function Head({
  path,
  excerpt,
  title,
  site: {
    siteMetadata: {
      siteUrl: productionSiteUrl,
      title: siteTitle,
      description: siteDescription,
    },
  },
}) {
  // Only on development, the images and paths come prefixed with http://localhost:8080
  const siteUrl =
    process.env.NODE_ENV === 'production' ? productionSiteUrl : '';
  return (
    <HeadComponent
      {...{
        description: excerpt || siteDescription,
        url: siteUrl + path,
        title: title || siteTitle,
        isPost: !!path,
        structuredData: buildStructuredData({ siteUrl, siteTitle }),
      }}
    />
  );
}

Head.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string,
  site: sitePropType.isRequired,
};

Head.defaultProps = {
  title: '',
  path: '',
};
