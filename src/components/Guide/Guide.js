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
      <View style={styles.guideItemImageContainer}>
        <Image
          style={styles.guideItemImage}
          source={{uri: 'https://yt3.ggpht.com/a-/AJLlDp3MkZbnThs83KWXV7OIA4trD8TpggRsZLGUCA=s900-mo-c-c0xffffffff-rj-k-no'}}
        />
      </View>
      <View>
        <Text>Seinfield</Text>
        <Text>S2: E09 Changing Lives</Text>
        <Text>4.00pm - 5.00pm</Text>
      </View>
    </View>
  </View>
);