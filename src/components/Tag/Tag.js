import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import style from './styles';
import colorPalette from '../../config/colorPalette';

const { tag } = colorPalette;

const getTagType = (type) => {
  switch (type) {
    case 'new':
      return tag.new;
    case 'popular':
      return tag.popular;
    case 'default':
      return tag.new;
    default:
      return tag.new;
  }
};

const Tag = ({ type, text, color, ...props }) => {
  const defaultColor = color || getTagType(type);
  return (
    <View {...props}>
      <View style={[style.tagContainer, { backgroundColor: defaultColor }]}>
        <Text style={style.tagText}>{text.toUpperCase()}</Text>
      </View>
    </View>
  );
};

Tag.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

Tag.defaultProps = {
  type: 'default',
  color: undefined,
};

export default Tag;
