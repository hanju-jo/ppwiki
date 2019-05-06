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
  margin-bottom: 1rem;
  font-size: 0.8rem;
`;

const TableOfContents = styled.div`
  background: #f9f9f9 none repeat scroll 0 0;
  border: 1px solid #aaa;
  display: table;
  font-size: 95%;
  margin-bottom: 1em;
  padding: 10px;
  width: auto;

  p, li {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export default function Post({ title, date, updated, showToc, html, tableOfContents }) {
  return (
    <div>
      {title ? <Title>{title}</Title> : null}
      {date ? <Date>created: {date}<br/>updated: {updated}</Date> : null}
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
