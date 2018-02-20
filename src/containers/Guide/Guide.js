import React, { Component } from 'react';
import { View } from 'react-native';
import Guide from '../../components/Guide';
import styles from './styles';

export default class GuideContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Guide {...this.props} />
      </View>
    );
  }
}