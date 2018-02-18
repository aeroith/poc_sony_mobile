import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Carousel from '../../containers/Carousel';
import styles from './styles';
import withTranslation from '../../components/Translation';

@withTranslation
export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
  };

  toCounter = () => {
    this.props.navigation.navigate('Counter');
  };

  toCarousel = () => {
    this.props.navigation.navigate('Carousel');
  };

  render() {
    const { translate } = this.props;
    return (
      <View style={styles.container}>
        <Carousel />
        <Image source={require('../../assets/images/arrow_image.png')} style={styles.image} resizeMode="contain" />
        <Text style={styles.welcome}>{translate('welcome_text')}</Text>
        <TouchableOpacity onPress={this.toCounter}>
          <Text style={styles.instructions}>{translate('navigate_to_counter')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.toCarousel}>
          <Text style={styles.instructions}>{translate('navigate_to_carousel')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
