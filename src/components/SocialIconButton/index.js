import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import PropTypes from 'prop-types';
import colorPalette from '../../config/colorPalette';

const SocialIconButton = props => (
  <TouchableOpacity
    activeOpacity={props.activeOpacity}
    onPress={props.onSocialIconClick}
    style={props.style}
  >
    <SimpleLineIcon
      name={props.iconName}
      size={props.iconSize}
      color={props.iconColor}
    />
  </TouchableOpacity>
);

SocialIconButton.propTypes = {
  activeOpacity: PropTypes.number,
  onSocialIconClick: PropTypes.func,
  style: View.propTypes.style,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
};

SocialIconButton.defaultProps = {
  activeOpacity: 0.8,
  onSocialIconClick: () => console.log('Bind an onClick method to SocialIconButton'),
  style: {},
  iconName: 'share',
  iconSize: 15,
  iconColor: colorPalette.white,
};

export default SocialIconButton;
