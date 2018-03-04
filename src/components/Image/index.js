import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import config from '../../config/config';

const ImageWrapper = props => (
  <Image source={{ uri: props.uri || config.dummyImageUrl }} style={props.style} />
);

ImageWrapper.propTypes = {
  uri: PropTypes.string,
  style: PropTypes.any.isRequired
};

ImageWrapper.defaultProps = {
  uri: config.dummyImageUrl
};

export default ImageWrapper;
