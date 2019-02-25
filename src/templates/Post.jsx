import React from "react"
import PropTypes from "prop-types";
import { graphql } from "gatsby"

import { Head, Post, Layout } from "../components"
import {
  markdownRemark as markdownRemarkPropType,
  site as sitePropType,
} from "../proptypes";

export default function PostTemplate ({
  data: {
    site,
    markdownRemark: {
      frontmatter: { title, date, updated, path, toc: showToc },
      html,
      tableOfContents,
    },
  },
}) {
  return (
    <Layout site={site} path={path}>
      <Head
          title={title}
          path={path}
          site={site}
        />
      <Post
          title={title}
          date={date}
          updated={updated}
          showToc={showToc}
          tableOfContents={tableOfContents}
          html={html}
        />
    </Layout>
  )
};

PostTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: markdownRemarkPropType,
    site: sitePropType.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query PostByPath($path: String!) {
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
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      tableOfContents
      frontmatter {
        path
        title
        date(formatString: "YYYY-MM-DD")
        updated(formatString: "YYYY-MM-DD")
        toc
      }
    }
  }
`;