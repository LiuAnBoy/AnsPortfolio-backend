import React from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { theme } from '../../styles/theme';

const RootStyle = styled.div`
  margin: 0 0 40px;
  width: 100vw;
  max-width: 100%;
  @media (max-width: 414px) {
    margin: 0 0 30px;
  }

  .title-text {
    font-weight: 700;
    letter-spacing: 2px;
    color: ${theme.palette.text.main};
    margin: 0 0 10px 0;
    text-align: center;
    width: 100vw;
    max-width: 100%;
  }

  .title-underline {
    background-color: ${theme.palette.primary.dark};
    height: 4px;
    width: 80px;
    margin: 0 auto;
  }
`;

const Title = ({ title }) => (
  <RootStyle>
    <Typography variant="h3" className="title-text">
      {title}
    </Typography>
    <div className="title-underline" />
  </RootStyle>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
