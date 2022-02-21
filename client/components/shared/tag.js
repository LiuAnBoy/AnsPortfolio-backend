import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const RootStyled = styled.div`
  margin: 0 6px 0 0;
  background-color: #dae2ec;
  color: #617d98;
  padding: 6px 10px;
  display: inline-block;
  border-radius: 2px;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 12px;
`;

const Tag = ({ text, onChangeOptions, className }) => (
  <RootStyled onClick={onChangeOptions} className={className}>
    {text}
  </RootStyled>
);

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  onChangeOptions: PropTypes.func,
  className: PropTypes.string,
};

Tag.defaultProps = {
  onChangeOptions: () => {},
  className: '',
};

export default Tag;
