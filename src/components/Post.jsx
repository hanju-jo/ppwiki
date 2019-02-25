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

export default function Post({ title, date, updated, html }) {
  return (
    <div>
      <Title>{title}</Title>
      <Date>
        created: {date} <br/>
        updated: {updated}
      </Date>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  updated: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
};
