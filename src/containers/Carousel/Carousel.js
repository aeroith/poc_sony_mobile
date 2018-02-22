import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Carousel from '../../components/Carousel';
import styles from './styles';
import { actions as carouselActions } from '../../reducers/carousel';
import withTranslation from '../../components/Translation';
import Spinner from '../../components/Spinner';

@withTranslation
@connect(
  state => ({
    images: state.carousel.images,
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
    this.props.getFeaturedPhotos();
  }

  render() {
    if (this.props.isLoading) {
      return (
        <View style={styles.searchBarContainer}>
          <Spinner iconStyle={styles.searchBarIconStyle} iconSize={40}/>
        </View>
      );
    }
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
