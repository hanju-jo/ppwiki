import { graphql } from "gatsby"

export const siteFragment = graphql`
  fragment SiteFragment on Query {
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
  }
`;

export const markdownFrontmatterFragment = graphql`
  fragment MarkdownFrontmatterFragment on MarkdownRemark {
    frontmatter {
      path
      title
      date(formatString: "MMMM DD, YYYY")
      updated(formatString: "MMMM DD, YYYY")
    }
  }
`;
