import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native';
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
    navigation: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
    getFeaturedPhotos: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getFeaturedPhotos();
  }

  handleBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { translate } = this.props;
    return (
      <View style={styles.container}>
        <Carousel {...this.props} />
        <TouchableOpacity onPress={this.handleBack}>
          <Text style={styles.back}>{translate('back')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
