import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import styles from './styles';
import GuideItem from '../GuideItem';
import config from '../../config/config';

export default class Guide extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          {
            this.props.guide.map(item => (
              <GuideItem
                key={item.id}
                title={item.title}
                image={item.imageURL}
                note={item.note[config.lang]}
                timeStart={item.timeStart}
                timeEnd={item.timeEnd}
              />
            ))
          }
        </ScrollView>
      </View>
    );
  }
}
