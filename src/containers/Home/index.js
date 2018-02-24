import React, { Component } from 'react';
import { View } from 'react-native';
import Carousel from '../Carousel';
import styles from './styles';
import TabbedDatePicker from '../TabbedDatePicker';
import Guide from '../Guide';
import withTranslation from '../../hocs/Translation';

@withTranslation
export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Carousel />
        <TabbedDatePicker />
        <Guide />
      </View>
    );
  }
}
