import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import Carousel from '../Carousel';
import styles from './styles';
import TabbedDatePicker from '../TabbedDatePicker';
import Guide from '../Guide';
import withTranslation from '../../hocs/Translation';

@withTranslation
export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
  };

  toCounter = () => {
    this.props.navigation.navigate('Counter');
  };

  render() {
    const { translate } = this.props;
    return (
      <View style={styles.container}>
        <Carousel />
        <TabbedDatePicker />
        <Guide />
      </View>
    );
  }
}
