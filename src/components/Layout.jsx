import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';

import { site as sitePropType } from '../proptypes';

const LayoutDiv = styled.div`
  margin: 3rem auto;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 740px;
`;

export default function Layout({ site, path, children }) {
  return (
    <LayoutDiv>
      <Header path={path} site={site} />
      <div>{children}</div>
      <Footer />
    </LayoutDiv>
  );
}

Layout.propTypes = {
  site: sitePropType.isRequired,
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
