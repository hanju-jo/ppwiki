import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Title = styled.h1`
  @media only screen and (min-width: 740px) {
    font-size: 2.25rem;
  }
`;

const Date = styled.p`
  text-align: right;
  opacity: 0.7;
`;

const TableOfContents = styled.div`
  border-style: solid;
  border-width: 1px;
`;

export default function Post({ title, date, updated, showToc, html, tableOfContents }) {
  return (
    <div>
      <Title>{title}</Title>
      <Date>
        created: {date}<br/>
        updated: {updated}
      </Date>
      {showToc ? <TableOfContents dangerouslySetInnerHTML={{ __html: tableOfContents }} /> : null}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  updated: PropTypes.string.isRequired,
  showToc: PropTypes.bool,
  html: PropTypes.string.isRequired,
  tableOfContents: PropTypes.string.isRequired,
};

Post.defaultProps = {
  showToc: false,
};
