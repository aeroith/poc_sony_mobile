import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import styles from './styles';

const moment = require('moment');

export default class GuideItem extends PureComponent {
  static propTypes = {
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    note: PropTypes.string,
    timeStart: PropTypes.number.isRequired,
    timeEnd: PropTypes.number.isRequired,
  };

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

  onContentPress = () => console.log('Guide Item Content Pressed');

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
              source={{ uri: image }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onContentPress}
            style={styles.guideItemContentContainer}
          >
            <View>
              <Text style={styles.guideItemTextTitle}>{title}</Text>
              {note && <Text style={styles.guideItemTextSubtitle}>{note}</Text>}
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

GuideItem.defaultProps = {
  image: 'https://dummyimage.com/100x60/2d5d61/fff.png&text=Placeholder',
  note: '',
};
