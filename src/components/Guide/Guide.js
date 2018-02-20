import React, { Component } from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import styles from './styles';

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

const GuideItem = ({image, title, note, airing, ...props}) => (
  <View {...props}>
    <View style={styles.guideItemMainContainer}>
      <Image />
      <Text>Seinfield</Text>
      <Text>S2: E09 Changing Lives</Text>
      <Text>4.00pm - 5.00pm</Text>
    </View>
  </View>
);