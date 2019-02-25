import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from "gatsby"

import { Layout, Head, IndexPage } from '../components';
import {
  allMarkdownRemark as allMarkdownRemarkPropType,
} from '../proptypes';

export default function SiteIndex({
  data: { 
    site,
    allMarkdownRemark: { 
      edges: posts 
    } 
  },
}) {
  return (
    <Layout site={site}>
      <Head site={site} />
      <IndexPage
        posts={posts.map(
          ({
            node: {  
              frontmatter: { title, path, date },
            },
          }) => ({
            title,
            path,
            date,
          }),
        )}
      />
    </Layout>
  );
}

SiteIndex.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: allMarkdownRemarkPropType,
  }).isRequired,
};

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        siteUrl
        title
        author
        description
        social {
          githubUrl
          linkedInUrl
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: {
          regex: "/src/pages/wiki/"
        }
        frontmatter: {
          public: { eq: true }
        }
      }
    ) {
      edges {
        node {
          html
          frontmatter {
            path
            title
            date(formatString: "YYYY-MM-DD")
            updated(formatString: "YYYY-MM-DD")
            public
          }
        }
      }
    }
  }
`;
