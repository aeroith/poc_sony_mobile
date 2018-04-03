import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Carousel from '../../components/Carousel';
import styles from './styles';
import { actions as carouselActions } from '../../reducers/carousel';
import { push } from '../../reducers/nav';
import withTranslation from '../../hocs/Translation';

@withTranslation
@connect(
  state => ({
    images: state.carousel.images.filter(x => x.global_image_url),
    page: state.carousel.page,
    isLoading: state.carousel.isLoading,
    channelId: state.app.channelId,
    routes: state.nav.routes,
  }),
  dispatch => ({
    getFeaturedPhotos: channelId => dispatch(carouselActions.getFeaturedPhotos(channelId)),
    setCarouselPage: page => dispatch(carouselActions.setCarouselPage(page)),
    resetCarousel: () => dispatch(carouselActions.resetCarousel()),
    push: (...params) => dispatch(push(...params)),
  })
)
export default class CarouselContainer extends Component {
  static propTypes = {
    translate: PropTypes.func.isRequired,
    getFeaturedPhotos: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    channelId: PropTypes.number.isRequired,
  };

  componentDidMount() {
    this.props.getFeaturedPhotos(this.props.channelId);
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
