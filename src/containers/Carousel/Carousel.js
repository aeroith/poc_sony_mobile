import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Carousel from '../../components/Carousel';
import styles from './styles';
import { actions as carouselActions } from '../../reducers/carousel';
import withTranslation from '../../components/Translation';

@withTranslation
@connect(
  state => ({
    images: state.carousel.images,
    page: state.carousel.page,
  }),
  carouselActions
)
export default class CarouselContainer extends Component {
  static propTypes = {
    translate: PropTypes.func.isRequired,
    getFeaturedPhotos: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getFeaturedPhotos();
  }

  render() {
    return (
      <View style={styles.container}>
        <Carousel {...this.props} />
      </View>
    );
  }
}
