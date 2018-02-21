import React, { Component } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import GuideItem from '../GuideItem';

export default class Guide extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <GuideItem />
      </View>
    );
  }
}
