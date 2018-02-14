import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Image } from 'react-native';
import _isEmpty from 'lodash/isEmpty';
import styles from './styles';

export default class Carousel extends Component {
  static propTypes = {
    images: PropTypes.array,
  };

  static defaultProps = {
    images: []
  };

  render() {
    if (!this.props.images || _isEmpty(this.props.images)) {
      return null;
    }

    return (
      <ScrollView style={styles.scrollContainer} horizontal pagingEnabled>
        {
          this.props.images.map(image =>
          (<Image style={styles.image} source={{ uri: image.imageURL }} key={image.id} />))
        }
      </ScrollView>
    );
  }
}
