import React, { Component } from 'react';
import { View } from 'react-native';
import Carousel from '../../containers/Carousel/index';
import styles from './styles';
import TabbedDatePicker from '../../containers/TabbedDatePicker/index';
import Guide from '../../containers/Guide/index';
import withTranslation from '../../hocs/Translation/index';

@withTranslation
export default class TVGuide extends Component {
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
