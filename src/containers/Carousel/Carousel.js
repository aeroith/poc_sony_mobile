import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Carousel from '../../components/Carousel';
import styles from './styles';
import { actions as carouselActions } from '../../reducers/carousel';
import withTranslation from '../../hocs/Translation';

@withTranslation
@connect(
  state => ({
    images: state.carousel.images.filter(x => x.global_image_url),
    page: state.carousel.page,
    isLoading: state.carousel.isLoading
  }),
  carouselActions
)
export default class CarouselContainer extends Component {
  static propTypes = {
    translate: PropTypes.func.isRequired,
    getFeaturedPhotos: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
  };

  componentDidMount() {
    this.props.getFeaturedPhotos(1);
  }

  render() {
    return (
      <View style={styles.container}>
        <Carousel {...this.props} />
      </View>
    );
  }
}

CarouselContainer.defaultProps = {
  isLoading: false,
};
