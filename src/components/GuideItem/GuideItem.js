import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
const moment = require('moment');

export default class GuideItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationEnabled: false,
    };
  }

  onNotificationIconPress = () => (
    this.state.notificationEnabled ?
      this.setState({
        notificationEnabled: false
      }) :
      this.notificationAlert()
  );

  notificationAlert = () => Alert.alert(
    'Set Notification',
    'Remind me 10 minutes from the start?',
    [
      {
        text: 'Cancel',
        onPress: () => this.setState({
          notificationEnabled: false
        }),
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => this.setState({
          notificationEnabled: true
        }),
      },
    ],
    { cancellable: false }
  );

  onContentPress = () => console.log('Guide Item Content Pressed')

  render() {
    const { image, title, note, timeStart, timeEnd } = this.props;
    const startTime = moment.unix(timeStart).format('h:mma');
    const endTime = moment.unix(timeEnd).format('h:mma');
    return (
      <View {...this.props}>
        <View style={styles.guideItemMainContainer}>
          <TouchableOpacity
            onPress={this.onContentPress}
            style={styles.guideItemImageContainer}
          >
            <Image
              style={styles.guideItemImage}
              source={{uri: image }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onContentPress}
            style={styles.guideItemContentContainer}
          >
            <View>
              <Text style={styles.guideItemTextTitle}>{title}</Text>
              <Text style={styles.guideItemTextSubtitle}>{note}</Text>
              <View style={styles.guideItemAiringContainer}>
                <Icon name="ios-time-outline" size={12} style={styles.guideItemIconAiring} />
                <Text style={styles.guideItemTextAiring}>{`${startTime} - ${endTime}`}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.guideItemNotificationContainer}>
            <TouchableOpacity onPress={this.onNotificationIconPress}>
              {
                this.state.notificationEnabled ?
                  <Icon name="ios-notifications-outline" size={30} style={styles.guideItemNotificationIcon} /> :
                  <Icon name="ios-notifications-off-outline" size={30} style={styles.guideItemNotificationIcon} />
              }
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
